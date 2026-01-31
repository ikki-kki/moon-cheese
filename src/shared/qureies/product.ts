import { queryOptions } from '@tanstack/react-query';
import { getRecentProductList } from '../api/fetcher';

export const productQueries = {
  recent: {
    product: {
      list: () =>
        queryOptions({
          queryKey: ['product', 'recent', 'list'],
          queryFn: () => getRecentProductList(),
        }),
    },
  },
};
