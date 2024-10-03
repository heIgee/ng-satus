import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectToppingsComponent } from '../select-toppings/select-toppings.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToppingsService } from './toppings.service';

@Component({
  selector: 'app-toppings',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    SelectToppingsComponent,
  ],
  template: `
    <app-select-toppings />
    <br />
    <button mat-flat-button (click)="openDialog()">Order</button>
  `,
})
export class ToppingsComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly toppingsService: ToppingsService,
  ) {}

  ngOnInit(): void {
    this.toppingsService.loadToppings();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log('Your order:', result);
      } else {
        console.log('Order was cancelled');
      }
    });
  }
}
