
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Rotura, crearRotura } from '../models/rotura';

@Injectable({
  providedIn: 'root',
})
export class ApiRoturas {

  private http = inject(HttpClient);
  private config = inject(Config);

  getRoturas() {
    return this.http.get<Rotura[]>(
      `${this.config.getUrlApi()}/roturas`
    );
  }

  getInformacionBimestrales() {
    return this.http.get<any[]>(
      `${this.config.getUrlApi()}/informacionBimestral`
    );
  }

  getDetalleBimestral(anio: number, bimestre: number) {
    return this.http.get<any[]>(
      `${this.config.getUrlApi()}/detalle-bimestral/${anio}/${bimestre}`
    );
  }

  postRotura(datos: crearRotura) {
    return this.http.post<Rotura>(
      `${this.config.getUrlApi()}/roturas`,
      datos
    );
  }

  // ACTUALIZAR ROTURA
  updateRotura(id: number, datos: Partial<Rotura>) {
    return this.http.patch<Rotura>(
      `${this.config.getUrlApi()}/roturas/${id}`,
      datos
    );
  }

}
