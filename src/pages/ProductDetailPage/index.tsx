import ErrorSection from '@/components/ErrorSection';
import { productQueries } from '@/shared/queries/product';
import { Spacing } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { useParams } from 'react-router';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          <SuspenseQuery {...productQueries.product.detail(Number(id))}>
            {({ data: product }) => (
              <>
                <ThumbnailSection images={product.images} />
                <ProductInfoSection product={product} />

                <Spacing size={2.5} />

                <ProductDetailSection description={product.description} />
              </>
            )}
          </SuspenseQuery>
        </Suspense>
      </ErrorBoundary>

      <Spacing size={2.5} />

      <RecommendationSection />
    </>
  );
}

export default ProductDetailPage;
