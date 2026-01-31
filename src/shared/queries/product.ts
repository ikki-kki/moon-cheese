import { mutationOptions, queryOptions } from '@tanstack/react-query';
import {
  getProductDetail,
  getProductList,
  getProductRecommendIds,
  getRecentProductList,
  postProductPurchase,
} from '../api/fetcher';
import type { PurchaseRequest } from '../api/schema';

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

export const productMutations = {
  purchase: (body: PurchaseRequest) => {
    mutationOptions({
      mutationKey: ['product', 'purchase', body],
      mutationFn: () => postProductPurchase(body),
    });
  },
};
