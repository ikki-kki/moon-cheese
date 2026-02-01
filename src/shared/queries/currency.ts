import { queryOptions } from '@tanstack/react-query';
import { getExchangeRate } from '../api/fetcher';

export const currencyQueries = {
  rate: () =>
    queryOptions({
      queryKey: ['exchangeRate'],
      queryFn: () => getExchangeRate(),
    }),
};
