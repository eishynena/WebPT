import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebPT';
}

export function getHeaders(adminemail?: string,token?: string,app?: string,password?: string): HttpHeaders {
  let headers = new HttpHeaders;
  headers = token ? headers.set('adminemail', adminemail).set('token', token).set('app', app).set('Accept', 'application/json') 
  : headers.set('app', app).set('password', password).set('Accept', 'application/json');
 
  return headers;
}