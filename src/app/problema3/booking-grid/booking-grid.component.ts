import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatRadioModule } from '@angular/material/radio';
import { Problema3Service } from '../../problema3/problema3.service';
import { InicioSesionService } from '../../inicio-sesion/inicio-sesion.service';

import * as moment from 'moment';

export interface PeriodicElement {
  bookingid: any;
  cliente: string;
  fecha: any;
  direccion: string;
  precio: any;
};

/*export const ELEMENT_DATA: PeriodicElement[] = [
  { bookingid: 1178, cliente: "Hydrogen", fecha: "11/06/2020", direccion: "H", precio: 1000 },
  { bookingid: 1160, cliente: "Hydrogen 2", fecha: "11/06/2020", direccion: "H", precio: 3000 },
  { bookingid: 1158, cliente: "Hydrogen 4", fecha: "11/06/2020", direccion: "H", precio: 4500 },
  { bookingid: 1280, cliente: "Hydrogen 3", fecha: "11/06/2020", direccion: "H", precio: 550000 },
  { bookingid: 1260, cliente: "Hydrogen 5", fecha: "11/06/2020", direccion: "H", precio: 6000 },
  { bookingid: 1378, cliente: "Hydrogen 6", fecha: "11/06/2020", direccion: "H", precio: 87800 },
  { bookingid: 1400, cliente: "Hydrogen 7", fecha: "11/06/2020", direccion: "H", precio: 1000 },
  { bookingid: 1402, cliente: "Hydrogen 8", fecha: "11/06/2020", direccion: "H", precio: 11000 }
];*/



export const CONDITIONS_FUNCTIONS = {
  // search method base on conditions list value
  "contiene": function (value, filterdValue) {

    return value.toString().includes(filterdValue.toString());
  },
  "mayor-igual": function (value, filterdValue) {
    
    return Number(value) >= Number(filterdValue);
    
  },
  "menor-igual": function (value, filterdValue) {
 
    return Number(value) <= Number(filterdValue);
  }
};



export const CONDITIONS_LIST = [
  { value: "contiene", label: "Contiene" },
  { value: "mayor-igual", label: "Mayor o igual a" },
  { value: "menor-igual", label: "Menor o igual a" }
];



@Component({
  selector: 'app-booking-grid',
  templateUrl: './booking-grid.component.html',
  styleUrls: ['./booking-grid.component.scss']
})
export class BookingGridComponent implements OnInit {
  public displayedColumns: string[] = ["bookingid", "cliente", "fecha", "direccion", "precio"];

  public conditionsList = CONDITIONS_LIST;
  public conditionsListOP = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchValueOP: any = {};
  public searchCondition: any = {};
  public searchConditionOP: any = {};
  private filterMethods = CONDITIONS_FUNCTIONS;
  private filterMethodsOP = CONDITIONS_FUNCTIONS;
  public language: any
  public user_name: string;

  public logicOperator = [
    { bookingid:
      {value:1, value2:2, or:true, and: false, show: false}
    },
    {  precio:
      {value:1, value2:2, or:true, and: false, show: false } 
  }
  ]; 

  public ultima_conexion: string;

  public dataSource;

  public booking = [];

  public loading :boolean = false;

  public mensaje: string;

  public logged: any = this.iniciosesion.auth();

  public  ELEMENT_DATA: PeriodicElement[] = [];

  public opcion: boolean = false;

  public show: boolean = false;

  constructor(public iniciosesion :InicioSesionService,
    public problema3 :Problema3Service) {
   
   }

  ngOnInit() {
  
    this.loading = true; 
    this.initFirstFilter();
    this.problema3.getBookingJson(this.logged.user.email,this.logged.user.token,true)
    .finally(   () => {   
    
    if(this.ELEMENT_DATA.length > 0){
      this.loading = false;
      this.initFirstFilter();
    }else{
      this.loading = false;
    }

  })
    .subscribe((response: any) => {
    
     if (response) {
     
       for(let i = 0; i < response.body.length; i ++)
       {
         let ts = Number(response.body[i]['bookingTime']); // cast it to a Number
         var date = new Date(ts); // works
         const format1 = "YYYY-MM-DD HH:mm:ss";
         let booking = {
          bookingid:response.body[i]['bookingId'],
           cliente: response.body[i]['locationId']['tutenUser']['firstName']+" "+ response.body[i]['locationId']['tutenUser']['lastName'],
           fecha:  moment(date).format(format1),
           direccion:response.body[i]['locationId']['streetAddress'],
           precio:response.body[i]['bookingPrice']
 
         };
         this.ELEMENT_DATA.push(booking);
       }
 
      
     }else{
      this.loading = false;
     }
   }, error => {
    this.loading = false;
     if (error.error.mensaje) {
       this.mensaje = error.error.mensaje;
     } else {
       this.mensaje = "No se pudo obtener la data";
     }
   });

  
  }

