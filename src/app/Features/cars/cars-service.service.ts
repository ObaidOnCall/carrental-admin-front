import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  deleteCars(id: number): Observable<any> {
    return this.http.delete<any>(environment.backend1 + `/vehicules/${id}`);
  }

  createVehicule(cars: CarRequest[]): Observable<CarResponse[]> {
    return this.http.post<CarResponse[]>(environment.backend1 + '/vehicules', cars);
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
