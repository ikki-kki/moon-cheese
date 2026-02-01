import { productQueries } from '@/shared/queries/product';
import { ErrorSection } from '@/shared/ui/ErrorSection';
import { Spacing } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries, SuspenseQuery } from '@suspensive/react-query';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ProductDetailSection } from './components/ProductDetailSection';
import { ProductInfoSection } from './components/ProductInfoSection';
import { RecommendationSection } from './components/RecommendationSection';
import { ThumbnailSection } from './components/ThumbnailSection';
import { getRecommendedProducts } from './utils';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<ErrorSection onRetry={reset} />}>
            <Suspense>
              <SuspenseQuery {...productQueries.product.detail(Number(id))}>
                {({ data: product }) => (
                  <>
                    <ThumbnailSection images={product.images} />
                    <ProductInfoSection product={product} />

                    <Spacing size={2.5} />

                    <ProductDetailSection description={product.detailDescription} />
                  </>
                )}
              </SuspenseQuery>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <Spacing size={2.5} />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<ErrorSection onRetry={reset} />}>
            <Suspense>
              <SuspenseQueries
                queries={[productQueries.product.list(), productQueries.product.recommendIds(Number(id))]}
              >
                {([{ data: productList }, { data: recommendIds }]) => {
                  const recommendedProducts = getRecommendedProducts(
                    productList.products,
                    recommendIds.recommendProductIds
                  );
                  return <RecommendationSection products={recommendedProducts} />;
                }}
              </SuspenseQueries>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}

export default ProductDetailPage;
