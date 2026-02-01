import type { ProductDetailResponse } from '@/shared/api/schema';
import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { useCart } from '@/shared/store/cart';
import { QuantitiyCounter } from '@/shared/ui/QuantitiyCounter';
import { Button, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { useState } from 'react';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

interface Props {
  product: ProductDetailResponse;
}

export function ProductInfoSection({ product }: Props) {
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

function CartActionArea({ product }: Props) {
  const { cart } = useCart();

  const cartItem = cart.items.find(p => p.id === product.id);
  const isInCart = Boolean(cartItem);

  const [localQuantity, setLocalQuantity] = useState(cartItem?.quantity ?? 0);

  const handleIncrease = () => setLocalQuantity(prev => prev + 1);
  const handleDecrease = () => setLocalQuantity(prev => Math.max(0, prev - 1));

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
          increase={handleIncrease}
          decrease={handleDecrease}
        />
      </Flex>
      <Spacing size={5} />

      <Button onClick={handleButtonClick} fullWidth color="primary" size="lg">
        {isInCart ? '장바구니에서 제거' : '장바구니 담기'}
      </Button>
    </>
  );
}
