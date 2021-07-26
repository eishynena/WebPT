import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from "../../environments/environment";


const AMBIENTE = environment.urlUTC;

@Injectable({
  providedIn: 'root'
})
export class UTCService {


  constructor(private http: HttpClient) { }


  convertirUTC(timezoneutc: any)
  {

      return this.http.post<HttpResponse<Blob>>(AMBIENTE.concat('/timezone-utc'), timezoneutc,
          {
              headers: new HttpHeaders({ 'Accept': 'application/json; charset=utf-8' }),
              observe: "response" as 'body',// to display the full response & as 'body' for type cast
              'responseType': 'blob' as 'json'
          });
  }
}
