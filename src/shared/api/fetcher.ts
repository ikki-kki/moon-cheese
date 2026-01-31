import { http } from '@/shared/utils/http';
import type {
  ExchangeRateResponse,
  GradePointResponse,
  MeResponse,
  ProductDetailResponse,
  ProductListResponse,
  ProductRecommendIdsResponse,
  RecentProductListResponse,
} from './schema';

export const getExchangeRate = () => {
  return http.get<ExchangeRateResponse>('/api/exchange-rate');
};

export const getMe = () => {
  return http.get<MeResponse>('/api/me');
};

export const getGradePoint = () => {
  return http.get<GradePointResponse>('/api/grade/point');
};

export const getRecentProductList = () => {
  return http.get<RecentProductListResponse>('/api/recent/product/list');
};

export const getProductList = () => {
  return http.get<ProductListResponse>('/api/product/list');
};

export const getProductDetail = (productId: number) => {
  return http.get<ProductDetailResponse>(`/api/product/${productId}`);
};

export const getProductRecommendIds = (productId: number) => {
  return http.get<ProductRecommendIdsResponse>(`/api/product/recommend/${productId}`);
};
