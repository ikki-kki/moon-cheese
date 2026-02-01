import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { useCart, type CartItemType } from '@/shared/store/cart';
import Joiner from '@/shared/ui/Joiner';
import { QuantitiyCounter } from '@/shared/ui/QuantitiyCounter';
import { Button, Spacing, Text, type TagType } from '@/ui-lib';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';

export function ShoppingCartSection() {
  const { cart } = useCart();

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button onClick={cart.clear} color={'neutral'} size="sm">
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
          components={cart.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        />
      </Stack>
    </styled.section>
  );
}

function CartItem({ item }: { item: CartItemType }) {
  const { cart } = useCart();
  const { format } = useDisplayPriceFormatter();

  return (
    <ShoppingCartItem.Root>
      <ShoppingCartItem.Image src={item.images[0]} alt={item.name} />
      <ShoppingCartItem.Content>
        <ShoppingCartItem.Info
          type={item.category.toLowerCase() as TagType}
          title={item.name}
          description={item.description}
          onDelete={() => cart.remove(item.id)}
        />
        <ShoppingCartItem.Footer>
          <ShoppingCartItem.Price>{format(item.price)}</ShoppingCartItem.Price>
          <QuantitiyCounter
            quantity={item.quantity}
            min={0}
            max={item.stock}
            increase={() => cart.increase(item.id)}
            decrease={() => cart.decrease(item.id)}
          />
        </ShoppingCartItem.Footer>
      </ShoppingCartItem.Content>
    </ShoppingCartItem.Root>
  );
}
