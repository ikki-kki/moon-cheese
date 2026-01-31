import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { useCartStore } from '@/shared/store/cart';
import Joiner from '@/shared/ui/Joiner';
import { Button, Counter, Spacing, Text, type TagType } from '@/ui-lib';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCartSection() {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const { format } = useDisplayPriceFormatter();

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button onClick={clearCart} color={'neutral'} size="sm">
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        <Joiner
          divider={<Divider color="border.01_gray" />}
          components={cartItems.map(item => (
            <ShoppingCartItem.Root>
              <ShoppingCartItem.Image src={item.images[0]} alt={item.name} />
              <ShoppingCartItem.Content>
                <ShoppingCartItem.Info
                  type={item.category.toLowerCase() as TagType}
                  title={item.name}
                  description={item.description}
                  onDelete={() => removeFromCart(item.id)}
                />
                <ShoppingCartItem.Footer>
                  <ShoppingCartItem.Price>{format(item.price)}</ShoppingCartItem.Price>
                  <QuantitiyCounter
                    quantity={item.quantity}
                    min={0}
                    max={item.stock}
                    increase={() => increaseQuantity(item.id)}
                    decrease={() => decreaseQuantity(item.id)}
                  />
                </ShoppingCartItem.Footer>
              </ShoppingCartItem.Content>
            </ShoppingCartItem.Root>
          ))}
        />
      </Stack>
    </styled.section>
  );
}

// 3번 이상 반복
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

export default ShoppingCartSection;
