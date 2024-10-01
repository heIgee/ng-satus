import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SelectToppingsComponent } from '../select-toppings/select-toppings.component';
import { ToppingsService } from '../services/toppings.service';

@Component({
  selector: 'confirmation-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    SelectToppingsComponent,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Confirm Toppings</h2>
    <mat-dialog-content>
      <select-toppings />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-button
        [mat-dialog-close]="toppingsService.selectedToppings"
        cdkFocusInitial
      >
        Ok
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public readonly toppingsService: ToppingsService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
