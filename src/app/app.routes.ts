import { Routes } from '@angular/router';

import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { HomeComponent } from './views/home/home.component';
import { ListaAlarmasComponent } from './views/lista-alarmas/lista-alarmas.component';
import { DetalleAlarmaComponent } from './views/detalle-alarma/detalle-alarma.component';
// import { ListaUbicacionesComponent } from './views/lista-ubicaciones/lista-ubicaciones.component';
// import { DetalleUbicacionComponent } from './views/detalle-ubicacion/detalle-ubicacion.component';
// import { ReportesComponent } from './views/reportes/reportes.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { sesionGuardGuard } from './guards/sesion-guard.guard';
import { sesionGuardChildGuard } from './guards/sesion-guard-child.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //TODO: En realidad aqui iria landing page
  { path: 'login', component: LoginRegisterComponent},
  {
    path: 'app',
    canActivate: [sesionGuardGuard],
    canActivateChild: [sesionGuardChildGuard],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'lista-alarmas', pathMatch: 'full'}, //TODO: En realidad aqui iria dashboard page
      { path: 'lista-alarmas', component: ListaAlarmasComponent},
      { path: 'detalle-alarma', component: DetalleAlarmaComponent},
      { path: 'detalle-alarma/:id', component: DetalleAlarmaComponent},
      // { path: 'lista-ubicaciones', component: ListaUbicacionesComponent},
      // { path: 'detalle-ubicacion', component: DetalleUbicacionComponent},
      // { path: 'reportes', component: ReportesComponent},
    ],
  },
  { path: '**', component: PageNotFoundComponent}
];
