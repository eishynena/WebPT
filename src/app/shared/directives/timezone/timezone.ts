
import { Directive, Output, EventEmitter, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appTimezone]'
})
export class TimezoneDirective {

    constructor(public model: NgControl) { }

    @Output() limpiarTimezone: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('ngModelChange', ['$event'])

    onInputChange(event: any) {

          let valor = event.replace(/[^0-9-+:]/g, '');
        
          this.model.valueAccessor.writeValue(valor);
          this.limpiarTimezone.emit(valor);
         
     
    }

  

}