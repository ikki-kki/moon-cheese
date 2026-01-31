import { queryOptions } from '@tanstack/react-query';
import { getProductList, getRecentProductList } from '../api/fetcher';

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
  product: {
    list: () =>
      queryOptions({
        queryKey: ['product', 'list'],
        queryFn: () => getProductList(),
      }),
  },
};
