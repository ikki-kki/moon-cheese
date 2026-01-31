import ErrorSection from '@/components/ErrorSection';
import type { RecentProduct } from '@/shared/api/schema';
import { productQueries } from '@/shared/qureies/product';
import { Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Flex, styled } from 'styled-system/jsx';

function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          <SuspenseQuery {...productQueries.recent.product.list()}>
            {({ data }) => (
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
                {data.recentProducts.map(product => (
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
        <Text variant="H1_Bold">{product.price}</Text>
      </Flex>
    </Flex>
  );
}
