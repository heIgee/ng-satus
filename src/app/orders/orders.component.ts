import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
} from 'devextreme-angular';
import { DxoHeaderFilterComponent } from 'devextreme-angular/ui/nested';
import { OptionChangedEvent } from 'devextreme/ui/data_grid';
import { Order, OrdersService } from './orders.service';
import { FilterChipsComponent } from '../filter-chips/filter-chips.component';
import { Filter } from '../types/filter.type';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    CommonModule,
    FilterChipsComponent,
  ],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;

  orders: Order[];
  filters: Filter[] = [];

  showFilterRow = true;
  showHeaderFilter = true;

  applyFilterTypes = [
    {
      key: 'auto',
      name: 'Immediately',
    },
    {
      key: 'onClick',
      name: 'On Button Click',
    },
  ];

  saleAmountHeaderFilter: DxoHeaderFilterComponent['dataSource'] = [
    {
      text: 'Less than $3000',
      value: ['SaleAmount', '<', 3000],
    },
    {
      text: '$3000 - $5000',
      value: [
        ['SaleAmount', '>=', 3000],
        ['SaleAmount', '<', 5000],
      ],
    },
    {
      text: '$5000 - $10000',
      value: [
        ['SaleAmount', '>=', 5000],
        ['SaleAmount', '<', 10000],
      ],
    },
    {
      text: '$10000 - $20000',
      value: [
        ['SaleAmount', '>=', 10000],
        ['SaleAmount', '<', 20000],
      ],
    },
    {
      text: 'Greater than $20000',
      value: ['SaleAmount', '>=', 20000],
    },
  ];

  currentFilter = this.applyFilterTypes[0].key;

  constructor(private readonly reportsService: OrdersService) {}

  ngOnInit() {
    this.orders = this.reportsService.getOrders();
  }

  onOptionChanged(ev: OptionChangedEvent) {
    if (!ev.fullName.includes('filterValue')) return;

    const match = ev.fullName.match(/columns\[(\d+)\]/);

    if (!match || !match[1]) {
      throw new Error(`Unable to extract column index from: ${ev.fullName}`);
    }

    const columnIndex = parseInt(match[1], 10);
    const column = ev.component.columnOption(columnIndex);

    const field = column.dataField;
    const operation = column.selectedFilterOperation || '';
    const value = ev.value + operation;
    this.updateFilterChips(field, value);
  }

  updateFilterChips(field: string, value: string | null) {
    if (value) {
      const existingFilter = this.filters.find((f) => f.field === field);
      if (existingFilter) {
        existingFilter.value = value;
      } else {
        this.filters.push({ field, value });
      }
    } else {
      this.filters = this.filters.filter((f) => f.field !== field);
    }
  }

  removeFilter(field: string) {
    const columnIndex = this.dataGrid.instance.columnOption(field).index;

    if (columnIndex !== undefined) {
      this.dataGrid.instance.columnOption(columnIndex, 'filterValue', null);
    }

    this.filters = this.filters.filter((f) => f.field !== field);
  }

  private static getOrderDay({ OrderDate }: any) {
    return new Date(OrderDate).getDay();
  }

  calculateFilterExpression(value: string, _: unknown, target: string) {
    const column = this as any;
    if (target === 'headerFilter' && value === 'weekends') {
      return [
        [OrdersComponent.getOrderDay, '=', 0],
        'or',
        [OrdersComponent.getOrderDay, '=', 6],
      ];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  orderHeaderFilter = ({ dataSource }: any) => {
    dataSource.postProcess = (results: unknown[]) => {
      results.push({
        text: 'Weekends',
        value: 'weekends',
      });
      return results;
    };
  };
}
