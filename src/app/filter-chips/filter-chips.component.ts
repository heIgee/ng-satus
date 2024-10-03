import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Filter } from '../types/filter.type';

@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [MatChipsModule],
  template: `
    @if (filters.length > 0) {
    <mat-chip-set>
      @for (filter of filters; track filter.field) {
      <mat-chip removable (removed)="onRemoveFilter(filter.field)">
        {{ filter.field }}: {{ filter.value }}
        <mat-icon matChipRemove>❌</mat-icon>
      </mat-chip>
      }
    </mat-chip-set>
    }
  `,
})
export class FilterChipsComponent {
  @Input() filters: Filter[] = [];
  @Output() removeFilter = new EventEmitter<string>();

  onRemoveFilter(field: string) {
    this.removeFilter.emit(field);
  }
}
