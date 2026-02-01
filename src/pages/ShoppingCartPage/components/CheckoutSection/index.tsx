import type { DeliveryType } from '@/shared/api/schema';
import { productMutations } from '@/shared/queries/product';
import { useCart } from '@/shared/store/cart';
import { FormattedPrice } from '@/shared/ui/FormattedPrice';
import { Button, Spacing, Text } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Box, Divider, Flex, HStack, Stack, styled } from 'styled-system/jsx';
import { createPaymentPayload } from './utils';

interface Props {
  shippingFee: number;
  deliveryMethod: DeliveryType;
}

export function CheckoutSection({ shippingFee, deliveryMethod }: Props) {
  const navigate = useNavigate();
  const { cart } = useCart();

  const { mutate, isPending } = useMutation({
    ...productMutations.purchase(),
    onSuccess: () => {
      toast.success('결제가 완료되었습니다.');
      cart.clear();
      navigate('/');
    },
    onError: () => {
      toast.error('결제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const totalPrice = cart.totalPrice + shippingFee;

  const payload = createPaymentPayload({
    deliveryType: deliveryMethod,
    totalPrice,
    item: cart.items,
  });

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">결제금액</Text>

      <Spacing size={4} />

      <Stack
        gap={6}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        <Stack gap={5}>
          <Box gap={3}>
            <Flex justify="space-between">
              <Text variant="B2_Regular">주문금액({cart.totalQuantity}개)</Text>
              <Text variant="B2_Bold" color="state.green">
                무료배송
              </Text>
            </Flex>
            <Spacing size={3} />
            <Flex justify="space-between">
              <Text variant="B2_Regular">배송비</Text>
              <Text variant="B2_Bold">무료</Text>
            </Flex>
          </Box>

          <Divider color="border.01_gray" />

          <HStack justify="space-between">
            <Text variant="H2_Bold">총 금액</Text>
            <Text variant="H2_Bold">
              <FormattedPrice price={totalPrice} />
            </Text>
          </HStack>
        </Stack>

        <Button fullWidth size="lg" loading={isPending} onClick={() => mutate(payload)}>
          {isPending ? '결제 중...' : '결제 진행'}
        </Button>

        <Text variant="C2_Regular" color="neutral.03_gray">
          {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
        </Text>
      </Stack>
    </styled.section>
  );
}
