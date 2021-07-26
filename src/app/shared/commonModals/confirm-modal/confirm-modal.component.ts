import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})


export class ConfirmModal {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  onYesClick(): void {
    this.dialogRef.close(1);
  }

  onCancelClick(): void {
    this.dialogRef.close(-1);
  }
}
