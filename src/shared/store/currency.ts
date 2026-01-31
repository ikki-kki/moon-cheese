import type { CurrencyType } from '@/ui-lib';
import { create } from 'zustand';

interface UserCurrencySettingStore {
  userCurrencySetting: CurrencyType;
  setUserCurrencySetting: (currency: CurrencyType) => void;
}

export const useUserCurrencySettingStore = create<UserCurrencySettingStore>(set => ({
  userCurrencySetting: 'KRW',
  setUserCurrencySetting: (currency: CurrencyType) => set({ userCurrencySetting: currency }),
}));
