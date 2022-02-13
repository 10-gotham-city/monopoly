import { parse } from 'qs';

export const queryParser = (query: string) =>
  parse(query, {
    decoder: (str) => decodeURIComponent(str),
  });
