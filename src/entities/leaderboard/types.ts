export type TDataRowLeaderboardTable = {
  displayName: string;
  winsCount: number;
  allPlays: number;
  winsPercent: number;
};

export type THeadCell = {
  disablePadding: boolean;
  id: keyof TDataRowLeaderboardTable;
  label: string;
  numeric: boolean;
  align?: 'left' | 'right' | 'center';
};

export type TOrder = 'asc' | 'desc';
