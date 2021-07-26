import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UTCComponent } from './utc/utc.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { SharedModule } from './shared/shared.module';
import { Problema3Module } from './problema3/problema3.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import locale from '@angular/common/locales/es-VE';

import { MatPaginatorIntl } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorTranslate } from './shared/material/material.intl';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';



registerLocaleData(locale, 'es-VE');

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    UTCComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    Problema3Module,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [MatButtonModule],
  providers: [  
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: MatPaginatorIntl, useClass: MatPaginatorTranslate },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
