import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { ToppingsService } from '../toppings/toppings.service';

@Component({
  standalone: true,
  selector: 'app-select-toppings',
  imports: [MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field>
      <mat-label>Toppings</mat-label>
      <mat-select [formControl]="toppings" multiple>
        @for (topping of toppingsService.toppingList; track topping) {
        <mat-option [value]="topping">{{ topping }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectToppingsComponent implements OnInit, OnDestroy {
  toppings = new FormControl<string[]>([]);
  private subscriptions: Subscription[] = [];

  constructor(public readonly toppingsService: ToppingsService) {}

  ngOnInit(): void {
    this.toppings.setValue(this.toppingsService.selectedToppings);

    this.subscriptions.push(
      this.toppings.valueChanges.subscribe((selectedToppings) =>
        this.toppingsService.updateSelectedToppings(selectedToppings ?? []),
      ),
    );

    this.subscriptions.push(
      this.toppingsService.selectedToppings$.subscribe((toppings) => {
        this.toppings.setValue(toppings, { emitEvent: false });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
