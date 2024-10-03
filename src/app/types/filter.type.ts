import { FormattedFilterType } from '../enums/formatted-filter-type.enum';

export type Filter = {
  field: string;
  operation: keyof typeof FormattedFilterType;
  value: string;
};
