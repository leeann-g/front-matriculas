import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ApiMatriculas } from '../../../services/api-matriculas';
import { ApiRoturas } from '../../../services/api-roturas';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Matricula } from '../../../models/matricula';

@Component({
  selector: 'app-formulario-matriculas',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-matriculas.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './formulario-matriculas.css',
})
export class FormularioMatriculas {
  private apiMatriculas = inject(ApiMatriculas);
  private apiRoturas = inject(ApiRoturas);
  private router = inject(Router);
  loading = false;
  matricula!: Matricula;
  matriculaId!: number;
  mensajePrueba = false;
  mostrarFormularioRotura = false;
  mensajeCreacion = false;
  mensajeErrorMatricula = '';
  mensajeErrorRotura = '';


  formMatricula = new FormGroup({
    date: new FormControl('', { nonNullable: true, validators: Validators.required }),
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    code: new FormControl('', { nonNullable: true, validators: Validators.required }),
    nuid: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    meter_number: new FormControl('', { nonNullable: true, validators: Validators.required }),
    address: new FormControl('', { nonNullable: true, validators: Validators.required }),
    rip_status: new FormControl('no', { nonNullable: true, validators: Validators.required }),
    status: new FormControl('activa', { nonNullable: true, validators: Validators.required }),
    observation: new FormControl('', { nonNullable: true })
  });

  formRotura = new FormGroup({
    tuition_id: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    rip: new FormControl('', { nonNullable: true, validators: Validators.required }),
    payment: new FormControl('', { nonNullable: true, validators: Validators.required }),
    amount: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    payment_date: new FormControl('', { nonNullable: true, validators: Validators.required }),
    observation: new FormControl('', { nonNullable: true })
  });

  crearMatricula() {
    if (this.formMatricula.invalid) {
      this.formMatricula.markAllAsTouched();
      this.mensajeErrorMatricula = 'Completa todos los campos obligatorios.';
      return;
    }

    const datos = this.formMatricula.getRawValue();
    datos.name = datos.name.toLowerCase();

    this.loading = true;
    this.mensajeErrorMatricula = '';

    this.apiMatriculas.postMatriculas(datos).subscribe({
      next: (respuesta) => {
        this.matricula = respuesta;
        this.matriculaId = respuesta.id;

        this.formRotura.patchValue({
          tuition_id: this.matriculaId
        });

        this.loading = false;

        if (respuesta.rip_status === 'si') {
          this.mostrarFormularioRotura = true;
        } else {
          this.router.navigate(['/inicio-matriculas'], {
            state: {
              mensaje: `Matricula ${this.matricula.nuid} creada`
            }
          });
        }
      },
      error: (error) => {
        this.loading = false;

        if (error.status === 0) {
          this.mensajeErrorMatricula =
            'No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo nuevamente.';
        } else if (error.status === 422) {
          const errores = error.error?.errors;

          this.mensajeErrorMatricula = errores
            ? Object.values(errores).flat().join(' ')
            : 'Los datos enviados no son válidos.';
        } else if (error.status === 409) {
          this.mensajeErrorMatricula =
            'Ya existe una matrícula con alguno de los datos ingresados.';
        } else if (error.status >= 500) {
          this.mensajeErrorMatricula =
            'Ocurrió un error interno en el servidor. Inténtalo más tarde.';
        } else {
          this.mensajeErrorMatricula =
            error.error?.message || 'No se pudo registrar la matrícula.';
        }

        console.log(error);
      }
    });
  }

  crearRotura() {
    const datos = this.formRotura.getRawValue();
    this.loading = true;
    this.apiRoturas.postRotura(datos).subscribe({
      next: () => {
        this.mensajeCreacion = true;
        document.body.style.overflow = 'hidden';
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }
  reiniciarForm() {
    this.formMatricula.reset({
      date: '',
      code: '',
      name: '',
      nuid: 0,
      meter_number: '',
      address: '',
      rip_status: 'no',
      status: 'activa'
    });
  }
  cerrarMensaje() {
    this.mensajeCreacion = false;
    this.router.navigate(['/inicio-roturas'], {
      state: {
        'mensaje': 'Rotura creada'
      }
    });
    document.body.style.overflow = '';
  }
}
