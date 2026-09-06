import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class ApiInicio {
  private http = inject(HttpClient);
  private config = inject(Config);

  getConteoMatriculas(){
    return this.http.get<number>(`${this.config.getUrlApi()}/conteoM`);
  }
  getConteoRoturas(){
    return this.http.get<number>(`${this.config.getUrlApi()}/conteoR`);
  }
  
}
