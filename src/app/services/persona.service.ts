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
    this.myApiUrl = 'api/personas/' //api
   }

// metodo obtiene todo
getPersonas(): Observable<Persona[]> {
  return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`)
}



// metodo x id
deletePersona(id:number):Observable<void>{
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
}



// metodo registrar
addPersona(persona : Persona): Observable<void>{
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, persona)
}



// getPersonaxid
getPersona(id:number):Observable<Persona>{
 return this.http.get<Persona>(`${this.myAppUrl}${this.myApiUrl}${id}`)
}



// metodoactualizar
updatePersona(id:number , persona:Persona):Observable<void>{
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, persona)
}


}
