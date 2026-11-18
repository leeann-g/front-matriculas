import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matricula, crearMatricula, respuestaAct, agrupacionMatriculas } from '../models/matricula';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class ApiMatriculas {
  private http = inject(HttpClient);
  private config = inject(Config);

  getAgrupacionMatriculas(){
    return this.http.get<agrupacionMatriculas[]>(`${this.config.getUrlApi()}/agrupacionMatriculas`);
  }
  getMatriculas(){
    return this.http.get<Matricula[]>(`${this.config.getUrlApi()}/matriculas`)
  }
  postMatriculas(datos: crearMatricula){
    return this.http.post<Matricula>(`${this.config.getUrlApi()}/matriculas`, datos);
  }

  updateMatricula(id:number, datos: crearMatricula){
    return this.http.put<respuestaAct>(`${this.config.getUrlApi()}/matriculas/${id}`, datos);
  }
}
