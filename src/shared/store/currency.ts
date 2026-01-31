import type { CurrencyType } from '@/ui-lib';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserCurrencySettingStore {
  userCurrencySetting: CurrencyType;
  setUserCurrencySetting: (currency: CurrencyType) => void;
}

export const useUserCurrencySettingStore = create<UserCurrencySettingStore>()(
  persist(
    set => ({
      userCurrencySetting: 'KRW',
      setUserCurrencySetting: currency => set({ userCurrencySetting: currency }),
    }),
    {
      name: 'user-currency-setting-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
