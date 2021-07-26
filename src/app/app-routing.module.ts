import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UTCComponent } from './utc/utc.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { BookingComponent } from './problema3/booking/booking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'utc',
    component: UTCComponent
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  { 
  	path: 'booking', 
  	component: BookingComponent 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
