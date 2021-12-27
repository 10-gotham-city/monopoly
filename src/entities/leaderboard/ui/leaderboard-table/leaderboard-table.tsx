import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import {
  TDataRowLeaderboardTable,
  TDataRowsLeaderboardTable,
  TEnhancedTableProps,
  THeadCell,
  TOrder,
} from 'entities/leaderboard/types';
import { sortTableByColumn } from 'entities/leaderboard/lib';

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

const EnhancedTableHead = ({ order, orderBy, onRequestSort }: TEnhancedTableProps) => {
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

const INITIAL_PAGE_INDEX = 0;

export const LeaderboardTable = ({ dataTable }: TDataRowsLeaderboardTable) => {
  const [order, setOrder] = useState<TOrder>('desc');
  const [orderBy, setOrderBy] = useState<keyof TDataRowLeaderboardTable>('winsCount');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof TDataRowLeaderboardTable,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(INITIAL_PAGE_INDEX);
  };

  const emptyRows =
    page > INITIAL_PAGE_INDEX
      ? Math.max(INITIAL_PAGE_INDEX, (1 + page) * rowsPerPage - dataTable.length)
      : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
        align="center"
        pt={2}
        pb={2}
      >
        Таблица победителей
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {sortTableByColumn(dataTable, order, orderBy)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.displayName}>
                  <TableCell align="left">{row.displayName}</TableCell>
                  <TableCell align="right">{row.allPlays}</TableCell>
                  <TableCell align="right">{row.winsCount}</TableCell>
                  <TableCell align="right">{`${row.winsPercent} %`}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Показывать по:"
        rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
        component="div"
        count={dataTable.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