  initFirstFilter(){
    this.dataSource =  new MatTableDataSource(this.ELEMENT_DATA);

    this.dataSource.filterPredicate = (p: PeriodicElement, filtre: any) => {
     
      let result = true;
      let keys = Object.keys(p); 
   
      for (const key of keys) {
        let searchCondition = filtre.conditions[key]; 

        if (searchCondition && searchCondition !== "none") {
          if (
            filtre.methods[searchCondition](p[key], filtre.values[key]) ===
            false
          ) {
            result = false; 
            break;
          }
        }
      }

      return result;
    };
   
  }

  applyFilter(column:string, index:number ) {
    if(this.searchValue!= null && this.searchValue!= undefined && !(Object.keys(this.searchValue).length === 0 && this.searchValue.constructor === Object)){
        let searchFilter: any = {
          values: this.searchValue,
          conditions: this.searchCondition,
          methods: this.filterMethods,
        };
        this.dataSource.filter = searchFilter;
        this.logicOperator[index][column].show = true;
      
    }

    if(this.logicOperator[index][column].show  == true && (this.searchValueOP!= null && this.searchValueOP!= undefined && this.searchValueOP[column]!= null &&
      !(Object.keys(this.searchValueOP).length === 0 && this.searchValueOP.constructor === Object))){
      this.setupFilterLogicalOperator(column,index);
      this.applyFilterLogic(column,index);
    }


  }

  setupFilterLogicalOperator(column: string, index:number) {

    this.dataSource.filterPredicate = (d: PeriodicElement, filter: string) => {
      const textToSearch = d[column];

      let firstFrag : any;
      let secfrag: any;
      if(this.searchCondition[column] == 'contiene'){

        firstFrag = textToSearch.toString().includes(this.searchValue[column].toString());

      }else  if(this.searchCondition[column] == 'mayor-igual'){

        firstFrag = Number(textToSearch) >= Number(this.searchValue[column]);

      }else  if(this.searchCondition[column] == 'menor-igual'){

        firstFrag = Number(textToSearch) <= Number(this.searchValue[column]);

      }

     
          if(this.searchConditionOP[column] == 'contiene' ){

            secfrag = textToSearch.toString().includes(this.searchValueOP[column].toString());
    
          }else if(this.searchConditionOP[column] == 'mayor-igual' ){
    
            secfrag = Number(textToSearch) >= Number(this.searchValueOP[column]);
    
          }else if(this.searchConditionOP[column] == 'menor-igual' ){
    
            secfrag = Number(textToSearch) <= Number(this.searchValueOP[column]);
    
          }
          
          if(this.logicOperator[index][column].or == true && this.logicOperator[index][column].show == true){
    
            return firstFrag || secfrag;
    
          }else if(this.logicOperator[index][column].and == true && this.logicOperator[index][column].show == true){
    
            return firstFrag && secfrag;
    
          }else if(this.logicOperator[index][column].show == false){
            return d;
          }
     
  
       
     
    
    };

  }


  applyFilterLogic(column:string, index:number) {
    
    if(this.searchValueOP!= null && this.searchValueOP!= undefined && this.searchValueOP[column]!= null &&
      !(Object.keys(this.searchValueOP).length === 0 && this.searchValueOP.constructor === Object)){
 
        this.dataSource.filter = this.searchValueOP[column];
        
      
    }




  }

  secondOption(column:string, index:number){
    this.setupFilterLogicalOperator(column,index);
    this.applyFilterLogic(column, index);
  
   
  }

    clearColumn(columnKey: string, index: number, event): void {
      this.searchValueOP[columnKey] = null;
      this.searchConditionOP[columnKey] = "none";
      this.logicOperator[index][columnKey].show = false;
      this.initFirstFilter();
      this.applyFilter(columnKey,index);
      //this.setupFilterLogicalOperator(columnKey,index);
      //this.applyFilterLogic(columnKey,index);
      event.stopPropagation();
     
    }


  checkBoxSelected(event, column:string, index:number){

    if(event.value == 1){
      this.logicOperator[index][column].and = true;
      this.logicOperator[index][column].or = false;
    }else{
      this.logicOperator[index][column].and = false;
      this.logicOperator[index][column].or = true;
    }

    this.setupFilterLogicalOperator(column,index);
    this.applyFilterLogic(column,index);
  }
}

