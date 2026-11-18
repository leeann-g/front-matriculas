
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe, CurrencyPipe } from '@angular/common';
import { ApiRoturas } from '../../../services/api-roturas';
import { Rotura } from '../../../models/rotura';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-roturas',
  imports: [FormsModule, TitleCasePipe, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './inicio-roturas.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './inicio-roturas.css',
})
export class InicioRoturas {

  private api = inject(ApiRoturas);

  roturas: Rotura[] = [];
  formularioEditar = false;
  roturaEditar!: Rotura;
  roturaId!: number;
  mostrarMensaje = false;
  mensajeActualizacion = {
    mensaje: ''
  };
  filtroFecha: string = '';
  filtroBusqueda: string = '';
  filtroEstado: string = 'todas';

  mensajeToast = '';
  loading = false;

  ngOnInit() {

    this.mensajeToast = history.state.mensaje ?? '';

    setTimeout(() => {
      this.mensajeToast = '';
    }, 3000);

    this.api.getRoturas().subscribe({
      next: (respuesta) => {
        this.roturas = respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getRoturasFiltradas() {
    const busqueda = this.filtroBusqueda.toString().toLowerCase().trim();
    return this.roturas.filter(roturas =>
    (
      this.filtroFecha === '' ||
      roturas.payment_date.includes(this.filtroFecha)
    )
    &&
    (
      roturas.tuition.name.includes(busqueda) ||
      roturas.tuition.code.includes(busqueda) ||
      roturas.tuition.nuid.toString().includes(busqueda) ||
      roturas.amount.toString().includes(busqueda)
    )
      &&
    (
      this.filtroEstado === 'todas' ||
      roturas.rip === this.filtroEstado
    )
    );
  }

  limpiarFiltro(){
    this.filtroFecha = '';
    this.filtroBusqueda = '';
    this.filtroEstado = 'todas'
  }
  formuRoturaEditar = new FormGroup({
    rip: new FormControl('', {
      nonNullable: true
    }),
    payment: new FormControl('', {
      nonNullable: true
    }),
    amount: new FormControl(0, {
      nonNullable: true
    }),
    payment_date: new FormControl('', {
      nonNullable: true
    }),
    observation: new FormControl('', {
      nonNullable: true
    })
  });

  editarRotura(rotura: Rotura) {
    this.roturaEditar = rotura;
    this.roturaId = rotura.id;
    this.formularioEditar = true;
    document.body.style.overflow = 'hidden';
    this.formuRoturaEditar.patchValue({
      rip: rotura.rip,
      payment: rotura.payment,
      amount: Number(rotura.amount),
      payment_date: rotura.payment_date,
      observation: rotura.observation ?? ''
    });
  }

  guardarCambios() {
    if (this.formuRoturaEditar.invalid || this.loading) {
      this.formuRoturaEditar.markAllAsTouched();
      return;
    }

    const datos = this.formuRoturaEditar.getRawValue();
    this.loading = true;
    this.api.updateRotura(this.roturaId, datos).subscribe({
      next: (respuesta) => {

        // Actualizar la tabla sin recargar la página

        this.roturas = this.roturas.map(rotura =>
          rotura.id === this.roturaId
            ? { ...rotura, ...datos }
            : rotura
        );

        this.mensajeActualizacion = {
          mensaje: 'Actualizada'
        };

        this.loading = false;
        this.cerrarForm();
        this.mostrarMensaje = true;
      },

      error: (error) => {

        console.error(error);

        this.loading = false;

        this.mensajeActualizacion = {
          mensaje: 'Error al actualizar la rotura'
        };

        this.mostrarMensaje = true;

      }

    });

  }
  cerrarForm() {

    this.formularioEditar = false;

    document.body.style.overflow = '';

  }

  cerrarMensaje() {
    this.mostrarMensaje = false;
  }

}
