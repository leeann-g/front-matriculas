import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Config {
  private urlApi = 'http://127.0.0.1:8000/api';
  private http = inject(HttpClient);

  getUrlApi(){
    return localStorage.getItem('urlApi') || this.urlApi;
  }

  setUrlApi( url: string){
    localStorage.setItem('urlApi', url);
  }

  probarConexion(url : string){
    return this.http.get<{ mensaje: string}>(`${url}/servidor`);
  }
}
