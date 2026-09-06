import { Component, inject } from '@angular/core';
import { ApiMatriculas } from '../../../services/api-matriculas';
import { Matricula } from '../../../models/matricula';

@Component({
  selector: 'app-inicio-matriculas',
  imports: [],
  templateUrl: './inicio-matriculas.html',
  styleUrl: './inicio-matriculas.css',
})
export class InicioMatriculas {
  private api = inject(ApiMatriculas);
  matriculas: Matricula[] = []

  ngOnInit(){
    this.api.getMatriculas().subscribe({
      next:(respuesta) =>{
        this.matriculas = respuesta;
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }

}
