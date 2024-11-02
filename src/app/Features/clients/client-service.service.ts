import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Client } from './types';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  constructor(private http: HttpClient) {}

  getClients(page: number, size: number): Observable<Client[]> {
    return this.http.get<Client[]>(environment.backend1 + `/clients?page=${page}&pageSize=${size}`);
  }

  CreateVehicle(credentials: Client): Observable<Client> {
    return this.http.post<Client>(environment.backend1 + '/clients', [credentials]);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(environment.backend1 + `/clients/${id}`);
  }
}
