import type { RecentProduct } from '@/shared/api/schema';
import { productQueries } from '@/shared/queries/product';
import { ErrorSection } from '@/shared/ui/ErrorSection';
import { FormattedPrice } from '@/shared/ui/FormattedPrice';
import { Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Flex, styled } from 'styled-system/jsx';
import { mergedRecentProducts } from './utils';

export function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<ErrorSection onRetry={reset} />}>
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
        )}
      </QueryErrorResetBoundary>
    </styled.section>
  );
}

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
        <Text variant="H1_Bold">
          <FormattedPrice price={product.price} />
        </Text>
      </Flex>
    </Flex>
  );
}
