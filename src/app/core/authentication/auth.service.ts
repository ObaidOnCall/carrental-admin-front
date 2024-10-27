import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { Token, User, UserV2 } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { base64 } from './helpers';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);

  private user$ = new BehaviorSubject<UserV2>({});
  // private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh()
    .pipe(
        switchMap(() => this.refresh())
      ) ,
  ).pipe(
    // switchMap(() => this.assignUser()),
    switchMap(() => this.assignUserV2()),
    share()
  );

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }

  /**
   * 
   * !Original 🔖
   */
  // login(username: string, password: string, rememberMe = false) {
  //   return this.loginService.login(username, password, rememberMe).pipe(
  //     tap(token => this.tokenService.set(token)),
  //     map(() => this.check())
  //   );
  // }

  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login2(username, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }

  refresh() {
    return this.loginService
      .refreshV2(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }

  /**
   * 
   * !Original🔖
   */
  // refresh() {
  //   return this.loginService
  //     .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
  //     .pipe(
  //       catchError(() => of(undefined)),
  //       tap(token => this.tokenService.set(token)),
  //       map(() => this.check())
  //     );
  // }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), this.loginService.menu());
  }

  /**
   * 
   * @get user by requesting /me 
   */
  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }

  private assignUserV2() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    // Check if user is already assigned
    if (!isEmptyObject(this.user$.getValue())) {
        return of(this.user$.getValue());
    }

    // Retrieve token from local storage
    const tokenString = localStorage.getItem(environment.tokenKey);
    if (tokenString) {
        const token: Token = JSON.parse(tokenString) as Token;

        // console.warn(token.access_token.split(".")[1])
        // Decode the access token
        const userPayload:string = token.access_token.split(".")[1];
        const user: UserV2 = JSON.parse(base64.decode(userPayload)) as UserV2;

        /**
         * @@ make defautl avatar
         */
        user.avatar = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1727553585~exp=1727554185~hmac=58d796778e888a2fee6f0555cdbf6c19997fa6ed5c972df8de69049cc9426d04" ;
        // Emit the user information
        this.user$.next(user);
        // console.log(user.realm_access) ;

        // console.warn(user) ;
        return of(user);
    }

    // If no token is found, return an empty observable or handle it accordingly
    return of({}).pipe(tap(user => this.user$.next(user)));
  }
}
