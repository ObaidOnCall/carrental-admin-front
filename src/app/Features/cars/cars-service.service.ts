import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CarModel, CarType } from './types';

@Injectable({
  providedIn: 'root',
})
export class CarsServiceService {
  constructor(private http: HttpClient) {}

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
  CreateVehicle(credentials: CarType): Observable<CarType> {
    return this.http.post<CarType>(environment.backend1 + '/vehicules', [credentials]);
  }
  UpdateCar(id: number, credentials: CarType): Observable<CarType> {
    return this.http.put<CarType>(environment.backend1 + `/vehicules/${[id]}`, [credentials]);
  }
}
