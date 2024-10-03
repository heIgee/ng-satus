import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SelectToppingsComponent } from './select-toppings/select-toppings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    SelectToppingsComponent,
  ],
  template: `
    <h1>{{ title }}</h1>
    <section>
      <router-outlet />
    </section>
    <nav>
      <a
        mat-button
        routerLink="/"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
      >
        Home
      </a>
      <a
        mat-button
        routerLink="/toppings"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
      >
        Toppings
      </a>
      <a
        mat-button
        routerLink="/orders"
        routerLinkActive="active"
        ariaCurrentWhenActive="page"
      >
        Orders
      </a>
    </nav>
  `,
  styles: `
    section {
      max-height: 80vh;
      max-width: 80vw;
    }
    nav {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }
  `,
})
export class AppComponent {
  title = 'ng-satus';
}
