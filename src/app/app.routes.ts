import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { InicioMatriculas } from './pages/matriculas/inicio-matriculas/inicio-matriculas';
import { FormularioMatriculas } from './pages/matriculas/formulario-matriculas/formulario-matriculas';
import { InicioRoturas } from './pages/roturas/inicio-roturas/inicio-roturas';
import { FormularioRoturas } from './pages/roturas/formulario-roturas/formulario-roturas';
import { Configuracion } from './pages/configuracion/configuracion';
import { Homenaje } from './pages/homenaje/homenaje';
import { Desarrollador } from './pages/desarrollador/desarrollador';
import { InformeRoturas } from './pages/roturas/informe-roturas/informe-roturas';
import { DetalleInforme } from './pages/roturas/detalle-informe/detalle-informe';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'inicio'},
    {path: 'inicio', component: Inicio},
    {path: 'configuracion', component: Configuracion},
    {path: 'inicio-matriculas', component: InicioMatriculas},
    {path: 'formulario-matricula', component: FormularioMatriculas},
    {path: 'inicio-roturas', component: InicioRoturas},
    {path: 'formulario-roturas', component:FormularioRoturas},
    {path: 'homenaje', component: Homenaje},
    {path: 'desarrollador', component: Desarrollador},
    {path: 'informe-roturas', component: InformeRoturas},
    {path: 'detalle-informe/:anio/:bimestre', component: DetalleInforme}
];