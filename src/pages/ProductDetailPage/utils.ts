import type { Product } from '@/shared/api/schema';

export const getRecommendedProducts = (products: Product[], recommendIds: number[]): Product[] =>
  products.filter(product => recommendIds.includes(product.id));
