import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface RawMaterial {
  id: number;
  name: string;
  stock: number;
  minStock: number;
  unit: string;
}


@Injectable({providedIn: 'root'})
export class MaterialApi {

  private readonly baseUrl = 'http://localhost:8080/api/raw-materials';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(this.baseUrl);
  }


}
