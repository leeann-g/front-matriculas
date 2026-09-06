import { Component, inject } from '@angular/core';
import { Config } from '../../services/config';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {
  private config = inject(Config);
  private router = inject(Router);
  urlApi = '';
  ayuda = false;
  mensaje = '';

  ngOnInit() {
    this.urlApi = this.config.getUrlApi();
  }

  formulario = new FormGroup({
    apiUrlNuevo: new FormControl("", Validators.required)
  });
  construirApiUrl(){
    const api = this.formulario.get('apiUrlNuevo')?.value;
    if(!api){
      return ''
    }
    return `http://${api}:8000/api`
  }
  guardar(){
    if(this.formulario.invalid){
      return;
    }
    this.config.setUrlApi(this.construirApiUrl());
    this.urlApi = this.config.getUrlApi();

    this.router.navigate(['/inicio']);
  }
  verAyuda(){
    this.ayuda = true ;
    document.body.style.overflow = "hidden";
  }
  cerrarAyuda(){
    this.ayuda = false;
    document.body.style.overflow = "";
  }

  probarConexion(){
    this.config.probarConexion(this.construirApiUrl()).subscribe({
      next:(respuesta)=>{
        this.mensaje = respuesta.mensaje;
      },
      error:(error)=>{
        this.mensaje = 'No hay conexion';
      }
    });
  }

}
