import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  rating: number;
  leadTime: number;
}

export interface SupplierPayload {
  name: string;
  contact: string;
  rating: number;
  leadTime: number;
}


@Injectable({providedIn: 'root'})
export class SupplierApi {

  private readonly baseUrl = 'http://localhost:8080/api/suppliers';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  create(payload: SupplierPayload): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, payload);
  }
}
