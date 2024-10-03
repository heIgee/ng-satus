import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ToppingsComponent } from './toppings/toppings.component';

export const routes: Routes = [
  { path: 'toppings', component: ToppingsComponent },
  { path: 'orders', component: OrdersComponent },
];
