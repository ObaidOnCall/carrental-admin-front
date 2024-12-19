import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ClientResponse, PaginatedClientResponse } from './clientTypes';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private readonly http = inject(HttpClient);
  constructor() {}

  getClients(page: number, size: number): Observable<PaginatedClientResponse> {
    return this.http.get<PaginatedClientResponse>(environment.backend1 + `/clients?page=${page}&pageSize=${size}`);
  }

  CreateVehicle(credentials: ClientResponse): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(environment.backend1 + '/clients', [credentials]);
  }

  getClientById(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(environment.backend1 + `/clients/${id}`);
  }

  UpdateClient(id: number, credentials: ClientResponse): Observable<ClientResponse> {
    return this.http.put<ClientResponse>(environment.backend1 + `/clients/${id}`, credentials);
  }
}
