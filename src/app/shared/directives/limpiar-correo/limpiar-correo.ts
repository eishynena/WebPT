
import { Directive, Output, EventEmitter, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appCorreo]'
})
export class LimpiarCorreoDirective {

    constructor(public model: NgControl) { }

    @Output() limpiarCorreo: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('ngModelChange', ['$event'])

    onInputChange(event: any) {
       
          let valor = event.replace(/[^A-Za-z0-9,._@*-]*/g, '');
          this.model.valueAccessor.writeValue(valor);
          this.limpiarCorreo.emit(valor);
         
     
    }

  

}