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

type GradeShippingType = 'EXPLORER' | 'PILOT' | 'COMMANDER';

export interface GradeShippingList {
  type: GradeShippingType;
  shippingFee: number;
  freeShippingThreshold: number;
}

export interface GradeShippingResponse {
  gradeShippingList: GradeShippingList[];
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

export type ProductCategory = 'CHEESE' | 'CRACKER' | 'TEA';

interface BaseProduct {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
}

interface CheeseProduct extends BaseProduct {
  category: 'CHEESE';
}

interface CrackerProduct extends BaseProduct {
  category: 'CRACKER';
  isGlutenFree: boolean;
}

interface TeaProduct extends BaseProduct {
  category: 'TEA';
  isCaffeineFree: boolean;
}

export type Product = CheeseProduct | CrackerProduct | TeaProduct;

export interface ProductListResponse {
  products: Product[];
}

export type ProductDetailResponse = Product;

export interface ProductRecommendIdsResponse {
  recommendProductIds: number[];
}

export type PurchaseRequest = {
  deliveryType: 'EXPRESS' | 'PREMIUM';
  totalPrice: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
};
