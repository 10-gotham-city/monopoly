import { BASE_RESOURCES_URL } from '../config';

type TAddBaseUrlPAyload<T> = {
  payload: T;
  resourceKeyName: keyof T;
};

export const addBaseUrl = <T extends Record<string, unknown>>({
  payload,
  resourceKeyName,
}: TAddBaseUrlPAyload<T>): T => {
  if (!(resourceKeyName in payload)) {
    throw new Error('Поля с таким названием нет в объекте');
  }

  const resourceValues = payload[resourceKeyName];

  if (typeof resourceValues !== 'string') {
    return payload;
  }

  return {
    ...payload,
    [resourceKeyName]: `${BASE_RESOURCES_URL}${resourceValues}`,
  };
};
