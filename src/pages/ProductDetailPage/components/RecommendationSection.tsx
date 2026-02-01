import type { Product } from '@/shared/api/schema';
import { useDisplayPriceFormatter } from '@/shared/hooks/currency';
import { Spacing, Text } from '@/ui-lib';
import { useNavigate } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import RecommendationProductItem from './RecommendationProductItem';

interface Props {
  products: Product[];
}

export function RecommendationSection({ products }: Props) {
  const navigate = useNavigate();
  const { format } = useDisplayPriceFormatter();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">추천 제품</Text>

      <Spacing size={4} />

      <HStack gap={1.5} overflowX="auto">
        {products.map(product => (
          <RecommendationProductItem.Root key={product.id} onClick={() => handleClickProduct(product.id)}>
            <RecommendationProductItem.Image src={product.images[0]} alt={product.name} />
            <RecommendationProductItem.Info name={product.name} rating={product.rating} />
            <RecommendationProductItem.Price>{format(product.price)}</RecommendationProductItem.Price>
          </RecommendationProductItem.Root>
        ))}
      </HStack>
    </styled.section>
  );
}
