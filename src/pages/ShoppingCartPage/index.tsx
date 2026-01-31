import ErrorSection from '@/components/ErrorSection';
import type { GradeShippingList, GradeType } from '@/shared/api/schema';
import { gradeQueries } from '@/shared/queries/grade';
import { meQueries } from '@/shared/queries/me';
import { useCartStore } from '@/shared/store/cart';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries } from '@suspensive/react-query';
import { styled } from 'styled-system/jsx';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import EmptyCartSection from './components/EmptyCartSection';
import ShoppingCartSection from './components/ShoppingCartSection';

function ShoppingCartPage() {
  const { cartItems } = useCartStore();
  const isCartEmpty = cartItems.length === 0;

  return (
    <styled.section css={{ bgColor: 'background.01_white', minHeight: '100vh' }}>
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          {isCartEmpty ? (
            <EmptyCartSection />
          ) : (
            <>
              <ShoppingCartSection />
              <SuspenseQueries queries={[gradeQueries.shipping(), meQueries.me()]}>
                {([{ data: shipping }, { data: me }]) => {
                  const myShipping = getMyShippingData(shipping.gradeShippingList, me.grade);

                  return <DeliveryMethodSection shipping={myShipping} />;
                }}
              </SuspenseQueries>
              <CheckoutSection />
            </>
          )}
        </Suspense>
      </ErrorBoundary>
    </styled.section>
  );
}

export default ShoppingCartPage;

const getMyShippingData = (gradeShippingList: GradeShippingList[], myGrade: GradeType) => {
  return gradeShippingList.find(item => item.type === myGrade) || gradeShippingList[0];
};
