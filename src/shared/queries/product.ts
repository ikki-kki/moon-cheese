import { queryOptions } from '@tanstack/react-query';
import { getProductDetail, getProductList, getProductRecommendIds, getRecentProductList } from '../api/fetcher';

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
    detail: (productId: number) =>
      queryOptions({
        queryKey: ['product', 'detail', productId],
        queryFn: () => getProductDetail(productId),
      }),
    recommendIds: (productId: number) =>
      queryOptions({
        queryKey: ['product', 'recommendIds', productId],
        queryFn: () => getProductRecommendIds(productId),
      }),
  },
};
