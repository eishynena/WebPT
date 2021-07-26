import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Router } from '@angular/router';

import { Problema3Service } from '../../problema3/problema3.service';
import { InicioSesionService } from '../../inicio-sesion/inicio-sesion.service';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide:boolean;
  sidebarOpened;


 // public config: PerfectScrollbarConfigInterface = {};

  private _mobileQueryListener: () => void;

  public user_name: string;

  public ultima_conexion: string;
  public logged: any = this.iniciosesion.auth();
  constructor(public iniciosesion :InicioSesionService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private router: Router,) { 

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    

    if ( this.logged.auth ) {
      this.router.navigate(['booking']);
     
    }else{
      this.router.navigate(['/inicio-sesion']);
    }
  }

  ngOnInit(){

  }

  onCerrarSesion() {
    this.iniciosesion.clearSession();

    this.router.navigate(['/inicio-sesion']);
  }
}
