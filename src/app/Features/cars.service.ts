import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  BrandResponse,
  CarRequest,
  CarResponse,
  ModelResponse,
  PaginatedCarResponse,
} from 'app/routes/cars/car';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private readonly http = inject(HttpClient);

  saveCar(cars: CarRequest[]): Observable<CarResponse[]> {
    return this.http.post<CarResponse[]>(`${environment.backend1}/vehicules`, cars);
  }

  getListOfBrands(): Observable<BrandResponse[]> {
    return this.http.get<BrandResponse[]>(`${environment.backend1}/brands`);
  }

  // /brands/{id}/models
  getListOfModels(id: number): Observable<ModelResponse[]> {
    return this.http.get<ModelResponse[]>(`${environment.backend1}/brands/${id}/models`);
  }

  getListOfCars(page: number, size: number): Observable<PaginatedCarResponse> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http
      .get<PaginatedCarResponse>(`${environment.backend1}/vehicules`, { params })
      .pipe(
        map(response => {
          // Transform the matricule field for each car in the content array
          response.content = response.content.map(car => {
            return {
              ...car,
              matricule:
                car.matricule.charAt(0).toUpperCase() + car.matricule.slice(1).toLowerCase(),
              color: car.color.charAt(0).toUpperCase() + car.color.slice(1).toLowerCase(),
              modelName:
                car.model.name.charAt(0).toUpperCase() + car.model.name.slice(1).toLowerCase(),
              brandName:
                car.model.brand.name.charAt(0).toUpperCase() +
                car.model.brand.name.slice(1).toLowerCase(),
              fuelType: car.model.fuelType,
              numberOfDoors: car.model.numberOfDoors,
              topSpeed: car.model.topSpeed,
              fuelEfficiency: car.model.fuelEfficiency,
            };
          });
          return response;
        })
      );
  }
}
