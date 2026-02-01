import { BannerSection } from './components/BannerSection';
import { CurrentLevelSection } from './components/CurrentLevelSection';
import { ProductListSection } from './components/ProductListSection/ProductListSection';
import { RecentPurchaseSection } from './components/RecentPurchaseSection/RecentPurchaseSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <CurrentLevelSection />
      <RecentPurchaseSection />
      <ProductListSection />
    </>
  );
}

export default HomePage;
