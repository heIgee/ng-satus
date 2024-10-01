import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BrowserStorageService } from '../../shared/services/browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ToppingsService {
  private _toppingList = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  private _selectedToppings = new BehaviorSubject<string[]>([]);

  constructor(private readonly storageService: BrowserStorageService) {}

  get toppingList(): string[] {
    return this._toppingList;
  }

  get selectedToppings$(): Observable<string[]> {
    return this._selectedToppings.asObservable();
  }

  get selectedToppings(): string[] {
    return this._selectedToppings.value;
  }

  loadToppings(): void {
    const storedToppings = this.storageService.get('selectedToppings');
    if (storedToppings) {
      this._selectedToppings.next(JSON.parse(storedToppings));
    }
  }

  updateSelectedToppings(toppings: string[]): void {
    this._selectedToppings.next(toppings);
    this.storageService.set('selectedToppings', JSON.stringify(toppings));
  }

  subscribeToToppings(callback: (toppings: string[]) => void): Subscription {
    return this._selectedToppings.subscribe(callback);
  }
}
