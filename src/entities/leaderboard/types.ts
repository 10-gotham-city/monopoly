import { MouseEvent } from 'react';

export type TDataRowLeaderboardTable = {
  displayName: string;
  winsCount: number;
  allPlays: number;
  winsPercent: number;
};

export type TDataRowsLeaderboardTable = {
  dataTable: TDataRowLeaderboardTable[];
};

export type THeadCell = {
  disablePadding: boolean;
  id: keyof TDataRowLeaderboardTable;
  label: string;
  numeric: boolean;
  align?: 'left' | 'right' | 'center';
};

export type TOrder = 'asc' | 'desc';

export type TEnhancedTableProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof TDataRowLeaderboardTable) => void;
  order: TOrder;
  orderBy: string;
};
