import { LeaderboardTable } from 'entities/leaderboard';
import { TDataRowLeaderboardTable } from 'entities/leaderboard/types';

import { BaseLayout } from 'shared/ui/layouts';

const createDataTable = (
  displayName: string,
  winsCount: number,
  allPlays: number,
): TDataRowLeaderboardTable => {
  const winsPercent = Math.round((winsCount / allPlays) * 100);

  return {
    displayName,
    winsCount,
    allPlays,
    winsPercent,
  };
};

// заглушка с данными
const rows = [
  createDataTable('Max', 65, 300),
  createDataTable('Nill', 54, 123),
  createDataTable('Ben', 91, 234),
  createDataTable('Super-man', 11, 15),
  createDataTable('Brain', 27, 44),
  createDataTable('Nick', 64, 98),
  createDataTable('German', 324, 400),
  createDataTable('Oleg', 99, 120),
  createDataTable('Alina', 4, 6),
  createDataTable('Alan', 4, 10),
  createDataTable('Cracken', 0, 4),
  createDataTable('Big King', 1, 34),
  createDataTable('Ruskaya', 24, 43),
  createDataTable('Durak', 15, 80),
  createDataTable('Master', 234, 300),
];

export const LeaderboardPage = () => (
  <BaseLayout>
    <LeaderboardTable dataTable={rows} />
  </BaseLayout>
);
