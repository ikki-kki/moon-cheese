import type { CurrencyType } from '@/ui-lib';
import { create } from 'zustand';

interface CurrencyStore {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
}

export const useCurrencyStore = create<CurrencyStore>(set => ({
  currency: 'KRW',
  setCurrency: (currency: CurrencyType) => set({ currency }),
}));
