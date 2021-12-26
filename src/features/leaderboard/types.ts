import { MouseEvent } from 'react';

export type Data = {
  display_name: string;
  wins_count: number;
  all_plays: number;
  wins_percent: number;
};

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  align?: 'left' | 'right' | 'center';
}

export type Order = 'asc' | 'desc';

export type EnhancedTableProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
};
