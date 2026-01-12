import {Injectable} from '@angular/core';
import {Supplier, SupplierApi, SupplierPayload} from '../../../api/supplier.api';
import {catchError, Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private supplierApi: SupplierApi) {
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.supplierApi.findAll().pipe(
      catchError(error => throwError(() => error))
    );
  }

  createSupplier(payload: SupplierPayload): Observable<Supplier> {
    return this.supplierApi.create(payload).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
