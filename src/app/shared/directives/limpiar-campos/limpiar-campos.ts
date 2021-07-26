import { Directive, Output, EventEmitter, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appContrasena]'
})
export class LimpiarContrasenaDirective {

    constructor(public model: NgControl) { }

    @Output() limpiarContrasena: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('ngModelChange', ['$event'])

    onInputChange(event: any) {

          let valor = event.replace(/[^A-Za-z0-9._!?@#$%&*-]*/g, ''); //@,*,#,%,!,-,_, . $,?,&
        
          this.model.valueAccessor.writeValue(valor);
          this.limpiarContrasena.emit(valor);
         
     
    }

  

}