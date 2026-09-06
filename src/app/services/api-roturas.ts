import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class ApiRoturas {
  private http = inject(HttpClient);
  private config = inject(Config);

  getRoturas(){
    return this.http.get<any[]>(`${this.config.getUrlApi()}/roturas`);
  }
}
