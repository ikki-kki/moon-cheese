import ErrorSection from '@/components/ErrorSection';
import type { Product } from '@/shared/api/schema';
import { productQueries } from '@/shared/queries/product';
import { Spacing } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries, SuspenseQuery } from '@suspensive/react-query';
import { filter } from 'es-toolkit/compat';
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

                <ProductDetailSection description={product.detailDescription} />
              </>
            )}
          </SuspenseQuery>
        </Suspense>
      </ErrorBoundary>

      <Spacing size={2.5} />

      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          <SuspenseQueries queries={[productQueries.product.list(), productQueries.product.recommendIds(Number(id))]}>
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
    </>
  );
}

export default ProductDetailPage;

const getRecommendedProducts = (products: Product[], recommendIds: number[]) =>
  filter(products, product => recommendIds.includes(product.id));
