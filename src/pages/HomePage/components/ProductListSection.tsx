import ErrorSection from '@/components/ErrorSection';
import type { Product, ProductCategory } from '@/shared/api/schema';
import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { productQueries } from '@/shared/queries/product';
import { useCartStore } from '@/shared/store/cart';
import { Counter, SubGNB, Text } from '@/ui-lib';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';

type CurrentTab = ProductCategory | 'ALL';

function ProductListSection() {
  const [currentTab, setCurrentTab] = useState<CurrentTab>('ALL');

  return (
    <styled.section bg="background.01_white">
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          <SuspenseQuery {...productQueries.product.list()} select={data => filterProducts(data.products, currentTab)}>
            {({ data: products }) => (
              <>
                <Box css={{ px: 5, pt: 5, pb: 4 }}>
                  <Text variant="H1_Bold">판매중인 상품</Text>
                </Box>
                <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value as CurrentTab)}>
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
    </styled.section>
  );
}

const ProductListItem = ({ product }: { product: Product }) => {
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
          <ProductItem.Rating rating={4} />
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
      <CounterProduct product={product} />
    </ProductItem.Root>
  );
};

const CounterProduct = ({ product }: { product: Product }) => {
  const { products, addToCart, removeFromCart } = useCartStore();

  const removeDisabled = !products.find(p => p.id === product.id);
  const addDisabled = product.stock <= products.filter(p => p.id === product.id).length;

  const amount = products.filter(p => p.id === product.id).length;

  return (
    <Counter.Root>
      <Counter.Minus onClick={() => removeFromCart(product.id)} disabled={removeDisabled} />
      <Counter.Display value={amount} />
      <Counter.Plus onClick={() => addToCart(product)} disabled={addDisabled} />
    </Counter.Root>
  );
};

export default ProductListSection;

const filterProducts = (products: Product[], category: CurrentTab) =>
  products.filter(product => category === 'ALL' || product.category === category);
