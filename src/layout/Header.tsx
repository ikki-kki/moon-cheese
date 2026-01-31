import { useCartStore } from '@/shared/store/cart';
import { useUserCurrencySettingStore } from '@/shared/store/currency';
import Badge from '@/ui-lib/components/badge';
import CurrencyToggle from '@/ui-lib/components/currency-toggle';
import { ArrowLeftIcon, ShoppingCartIcon } from '@/ui-lib/components/icons';
import Logo from '@/ui-lib/components/logo';
import { useLocation, useNavigate } from 'react-router';
import { Flex, styled } from 'styled-system/jsx';
import { flex } from 'styled-system/patterns';

export function Header() {
  const { userCurrencySetting, setUserCurrencySetting } = useUserCurrencySettingStore();
  const location = useLocation();

  const isRootRoute = location.pathname === '/';

  return (
    <styled.header
      className={flex({
        pos: 'sticky',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        h: 14,
        px: 5,
        zIndex: 'docked',
        bg: 'background.01_white',
      })}
    >
      {isRootRoute ? <Logo /> : <BackButton />}
      <Flex alignItems="center" gap={4}>
        <CurrencyToggle value={userCurrencySetting} onValueChange={setUserCurrencySetting} />
        <ShoppingCartButton />
      </Flex>
    </styled.header>
  );
}

function BackButton() {
  const navigate = useNavigate();

  return (
    <styled.button onClick={() => navigate(-1)} color="neutral.01_black">
      <ArrowLeftIcon />
    </styled.button>
  );
}

function ShoppingCartButton() {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();

  return (
    <Badge content={cartItems.length} size="sm" cursor="pointer" onClick={() => navigate('/shopping-cart')}>
      <ShoppingCartIcon size={22} />
    </Badge>
  );
}
