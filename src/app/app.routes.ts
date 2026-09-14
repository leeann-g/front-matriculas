import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { InicioMatriculas } from './pages/matriculas/inicio-matriculas/inicio-matriculas';
import { FormularioMatriculas } from './pages/matriculas/formulario-matriculas/formulario-matriculas';
import { InicioRoturas } from './pages/roturas/inicio-roturas/inicio-roturas';
import { FormularioRoturas } from './pages/roturas/formulario-roturas/formulario-roturas';
import { Configuracion } from './pages/configuracion/configuracion';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'inicio'},
    {path: 'inicio', component: Inicio},
    {path: 'configuracion', component: Configuracion},
    {path: 'inicio-matriculas', component: InicioMatriculas},
    {path: 'formulario-matricula', component: FormularioMatriculas},
    {path: 'inicio-roturas', component: InicioRoturas},
    {path: 'formulario-roturas', component:FormularioRoturas}
];