import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from '@core/authentication';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, of, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly toast = inject(ToastrService);
  private readonly tokenService : TokenService = inject(TokenService) ;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /**
     * @see add the Autherzation header
     * info : HttpRequest objects are immutable. (readOnly) so clone it
    */
    const token : string = this.tokenService.getBearerToken()
    
    // console.warn(token) ;

    const modifyedReq = req.clone({
      setHeaders : {
        Authorization : token
      }
    })
    if (!modifyedReq.url.includes('/api/')) {
      return next.handle(modifyedReq);
    }
    return next.handle(modifyedReq).pipe(mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)));
  }

  private handleOkReq(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      // failure: { code: **, msg: 'failure' }
      // success: { code: 0,  msg: 'success', data: {} }
      /**
       * I will custom it for our purpose 🌲
       */
      // if (body && 'code' in body && body.code !== 0) {
      //   if (body.msg) {
      //     this.toast.error(body.msg);
      //   }
      //   return throwError(() => []);
      // }
    }
    // Pass down event if everything is OK
    return of(event);
  }
}
