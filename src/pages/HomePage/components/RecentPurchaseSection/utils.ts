import type { RecentProduct } from '@/shared/api/schema';
import { groupBy, sumBy } from 'es-toolkit';

const mergeProductGroup = (items: RecentProduct[]): RecentProduct => ({
  ...items[0],
  price: sumBy(items, item => item.price),
});

export const mergedRecentProducts = (products: RecentProduct[]): RecentProduct[] => {
  const groupedById = groupBy(products, product => product.id);

  return Object.values(groupedById).map(mergeProductGroup);
};
