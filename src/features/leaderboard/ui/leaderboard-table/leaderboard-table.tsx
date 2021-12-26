import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { Data, EnhancedTableProps, HeadCell, Order } from 'features/leaderboard/types';
import { visuallyHidden } from '@mui/utils';
import { getComparator, stableSort } from 'features/leaderboard/lib';

const createData = (display_name: string, wins_count: number, all_plays: number): Data => {
  const winsPercent = Math.round((wins_count / all_plays) * 100);

  return {
    display_name,
    wins_count,
    all_plays,
    wins_percent: winsPercent,
  };
};

// заглушка с данными
const rows = [
  createData('Max', 65, 300),
  createData('Nill', 54, 123),
  createData('Ben', 91, 234),
  createData('Super-man', 11, 15),
  createData('Brain', 27, 44),
  createData('Nick', 64, 98),
  createData('German', 324, 400),
  createData('Oleg', 99, 120),
  createData('Alina', 4, 6),
  createData('Nick', 4, 10),
  createData('Cracken', 0, 4),
  createData('Big King', 1, 34),
  createData('Ruskaya', 24, 43),
  createData('Durak', 15, 80),
  createData('Master', 234, 300),
];

const headCells: readonly HeadCell[] = [
  {
    id: 'display_name',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Никнейм',
  },
  {
    id: 'all_plays',
    numeric: true,
    disablePadding: false,
    align: 'right',
    label: 'Кол-во игр',
  },
  {
    id: 'wins_count',
    numeric: true,
    disablePadding: false,
    align: 'right',
    label: 'Кол-во побед',
  },
  {
    id: 'wins_percent',
    numeric: true,
    disablePadding: false,
    align: 'right',
    label: 'Процент побед',
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const LeaderboardTable = () => {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('wins_count');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.display_name}>
                  <TableCell align="left">{row.display_name}</TableCell>
                  <TableCell align="right">{row.all_plays}</TableCell>
                  <TableCell align="right">{row.wins_count}</TableCell>
                  <TableCell align="right">{row.wins_percent} %</TableCell>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
