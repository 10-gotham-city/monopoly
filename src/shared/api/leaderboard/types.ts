type TDataObject = Record<string, unknown>;

export type TUserLeaderboardRequest = {
  data: TDataObject;
  ratingFieldName: string;
  teamName: string;
};

export type TAllLeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TAllLeaderboardResponse = TDataObject[];
