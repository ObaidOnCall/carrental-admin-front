import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '@env/environment';
import { Assurance, CarModel, CarRequest, CarResponse, CarType, UpdateCarResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class CarsServiceService {

  private readonly http: HttpClient = inject(HttpClient) ;
  constructor() {}

  getCars(page: number, size: number): Observable<any> {
    return this.http.get<any>(environment.backend1 + `/vehicules?page=${page}&size=${size}`);
  }

  getCarById(id: number): Observable<any> {
    return this.http.get<CarType>(environment.backend1 + `/vehicules/${id}`);
  }

  getModelsById(id: number): Observable<any> {
    return this.http.get<CarModel>(environment.backend1 + `/brands/${id}/models`);
  }

  deleteCars(ids: number[],): Observable<any> {
    return this.http.delete<any>(`${environment.backend1}/vehicules/${ids}`);
  }

  createVehicule(cars: CarRequest[]): Observable<CarResponse[]> {
    return this.http.post<CarResponse[]>(`${environment.backend1}/vehicules`, cars);
  }
  
  updateCar(ids: number[],updatedCar: CarRequest | Partial<CarRequest>): Observable<UpdateCarResponse> {
    return this.http.put<UpdateCarResponse>(`${environment.backend1}/vehicules/${ids}`, updatedCar).pipe(
      tap((response) => console.error('Raw Response:', response))
    );
  }

  CreateAssurance(credentials: Assurance): Observable<Assurance> {
    return this.http.post<Assurance>(environment.backend1 + 'vehicules/assurances', [credentials]);
  }
}


@Injectable({
  providedIn: 'root',
})
export class CarEventDrivenService {
  
  private readonly carUpdateSubject = new Subject<any>();

  carUpdates$ = this.carUpdateSubject.asObservable();

  emitCarUpdate(car: any) {
    this.carUpdateSubject.next(car);
  }
}