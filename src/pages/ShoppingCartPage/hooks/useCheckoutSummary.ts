import type { DeliveryType, GradeShippingList } from '@/shared/api/schema';
import { useCartStore } from '@/shared/store/cart';

export function useCheckoutSummary(shipping: GradeShippingList, deliveryType: DeliveryType) {
  const { cartItems } = useCartStore();

  const itemTotalPrice = cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  const isFreeShipping = itemTotalPrice >= shipping.freeShippingThreshold;

  const shippingFee = (() => {
    if (deliveryType === 'EXPRESS') {
      return 0;
    }
    if (isFreeShipping) {
      return 0;
    }
    return shipping.shippingFee;
  })();

  const finalTotalPrice = itemTotalPrice + shippingFee;

  return {
    deliveryType,
    itemTotalPrice,
    shippingFee,
    finalTotalPrice,
    isFreeShipping,
  };
}
