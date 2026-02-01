import { Spacing, Text } from '@/ui-lib';
import { styled } from 'styled-system/jsx';

interface Props {
  description: string;
}

export function ProductDetailSection({ description }: Props) {
  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">상세 정보</Text>

      <Spacing size={4} />

      <Text variant="B2_Regular" color="neutral.02_gray">
        {description}
      </Text>
    </styled.section>
  );
}
