import { Component, inject} from '@angular/core';
import { ApiInicio } from '../../services/api-inicio';
import {RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  conteoMatriculas = 0;
  connteoRoturas = 0;

  private api = inject(ApiInicio);

  ngOnInit(){
    this.api.getConteoMatriculas().subscribe({
      next:(respuesta) =>{
        this.conteoMatriculas = respuesta;
      },
      error: (error)=>{
        console.log(error);
      }
    });
    this.api.getConteoRoturas().subscribe({
      next:(respuesta)=>{
        this.connteoRoturas = respuesta;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
}
