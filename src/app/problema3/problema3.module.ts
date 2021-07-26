import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Problema3Service } from './problema3.service';

import { SharedModule } from '../shared/shared.module';

import { BookingComponent } from './booking/booking.component';
import { BookingGridComponent } from './booking-grid/booking-grid.component';


@NgModule({
  declarations: [BookingComponent, BookingGridComponent],
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    Problema3Service
  ]
})
export class Problema3Module { }
