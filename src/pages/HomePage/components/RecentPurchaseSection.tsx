import ErrorSection from '@/components/ErrorSection';
import type { RecentProduct } from '@/shared/api/schema';
import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { productQueries } from '@/shared/queries/product';
import { Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { groupBy, sumBy } from 'es-toolkit';
import { Flex, styled } from 'styled-system/jsx';

function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          <SuspenseQuery
            {...productQueries.recent.product.list()}
            select={data => mergedRecentProducts(data.recentProducts)}
          >
            {({ data: products }) => (
              <Flex
                css={{
                  bg: 'background.01_white',
                  px: 5,
                  py: 4,
                  gap: 4,
                  rounded: '2xl',
                }}
                direction={'column'}
              >
                {products.map(product => (
                  <RecentPurchaseItem key={product.id} product={product} />
                ))}
              </Flex>
            )}
          </SuspenseQuery>
        </Suspense>
      </ErrorBoundary>
    </styled.section>
  );
}

export default RecentPurchaseSection;

function RecentPurchaseItem({ product }: { product: RecentProduct }) {
  const { format } = useDisplayPriceFormatter();

  return (
    <Flex
      css={{
        gap: 4,
      }}
    >
      <styled.img
        src={product.thumbnail}
        alt="item"
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />
      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{product.name}</Text>
        <Text variant="H1_Bold">{format(product.price)}</Text>
      </Flex>
    </Flex>
  );
}

const mergeProductGroup = (items: RecentProduct[]): RecentProduct => ({
  ...items[0],
  price: sumBy(items, item => item.price),
});

export const mergedRecentProducts = (products: RecentProduct[]): RecentProduct[] => {
  const groupedById = groupBy(products, product => product.id);

  return Object.values(groupedById).map(mergeProductGroup);
};
