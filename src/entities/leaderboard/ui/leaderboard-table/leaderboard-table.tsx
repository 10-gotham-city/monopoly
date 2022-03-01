import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { ChangeEvent, MouseEvent, memo, useCallback, useMemo, useState } from 'react';

import { sortTableByColumn } from 'entities/leaderboard/lib';
import { TDataRowLeaderboardTable, TOrder } from 'entities/leaderboard/types';
import { LeaderboardTableHead } from 'entities/leaderboard/ui/leaderboard-table-head';

const INITIAL_PAGE_INDEX = 0;
const INITIAL_ROW_PER_PAGE = 5;
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 75, 100];

type Props = {
  dataTable: TDataRowLeaderboardTable[];
};

const CustomPaper = styled(Paper)`
  margin-top: ${({ theme }) => `${theme.spacing(3)}`};
  width: 100%;
  overflow: hidden;
`;

export const LeaderboardTable = memo(({ dataTable }: Props) => {
  const [order, setOrder] = useState<TOrder>('desc');
  const [orderBy, setOrderBy] = useState<keyof TDataRowLeaderboardTable>('winsCount');
  const [page, setPage] = useState(INITIAL_PAGE_INDEX);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROW_PER_PAGE);

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, property: keyof TDataRowLeaderboardTable) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy],
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(INITIAL_PAGE_INDEX);
  }, []);

  const emptyRows = useMemo(
    () =>
      page > INITIAL_PAGE_INDEX
        ? Math.max(INITIAL_PAGE_INDEX, (1 + page) * rowsPerPage - dataTable.length)
        : 0,
    [dataTable.length, page, rowsPerPage],
  );

  return (
    <CustomPaper>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
        align="center"
        py={2}
      >
        Таблица победителей
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <LeaderboardTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {sortTableByColumn(dataTable, order, orderBy)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={`${row.displayName}_${index}`}>
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
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={dataTable.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </CustomPaper>
  );
});
