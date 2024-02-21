
export declare type SortDirection = 'asc' | 'desc' | '';

export interface Sort {
  active: string;
  direction: SortDirection;
}

export interface SortRef {
  field: string;
  fieldName: string;
  selected: boolean;
}

