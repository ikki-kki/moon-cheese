import type { Product } from '@/shared/api/schema';
import type { CurrentTab } from './ProductListSection';

export const filterProducts = (products: Product[], category: CurrentTab) =>
  products.filter(product => category === 'ALL' || product.category === category);
