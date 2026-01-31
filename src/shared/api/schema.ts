export interface ExchangeRateResponse {
  exchangeRate: {
    KRW: number;
    USD: number;
  };
}

export type GradeType = 'EXPLORER' | 'PILOT' | 'COMMANDER';

export interface MeResponse {
  point: number;
  grade: GradeType;
}

export interface GradePointResponse {
  gradePointList: Array<{
    type: GradeType;
    minPoint: number;
  }>;
}

export interface RecentProductListResponse {
  recentProducts: Array<{
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }>;
}
