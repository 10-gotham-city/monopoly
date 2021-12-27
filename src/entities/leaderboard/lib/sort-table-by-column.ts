import { TDataRowLeaderboardTable, TOrder } from 'entities/leaderboard/types';

export const sortTableByColumn = (
  array: TDataRowLeaderboardTable[],
  order: TOrder,
  orderBy: keyof TDataRowLeaderboardTable,
): TDataRowLeaderboardTable[] => {
  const arrThis = array;

  arrThis.sort((a, b) => {
    if (order === 'desc') {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
    return a[orderBy] > b[orderBy] ? 1 : -1;
  });

  return arrThis;
};
