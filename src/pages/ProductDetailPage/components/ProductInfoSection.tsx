import type { ProductDetailResponse } from '@/shared/api/schema';
import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { useCart } from '@/shared/store/cart';
import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { useState } from 'react';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

type ProductInfoSectionProps = {
  product: ProductDetailResponse;
};

function ProductInfoSection({ product }: ProductInfoSectionProps) {
  const { format } = useDisplayPriceFormatter();

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      <Box>
        <Stack gap={2}>
          <Tag type={product.category.toLowerCase() as TagType} />
          <Text variant="B1_Bold">{product.name}</Text>
          <RatingGroup value={product.rating} readOnly label={`${product.rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">{format(product.price)}</Text>
      </Box>

      <Spacing size={5} />
      <CartActionArea product={product} />
    </styled.section>
  );
}

const CartActionArea = ({ product }: { product: ProductDetailResponse }) => {
  const { cart } = useCart();

  const cartItem = cart.items.find(p => p.id === product.id);
  const isInCart = Boolean(cartItem);

  const [localQuantity, setLocalQuantity] = useState(cartItem?.quantity ?? 0);

  const handleButtonClick = () => {
    if (isInCart) {
      cart.remove(product.id);
      setLocalQuantity(0);
    } else {
      cart.add(product, localQuantity);
    }
  };

  return (
    <>
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {product.stock}EA
          </Text>
        </Flex>
        <QuantitiyCounter
          quantity={localQuantity}
          min={0}
          max={product.stock}
          disabled={isInCart}
          increase={() => setLocalQuantity(prev => prev + 1)}
          decrease={() => setLocalQuantity(prev => Math.max(0, prev - 1))}
        />
      </Flex>
      <Spacing size={5} />

      <Button onClick={handleButtonClick} fullWidth color="primary" size="lg">
        {isInCart ? '장바구니에서 제거' : '장바구니 담기'}
      </Button>
    </>
  );
};

const QuantitiyCounter = ({
  min,
  max,
  disabled,
  quantity,
  increase,
  decrease,
}: {
  min: number;
  max: number;
  disabled?: boolean;
  quantity: number;
  increase: () => void;
  decrease: () => void;
}) => {
  const isMinusDisabled = disabled || quantity <= min;
  const isPlusDisabled = disabled || quantity >= max;

  return (
    <Counter.Root>
      <Counter.Minus onClick={decrease} disabled={isMinusDisabled} />
      <Counter.Display value={quantity} />
      <Counter.Plus onClick={increase} disabled={isPlusDisabled} />
    </Counter.Root>
  );
};

export default ProductInfoSection;
