import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog.component';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';


import { ConfirmModal } from './commonModals/confirm-modal';

import { LimpiarCorreoDirective } from './directives/limpiar-correo/limpiar-correo';
import { LimpiarContrasenaDirective } from './directives/limpiar-campos/limpiar-campos';
import { TimeDirective } from './directives/time/time';
import { TimezoneDirective } from './directives/timezone/timezone';
import { FilterItemDirective } from './directives/filter-item/filter-item.directive';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SpinnerComponent,
    ConfirmModal,
    TimeDirective,
    LimpiarCorreoDirective,
    LimpiarContrasenaDirective,
    TimezoneDirective,
    ConfirmationDialogComponent,
    FilterItemDirective
  ],
  imports: [ 
    CommonModule,
    MaterialModule
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent,
    ConfirmModal,
    LimpiarCorreoDirective,
    LimpiarContrasenaDirective,
    TimezoneDirective,
    TimeDirective,
    FilterItemDirective
   ]
})
export class SharedModule { }