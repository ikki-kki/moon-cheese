import { queryOptions } from '@tanstack/react-query';
import { getMe } from '../api/fetcher';

export const meQueries = {
  current: () =>
    queryOptions({
      queryKey: ['me'],
      queryFn: () => getMe(),
    }),
};
