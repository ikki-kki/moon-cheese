import { queryOptions } from '@tanstack/react-query';
import { getExchangeRate } from '../api/fetcher';

export const exchangeRateQueries = {
  current: () =>
    queryOptions({
      queryKey: ['exchangeRate'],
      queryFn: () => getExchangeRate(),
    }),
};
