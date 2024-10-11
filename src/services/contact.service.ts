import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact, ContactApiResponse } from '../tabs/interfaces/catalog.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url:string = 'https://nominatim.openstreetmap.org/search';

  private urlBackend:string = 'http://localhost/Ejercicio1/api-rest/public/api/contacts';

  private http = inject(HttpClient);

  private getdata = new BehaviorSubject<void>(undefined);
  
  contacts$ = this.getdata.asObservable();

  constructor() { }

    TriggerActualizarLista(){
      this.getdata.next();
    }

    getUbicacion(domicilio: string){
      return this.http.get<any[]>(`${this.url}?format=json&limit=1&q=${domicilio}`);
    }

    create(form: object): Observable<any> {
      return this.http.post<any>(`${this.urlBackend}`, form);
    }

    getAll(): Observable<ContactApiResponse> {
      return this.http.get<ContactApiResponse>(`${this.urlBackend}`);
    }

    getById(id: number): Observable<any> {
      return this.http.get<any>(`${this.urlBackend}/${id}`);
    }

    update(id: number, form: object): Observable<any> {
      return this.http.put<any>(`${this.urlBackend}/${id}`, form);
    }

    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.urlBackend}/${id}`);
    }
}
