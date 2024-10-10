import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  // inicializando
  private myAppUrl : string;
  private myApiUrl : string;


//  inicia
  constructor(private http : HttpClient) {
    // seteando
    this.myAppUrl = environment.endpoint; //app
    this.myApiUrl = 'api/personas' //api
   }

// metodo obtiene todo
getPersonas(): Observable<Persona[]> {
  return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`)
}



}
