import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matricula } from '../models/matricula';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class ApiMatriculas {
  private http = inject(HttpClient);
  private config = inject(Config);

  getMatriculas(){
    return this.http.get<Matricula[]>(`${this.config.getUrlApi()}/matriculas`);
  }
  postMatriculas(datos:any[]){
    return this.http.post(`${this.config}/matriculas`, datos);
  }
}
