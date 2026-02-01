import type { DeliveryType } from '@/shared/api/schema';
import { gradeQueries } from '@/shared/queries/grade';
import { meQueries } from '@/shared/queries/me';
import { useCart } from '@/shared/store/cart';
import { ErrorSection } from '@/shared/ui/ErrorSection';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries } from '@suspensive/react-query';
import { useState } from 'react';
import { styled } from 'styled-system/jsx';
import { CheckoutSection } from './components/CheckoutSection';
import { DeliveryMethodSection } from './components/DeliveryMethodSection';
import { EmptyCartSection } from './components/EmptyCartSection';
import { ShoppingCartSection } from './components/ShoppingCartSection';
import { calculateShippingFee, getMyShippingData } from './utils';

const NAVBAR_HEIGHT = 56;

function ShoppingCartPage() {
  const { cart } = useCart();
  const isCartEmpty = cart.items.length === 0;

  return (
    <styled.section css={{ bgColor: 'background.01_white', height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          {isCartEmpty ? (
            <EmptyCartSection />
          ) : (
            <>
              <ShoppingCartSection />
              <PaymentSection />
            </>
          )}
        </Suspense>
      </ErrorBoundary>
    </styled.section>
  );
}

function PaymentSection() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryType>('EXPRESS');
  const { cart } = useCart();

  return (
    <SuspenseQueries queries={[gradeQueries.shipping(), meQueries.me()]}>
      {([{ data: shipping }, { data: me }]) => {
        const myShipping = getMyShippingData(shipping.gradeShippingList, me.grade);

        const shippingFee = calculateShippingFee({
          shipping: myShipping,
          deliveryType: selectedDeliveryMethod,
          itemTotalPrice: cart.totalPrice,
        });

        return (
          <>
            <DeliveryMethodSection
              shippingFee={shippingFee}
              value={selectedDeliveryMethod}
              onClick={setSelectedDeliveryMethod}
            />

            <CheckoutSection shippingFee={shippingFee} deliveryMethod={selectedDeliveryMethod} />
          </>
        );
      }}
    </SuspenseQueries>
  );
}

export default ShoppingCartPage;
