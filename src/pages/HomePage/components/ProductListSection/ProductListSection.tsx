import type { Product, ProductCategory } from '@/shared/api/schema';
import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { productQueries } from '@/shared/queries/product';
import { useCart } from '@/shared/store/cart';
import { ErrorSection } from '@/shared/ui/ErrorSection';
import { QuantitiyCounter } from '@/shared/ui/QuantitiyCounter';
import { SubGNB, Text } from '@/ui-lib';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../ProductItem';
import { filterProducts } from './utils';

export type CurrentTab = ProductCategory | 'ALL';

export function ProductListSection() {
  const [currentTab, setCurrentTab] = useState<CurrentTab>('ALL');

  return (
    <styled.section bg="background.01_white">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<ErrorSection onRetry={reset} />}>
            <Suspense>
              <SuspenseQuery
                {...productQueries.product.list()}
                select={data => filterProducts(data.products, currentTab)}
              >
                {({ data: products }) => (
                  <>
                    <Box css={{ px: 5, pt: 5, pb: 4 }}>
                      <Text variant="H1_Bold">판매중인 상품</Text>
                    </Box>
                    <SubGNB.Root
                      value={currentTab}
                      onValueChange={details => setCurrentTab(details.value as CurrentTab)}
                    >
                      <SubGNB.List>
                        <SubGNB.Trigger value="ALL">전체</SubGNB.Trigger>
                        <SubGNB.Trigger value="CHEESE">치즈</SubGNB.Trigger>
                        <SubGNB.Trigger value="CRACKER">크래커</SubGNB.Trigger>
                        <SubGNB.Trigger value="TEA">티</SubGNB.Trigger>
                      </SubGNB.List>
                    </SubGNB.Root>
                    <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
                      {products.map(product => (
                        <ProductListItem key={product.id} product={product} />
                      ))}
                    </Grid>
                  </>
                )}
              </SuspenseQuery>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </styled.section>
  );
}

function ProductListItem({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { format } = useDisplayPriceFormatter();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ProductItem.Root onClick={() => handleClickProduct(product.id)}>
      <ProductItem.Image src={product.images[0]} alt={product.name} />
      <ProductItem.Info title={product.name} description={product.description} />
      <ProductItem.Meta>
        <ProductItem.MetaLeft>
          <ProductItem.Rating rating={product.rating} />
          <ProductItem.Price>{format(product.price)}</ProductItem.Price>
        </ProductItem.MetaLeft>
        {(() => {
          switch (product.category) {
            case 'CRACKER':
              return product.isGlutenFree ? <ProductItem.FreeTag type="gluten" /> : null;
            case 'TEA':
              return product.isCaffeineFree ? <ProductItem.FreeTag type="caffeine" /> : null;
            default:
              return null;
          }
        })()}
      </ProductItem.Meta>
      <CartActionArea product={product} />
    </ProductItem.Root>
  );
}

function CartActionArea({ product }: { product: Product }) {
  const { cart } = useCart();

  const cartItem = cart.items.find(p => p.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleIncrease = () => (quantity === 0 ? cart.add(product, 1) : cart.increase(product.id));
  const handleDecrease = () => cart.decrease(product.id);

  return (
    <QuantitiyCounter
      min={0}
      max={product.stock}
      quantity={quantity}
      increase={handleIncrease}
      decrease={handleDecrease}
    />
  );
}
