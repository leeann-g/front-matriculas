import { Component, inject } from '@angular/core';
import { ApiRoturas } from '../../../services/api-roturas';

@Component({
  selector: 'app-inicio-roturas',
  imports: [],
  templateUrl: './inicio-roturas.html',
  styleUrl: './inicio-roturas.css',
})
export class InicioRoturas {
  private api = inject(ApiRoturas);
  roturas: any[] = [];

  ngOnInit(){
    this.api.getRoturas().subscribe({
      next: (respuesta)=>{
        this.roturas = respuesta;
      },
      error:(error)=>{
        console.error(error);
      }
    });
  }
}
