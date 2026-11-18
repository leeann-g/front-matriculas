import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiRoturas } from '../../../services/api-roturas';

@Component({
  selector: 'app-detalle-informe',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-informe.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './detalle-informe.css',
})
export class DetalleInforme implements OnInit {

  private route = inject(ActivatedRoute);
  private api = inject(ApiRoturas);

  anio = 0;
  bimestre = 0;
  roturasInforme: any[] = [];
  nombreAprendiz = localStorage.getItem('nombreAprendiz') || '';
  nombreIngeniero = localStorage.getItem('nombreIngeniero') || '';

  cargando = true;
  error = false;

  ngOnInit() {
    this.anio = Number(this.route.snapshot.paramMap.get('anio'));
    this.bimestre = Number(this.route.snapshot.paramMap.get('bimestre'));

    this.api.getDetalleBimestral(this.anio, this.bimestre).subscribe({
      next: (respuesta) => {
        this.roturasInforme = respuesta;
        this.cargando = false;
        console.log(this.roturasInforme);
      },
      error: (error) => {
        console.error(error);
        this.error = true;
        this.cargando = false;
      }
    });
  }

  obtenerNombreBimestre(): string {
    const meses = [
      'Enero - Febrero',
      'Marzo - Abril',
      'Mayo - Junio',
      'Julio - Agosto',
      'Septiembre - Octubre',
      'Noviembre - Diciembre'
    ];

    return meses[this.bimestre - 1] ?? 'Bimestre desconocido';
  }

  get totalRoturas(): number {
    return this.roturasInforme.length;
  }

  get totalFinanciadas(): number {
    return this.roturasInforme.filter(
      rotura => rotura.rip === 'financiada'
    ).length;
  }

  get totalCanceladas(): number {
    return this.roturasInforme.filter(
      rotura => rotura.rip === 'cancelada'
    ).length;
  }

  get valorTotal(): number {
    return this.roturasInforme.reduce(
      (total, rotura) => total + Number(rotura.amount || 0),
      0
    );
  }

  imprimirInforme() {
    window.print();
  }

  guardarNombreAprendiz(event: Event) {
    this.nombreAprendiz = (event.target as HTMLInputElement).value;
    localStorage.setItem('nombreAprendiz', this.nombreAprendiz);
  }

  guardarNombreIngeniero(event: Event) {
    this.nombreIngeniero = (event.target as HTMLInputElement).value;
    localStorage.setItem('nombreIngeniero', this.nombreIngeniero);
  }
}