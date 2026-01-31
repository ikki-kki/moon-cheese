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

export interface GradePointList {
  type: GradeType;
  minPoint: number;
}

export interface GradePointResponse {
  gradePointList: GradePointList[];
}

export type RecentProduct = {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
};

export interface RecentProductListResponse {
  recentProducts: RecentProduct[];
}
