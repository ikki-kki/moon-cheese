import type { DeliveryType, PurchaseRequest } from '@/shared/api/schema';
import type { CartItemType } from '@/shared/store/cart';

export const makePaymentPayload = ({
  deliveryType,
  totalPrice,
  item,
}: {
  deliveryType: DeliveryType;
  totalPrice: number;
  item: CartItemType[];
}): PurchaseRequest => {
  return {
    deliveryType,
    totalPrice,
    items: item.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };
};
