import { TDataRowLeaderboardTable, THeadCell, TOrder } from 'entities/leaderboard/types';
import { MouseEvent } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

const headCells: readonly THeadCell[] = [
  {
    id: 'displayName',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Никнейм',
  },
  {
    id: 'allPlays',
    numeric: true,
    disablePadding: false,
    align: 'right',
    label: 'Кол-во игр',
  },
  {
    id: 'winsCount',
    numeric: true,
    disablePadding: false,
    align: 'right',
    label: 'Кол-во побед',
  },
  {
    id: 'winsPercent',
    numeric: true,
    disablePadding: false,
    align: 'right',
    label: 'Процент побед',
  },
];

type TProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof TDataRowLeaderboardTable) => void;
  order: TOrder;
  orderBy: string;
};

export const LeaderboardTableHead = ({ order, orderBy, onRequestSort }: TProps) => {
  const createSortHandler =
    (property: keyof TDataRowLeaderboardTable) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};