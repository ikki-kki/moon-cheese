import { http } from '@/shared/utils/http';
import type {
  ExchangeRateResponse,
  GradePointResponse,
  MeResponse,
  ProductListResponse,
  RecentProductListResponse,
} from './schema';

export const getExchangeRate = async () => {
  return http.get<ExchangeRateResponse>('/api/exchange-rate');
};

export const getMe = async () => {
  return http.get<MeResponse>('/api/me');
};

export const getGradePoint = async () => {
  return http.get<GradePointResponse>('/api/grade/point');
};

export const getRecentProductList = async () => {
  return http.get<RecentProductListResponse>('/api/recent/product/list');
};

export const getProductList = async () => {
  return http.get<ProductListResponse>('/api/product/list');
};
