import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectToppingsComponent } from './select-toppings/select-toppings.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToppingsService } from './services/toppings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, SelectToppingsComponent],
  template: `
    <h1>{{ title }}</h1>
    <select-toppings />
    <br />
    <button mat-flat-button (click)="openDialog()">Order</button>
  `,
})
export class AppComponent implements OnInit {
  title = 'ng-satus';

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
