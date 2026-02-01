import { useSuspenseQuery } from '@tanstack/react-query';
import { currencyQueries } from '../queries/currency';
import { useUserCurrencySetting } from '../store/currency';

interface FormattedPriceProps {
  price: number;
}

export const FormattedPrice = ({ price }: FormattedPriceProps) => {
  const { currency } = useUserCurrencySetting();
  const { data: currencyRates } = useSuspenseQuery({
    ...currencyQueries.rate(),
    select: data => data.exchangeRate,
  });

  const rate = currencyRates[currency.value];
  const convertedPrice = price * rate;

  return (
    <>
      {(() => {
        switch (currency.value) {
          case 'KRW':
            return `${Math.floor(convertedPrice).toLocaleString('ko-KR')}원`;

          case 'USD':
            return `$${convertedPrice.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;

          default:
            return convertedPrice.toLocaleString();
        }
      })()}
    </>
  );
};
