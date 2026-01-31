import ErrorSection from '@/components/ErrorSection';
import { useCartStore } from '@/shared/store/cart';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { styled } from 'styled-system/jsx';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import EmptyCartSection from './components/EmptyCartSection';
import ShoppingCartSection from './components/ShoppingCartSection';

function ShoppingCartPage() {
  const { cartItems } = useCartStore();
  const isCartEmpty = cartItems.length === 0;

  return (
    <ErrorBoundary fallback={<ErrorSection />}>
      <Suspense>
        <styled.section css={{ bgColor: 'background.01_white', minHeight: '100vh' }}>
          {isCartEmpty ? (
            <EmptyCartSection />
          ) : (
            <>
              <ShoppingCartSection />
              <DeliveryMethodSection />
              <CheckoutSection />
            </>
          )}
        </styled.section>
      </Suspense>
    </ErrorBoundary>
  );
}

export default ShoppingCartPage;
