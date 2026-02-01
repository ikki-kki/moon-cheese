import type { DeliveryType, GradeShippingList, GradeType } from '@/shared/api/schema';

export const getMyShippingData = (gradeShippingList: GradeShippingList[], myGrade: GradeType) => {
  return gradeShippingList.find(item => item.type === myGrade) || gradeShippingList[0];
};

export const calculateShippingFee = ({
  shipping,
  deliveryType,
  itemTotalPrice,
}: {
  shipping: GradeShippingList;
  deliveryType: DeliveryType;
  itemTotalPrice: number;
}) => {
  const isFreeShipping = itemTotalPrice >= shipping.freeShippingThreshold;

  if (deliveryType === 'EXPRESS') {
    return 0;
  }
  if (isFreeShipping) {
    return 0;
  }
  return shipping.shippingFee;
};
