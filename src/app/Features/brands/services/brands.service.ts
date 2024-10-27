import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Brand } from '../types/type';
import { environment } from '@env/environment';
import { CarModel } from 'app/Features/cars/types';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private brandsUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.backend1}/brands`);
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${environment.backend1}/brands/${id}`);
  }

  createBrands(brand: Brand[]): Observable<Brand[]> {
    return this.http.post<Brand[]>(`${environment.backend1}/brands`, brand).pipe(
      tap(() => {
        this.brandsUpdated.next();
      })
    );
  }

  updateBrands(brand: Brand[], ids: number[]): Observable<Brand[]> {
    return this.http.put<Brand[]>(`${environment.backend1}/brands/${ids}`, brand).pipe(
      tap(() => {
        this.brandsUpdated.next();
      })
    );
  }

  getBrandsUpdatedListener(): Observable<void> {
    return this.brandsUpdated.asObservable();
  }

  createModel(model: CarModel[]): Observable<CarModel[]> {
    return this.http.post<CarModel[]>(`${environment.backend1}/brands/models`, model).pipe(
      tap(() => {
        this.brandsUpdated.next();
      })
    );
  }
}
