import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InicioSesionService } from './inicio-sesion.service';


import * as moment from 'moment';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  public form: FormGroup;

  public mensaje: string;

  public hide: boolean = false;


  public loggingIn: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private inicioService: InicioSesionService) { }

  ngOnInit(): void {
 
    this.form = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });


  }

  onIniciarSesion() {
    this.loggingIn = true;
    if(this.form.controls['username'].value.toString() != null)
    {
      this.form.controls['username'].setValue(this.inicioService.limpiarCampo(this.form.controls['username'].value.toString(),"correo"))
    }
    if(this.form.controls['password'].value.toString() != null)
    {
      this.form.controls['password'].setValue(this.inicioService.limpiarCampo(this.form.controls['password'].value.toString(),"contrasena"))
    }
    
   this.inicioService.iniciarSesion(this.form.controls['username'].value.toString().toLowerCase(), this.form.controls['password'].value).subscribe(
      response => {
       // console.log(response);
        let token = response.body['sessionTokenBck'];
        
        this.inicioService.inicializar(token);

   

        this.inicioService.setSession( 
            token,
            this.form.controls['username'].value.toString().toLowerCase()
          );

          this.loggingIn = false;
         this.router.navigate(['booking']);
      },
      error => {
        this.loggingIn = false;


        if (error.error.mensaje) {
          this.mensaje = error.error.mensaje;
        } else {
          this.mensaje = "No se pudo iniciar sesión";
        }
      }
    );
  }

}
