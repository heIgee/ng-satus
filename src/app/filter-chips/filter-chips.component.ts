import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { FormattedFilterType } from '../enums/formatted-filter-type.enum';
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
        {{ filter.field }}
        {{ formattedFilterType[filter.operation] || filter.operation }}
        {{ filter.value }}
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

  formattedFilterType = FormattedFilterType;

  onRemoveFilter(field: string) {
    this.removeFilter.emit(field);
  }
}
