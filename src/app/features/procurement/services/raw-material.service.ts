import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {MaterialApi, RawMaterial} from '../../../api/material.api';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  constructor(private materialApi: MaterialApi) {
  }

  public getAllRawMetrials(): Observable<RawMaterial[]> {
    return this.materialApi.findAll().pipe(
      catchError(err => {
        console.error('Failed to load raw materials', err);
        return throwError(() => err);
      })
    );
  }
}
