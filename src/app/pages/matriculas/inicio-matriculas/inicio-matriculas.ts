
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ApiMatriculas } from '../../../services/api-matriculas';
import { ApiRoturas } from '../../../services/api-roturas';
import { Matricula } from '../../../models/matricula';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-matriculas',
  imports: [
    FormsModule,
    RouterLink,
    TitleCasePipe,
    ReactiveFormsModule
  ],
  templateUrl: './inicio-matriculas.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './inicio-matriculas.css',
})
export class InicioMatriculas {

  private api = inject(ApiMatriculas);
  private apiRoturas = inject(ApiRoturas);
  private router = inject(Router);

  matriculas: Matricula[] = [];
  formularioEditar = false;
  matriculaEditar!: Matricula;
  matriculaId!: number;
  filtroFecha: string = '';
  filtroBusqueda: string = '';
  filtroEstado: string = 'todas';
  mostrarMensaje = false;
  mensajeActualizacion = {
    mensaje: ''
  };
  mensajeErrorRotura = '';

  mensajeToast = '';
  loading = false;
  mostrarFormularioRotura = false;

  ripStatusOriginal = '';

  ngOnInit() {

    this.mensajeToast = history.state.mensaje ?? '';

    setTimeout(() => {
      this.mensajeToast = '';
    }, 3000);

    this.api.getMatriculas().subscribe({
      next: (respuesta) => {
        this.matriculas = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getMatriculasFiltradas() {

    const busqueda = this.filtroBusqueda.trim().toLowerCase();

    return this.matriculas.filter(matricula =>
      (
        this.filtroFecha === '' ||
        matricula.date.includes(this.filtroFecha)
      )
      &&
      (
        matricula.name.toLowerCase().includes(busqueda) ||
        matricula.code.toLowerCase().includes(busqueda) ||
        matricula.nuid.toString().includes(busqueda) ||
        matricula.meter_number.toString().includes(busqueda)
      )
      &&
      (
        this.filtroEstado === 'todas' ||
        matricula.status === this.filtroEstado
      )
    );
  }

  limpiarFiltro() {

    this.filtroFecha = '';
    this.filtroBusqueda = '';
    this.filtroEstado = 'todas';
  }

  // FORMULARIO DE ROTURA
  formRotura = new FormGroup({

    tuition_id: new FormControl(0, {
      nonNullable: true,
      validators: Validators.required
    }),

    rip: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),

    payment: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),

    amount: new FormControl(0, {
      nonNullable: true,
      validators: Validators.required
    }),

    payment_date: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),

    observation: new FormControl('', {
      nonNullable: true
    })
  });

  // FORMULARIO DE EDICIÓN DE MATRÍCULA
  formuMatriculaEditar = new FormGroup({

    date: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    code: new FormControl('', { nonNullable: true }),
    nuid: new FormControl(0, { nonNullable: true }),
    meter_number: new FormControl('', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    rip_status: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
    observation: new FormControl('', { nonNullable: true })

  });

  // ABRIR EDICIÓN DE MATRÍCULA
  editarMatricula(matricula: Matricula) {

    this.matriculaEditar = matricula;
    this.formularioEditar = true;

    this.matriculaId = matricula.id;
    this.ripStatusOriginal = matricula.rip_status;

    document.body.style.overflow = 'hidden';

    // Habilitar primero el control
    this.formuMatriculaEditar.controls.rip_status.enable();

    this.formuMatriculaEditar.patchValue({

      date: matricula.date,
      name: matricula.name,
      code: matricula.code,
      nuid: matricula.nuid,
      meter_number: matricula.meter_number,
      address: matricula.address,
      rip_status: matricula.rip_status,
      status: matricula.status,
      observation: matricula.observation

    });

    // Si ya tiene rotura, bloquear el estado
    if (matricula.rip_status === 'si') {
      this.formuMatriculaEditar.controls.rip_status.disable();
    }
  }

  // GUARDAR CAMBIOS DE MATRÍCULA
  guardarCambios() {

    const datos = this.formuMatriculaEditar.getRawValue();

    const registrarRotura =
      this.ripStatusOriginal === 'no' &&
      datos.rip_status === 'si';

    // No marcar la matrícula como si tuviera rotura todavía
    const datosMatricula = {
      ...datos,
      rip_status: registrarRotura ? 'no' : datos.rip_status
    };

    this.loading = true;

    this.api.updateMatricula(this.matriculaId, datosMatricula).subscribe({

      next: (respuesta) => {

        // Convertimos la respuesta al modelo Matricula
        const respuestaMatricula = respuesta as unknown as Matricula;

        this.matriculas = this.matriculas.map(matricula =>
          matricula.id === this.matriculaId
            ? { ...matricula, ...respuestaMatricula }
            : matricula
        );

        this.loading = false;

        // Solo abrir el formulario si el backend confirma que sigue en "no"
        if (
          registrarRotura &&
          respuestaMatricula.rip_status === 'no'
        ) {

          this.formRotura.reset({

            tuition_id: this.matriculaId,
            rip: '',
            payment: '',
            amount: 0,
            payment_date: '',
            observation: ''

          });

          this.formularioEditar = false;
          this.mostrarFormularioRotura = true;

          document.body.style.overflow = 'hidden';

        } else {

          this.mensajeActualizacion = {
            mensaje: registrarRotura
              ? 'Esta matrícula ya tiene una rotura registrada'
              : 'Matrícula actualizada correctamente'
          };

          this.mostrarMensaje = true;
        }
      },

      error: (error) => {

        console.log(error);
        this.loading = false;

      }
    });
  }

  // CREAR ROTURA
  crearRotura() {

    if (this.formRotura.invalid) {
      this.formRotura.markAllAsTouched();
      this.mensajeErrorRotura = 'Completa todos los campos obligatorios.';
      return;
    }

    const datos = this.formRotura.getRawValue();

    this.loading = true;
    this.mensajeErrorRotura = '';

    this.apiRoturas.postRotura(datos).subscribe({

      next: () => {

        this.matriculas = this.matriculas.map(matricula =>
          matricula.id === this.matriculaId
            ? { ...matricula, rip_status: 'si' }
            : matricula
        );

        this.loading = false;
        this.mostrarFormularioRotura = false;

        this.mensajeActualizacion = {
          mensaje: 'Matrícula actualizada y rotura registrada correctamente'
        };

        this.mostrarMensaje = true;
        document.body.style.overflow = 'hidden';
      },

      error: (error) => {

        this.loading = false;

        if (error.status === 0) {
          this.mensajeErrorRotura =
            'No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo nuevamente.';

        } else if (error.status === 409) {
          this.mensajeErrorRotura =
            'Esta matrícula ya tiene una rotura registrada.';

        } else if (error.status === 422) {
          const errores = error.error?.errors;

          this.mensajeErrorRotura = errores
            ? Object.values(errores).flat().join(' ')
            : 'Los datos enviados no son válidos.';

        } else if (error.status >= 500) {
          this.mensajeErrorRotura =
            'Ocurrió un error interno en el servidor. Inténtalo más tarde.';

        } else {
          this.mensajeErrorRotura =
            error.error?.message || 'No se pudo registrar la rotura.';
        }

        console.log(error);
      }
    });
  }

  // CERRAR FORMULARIO DE EDICIÓN
  cerrarForm() {

    this.formularioEditar = false;
    document.body.style.overflow = '';
  }

  // CERRAR MENSAJES Y MODALES
  cerrarMensaje() {

    this.mostrarMensaje = false;
    this.formularioEditar = false;
    this.mostrarFormularioRotura = false;

    document.body.style.overflow = '';
  }
}
