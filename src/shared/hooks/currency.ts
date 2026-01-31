import { useSuspenseQuery } from '@tanstack/react-query';
import { currencyQueries } from '../queries/currency';
import { useUserCurrencySettingStore } from '../store/currency';

export const useDisplayPriceFormatter = () => {
  const { userCurrencySetting } = useUserCurrencySettingStore();
  const { data: currencyRates } = useSuspenseQuery({
    ...currencyQueries.rate(),
    select: data => data.exchangeRate,
  });

  const format = (price: number) => {
    const rate = currencyRates[userCurrencySetting];
    const convertedPrice = price * rate;

    switch (userCurrencySetting) {
      case 'KRW':
        return `${Math.floor(convertedPrice).toLocaleString('ko-KR')}원`;

      case 'USD':
        return `$${convertedPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

      default:
        return `${convertedPrice.toLocaleString()}`;
    }
  };

  return { format };
};
