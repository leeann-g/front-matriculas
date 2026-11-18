
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ApiRoturas } from '../../../services/api-roturas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-roturas',
  imports: [],
  templateUrl: './informe-roturas.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './informe-roturas.css',
})
export class InformeRoturas implements OnInit {

  private api = inject(ApiRoturas);
  private router = inject(Router);

  bimestres: any[] = [];

  ngOnInit() {
    this.api.getInformacionBimestrales().subscribe({
      next: (respuesta) => {
        this.bimestres = respuesta;
        console.log(this.bimestres);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  obtenerNombreBimestre(numero: number): string {
    const meses = [
      'Enero - Febrero',
      'Marzo - Abril',
      'Mayo - Junio',
      'Julio - Agosto',
      'Septiembre - Octubre',
      'Noviembre - Diciembre'
    ];

    return meses[numero - 1] ?? 'Bimestre desconocido';
  }

  obtenerTotalRoturas(): number {
    return this.bimestres.reduce(
      (total, bimestre) => total + Number(bimestre.TOTAL),
      0
    );
  }

  verInforme(bimestre: any) {
  this.router.navigate([
    '/detalle-informe',
    bimestre.ANIO,
    bimestre.BIMESTRE
  ]);
}

  

}
