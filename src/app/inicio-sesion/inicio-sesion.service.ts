import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { getHeaders } from "../app.component";
import { environment } from "../../environments/environment";
const AMBIENTE = environment;
@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  public usuario: string = '0';
  public token: string = '0';
  constructor(private http: HttpClient) { }

       /************************/
    /***********Limpieza final de campos******/
    limpiarCampo(valor, origen)
    {
        if(origen == "texto-espacio"){
            let campo =  valor.replace(/[^A-Za-z0-9 ]/g, '');
              var end = campo.length;
           
              if(campo.substring(0,1) == " "){
               campo = campo.slice(0, -1);
               return campo;
         
              }else if(campo.substring(end-2,end-1) == " " && campo.substring(end-1,end) == " ") {
               campo = campo.slice(0, -1);
               return campo;
              
             }else{
               return campo;
             }   
          }else if(origen == "texto"){
            return valor.replace(/[^A-Za-z0-9]/g, '');
        
          }else if(origen == "contrasena"){
            return  valor.replace(/[^A-Za-z0-9._!?@#$%&*-]*/g, '');//@,*,#,%,!,-,_, . $,?,&
        
          }else if(origen == "numeros"){
            return valor.toString().replace(/[^0-9]*/g, '');
          }else if(origen == "solo-texto"){
            return  valor.replace(/[^A-Za-z]*/g, '');
        
          }else if(origen == "solo-texto-espacio"){
              let campo =  valor.replace(/[^A-Za-z ]*/g, '');
             var end = campo.length;
           
             if(campo.substring(0,1) == " "){
              campo = campo.slice(0, -1);
              return campo;
        
             }else if(campo.substring(end-2,end-1) == " " && campo.substring(end-1,end) == " ") {
              campo = campo.slice(0, -1);
              return campo;
             
            }else{
              return campo;
            }   
        
          }else if(origen == "correo"){
            let campo = valor.replace(/[^A-Za-z0-9,._@*-]*/g, '');
            var end = campo.length;
            if(campo.substring(0,1) == " ")
            {
              campo = campo.slice(0, -1);
              return campo;
            }
            else if(campo.substring(end-2,end-1) == " " && campo.substring(end-1,end) == " ")
            {
              campo = campo.slice(0, -1);
              return campo;
            }
            else
            {
              return campo;
            } 
          }
          else if(origen == "numeros-espacio")
          {
            let campo = valor.replace(/[^0-9 ]*/g, '');
            var end = campo.length;
            if(campo.substring(0,1) == " ")
            {
              campo = campo.slice(0, -1);
              return campo;
            }
            else if(campo.substring(end-2,end-1) == " " && campo.substring(end-1,end) == " ")
            {
              campo = campo.slice(0, -1);
              return campo;
            }
            else
            {
              return campo;
            }   
          }else if(origen == "filtro"){
            return valor.replace(/[^A-Za-z0-9 ,.:;_/!@#$~&-]*/g, '');
        }
    }

    inicializar(token: string) {
      this.token = token;
  }
  
    iniciarSesion(email: string, contrasena: string) {
      this.usuario = email;

      return this.http.put<any>(AMBIENTE.urlApi + email,null,
          {
            headers: getHeaders(null,null,AMBIENTE.app,contrasena),
            observe: 'response'
          });

  }

  public setSession (token: string, email:string) {
    localStorage.setItem("token", token),
    localStorage.setItem("email", email);
}

public clearSession () {
    localStorage.clear();
}

public auth() {
    var auth = {};

    if (localStorage.getItem("token")) {
        auth = {
            "auth": true,
            "user": {
                "token": localStorage.getItem("token"),
                "email": localStorage.getItem("email")
            }
        };

      
    } else {
        auth = { "auth": false };
    }

    return auth;
}
}
