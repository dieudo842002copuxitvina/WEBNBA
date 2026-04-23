import { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, Navigation, ArrowRight, Sprout, Shield, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PersonalizedDashboardHero from '@/components/PersonalizedDashboardHero';
import NearbyDealers from '@/components/NearbyDealers';
import RoiCalculatorBlock from '@/components/RoiCalculatorBlock';
import FieldLog from '@/components/FieldLog';
import EmergencyBanner from '@/components/EmergencyBanner';
import AIRuleBanner from '@/components/AIRuleBanner';
import SeoMeta from '@/components/SeoMeta';
import ProductEcosystemBlock from '@/components/ProductEcosystemBlock';
import AgriNewsBlock from '@/components/AgriNewsBlock';
import FieldShortsBlock from '@/components/FieldShortsBlock';
import { useHomepageConfig } from '@/contexts/HomepageConfigContext';
import { trackEvent } from '@/lib/tracking';
import ogImage from '@/assets/og-nhabe-agri.jpg';

const DealerNetworkMap = lazy(() => import('@/components/DealerNetworkMap'));

/**
 * CustomerHomePage — Spec V2 "Agri-Dashboard & Conversion Engine"
 *
 * Layout (top → bottom):
 *  1. EmergencyBanner (admin-controlled)
 *  2. Sticky TopNav + TickerTape (already in PublicLayout)
 *  3. CommandCenterHero — weather + AI advice + smart search + 3-card AgriCalc
 *  4. AIRuleBanner — context-aware
 *  5. CropSolutionsTabs — Sầu riêng / Cà phê / Cây ăn trái
 *  6. Map + NearbyDealers split 50/50 — geo-matching engine
 *  7. RoiCalculatorBlock — investment analysis chart
 *  8. FieldLog — live social proof
 *  9. Trust features
 *
 * Conversion focus: Zalo (accent) + Phone (primary). High-contrast for outdoor visibility.
 */

const features = [
  { icon: Sprout, title: 'Phần cứng chính hãng', desc: 'Máy bơm, ống tưới, drone, cảm biến' },
  { icon: Shield, title: 'Đại lý ủy quyền', desc: '500+ điểm bán toàn quốc' },
  { icon: Navigation, title: 'Geo-Matching', desc: 'Tìm đại lý gần nhất 15-50km' },
  { icon: Zap, title: 'Zero Friction', desc: 'Gọi/Zalo ngay, không đăng ký' },
];

// Framer Motion section wrapper — fade + lift on enter viewport
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function MotionSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function CustomerHomePage() {
  const { config } = useHomepageConfig();

  useEffect(() => {
    trackEvent('page_view', { source: 'homepage_v2' });
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 pb-32 md:pb-8">
      {/* Topographic Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-2h2v2h-2zm0-31V1h2v2h-2zm0 29v-2h2v2h-2zm0-27V3h2v2h-2zm0 25v-2h2v2h-2zm0-23V5h2v2h-2zm0 21v-2h2v2h-2zm0-19V7h2v2h-2zm0 17v-2h2v2h-2zm0-15V9h2v2h-2zm0 13v-2h2v2h-2zm0-11v-2h2v2h-2zm0 9v-2h2v2h-2zm0-7v-2h2v2h-2zm0 5v-2h2v2h-2zm0-3v-2h2v2h-2zm0 1v-2h2v2h-2z' fill='%232D5A27'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      <div className="relative z-10">
      <SeoMeta
        title={config.seo.title}
        description={config.seo.description}
        canonical="https://farm-supply-chain.lovable.app/"
        ogImage={ogImage}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Nhà Bè Agri',
          url: 'https://farm-supply-chain.lovable.app/',
          logo: 'https://farm-supply-chain.lovable.app/favicon.ico',
          description: config.seo.description,
        }}
      />

      {/* Emergency banner — admin-controlled, top priority */}
      <EmergencyBanner />

      {/* 1. HERO DASHBOARD — Personalized Agri-Dashboard */}
      <PersonalizedDashboardHero />

      {/* AI rule banner — appears only when active weather rule triggered */}
      <section className="container pt-4">
        <AIRuleBanner />
      </section>

      {/* 2b. PRODUCT ECOSYSTEM — filter + grid */}
      <MotionSection>
        <ProductEcosystemBlock />
      </MotionSection>

      {/* 2c. AGRI NEWS — tabbed knowledge hub */}
      <MotionSection>
        <AgriNewsBlock />
      </MotionSection>

      {/* 2d. FIELD SHORTS — horizontal 9:16 video strip */}
      <MotionSection>
        <FieldShortsBlock />
      </MotionSection>

      {/* 3. MAP + NEARBY DEALERS — 50/50 split, geo-matching */}
      <MotionSection className="container py-8 md:py-10">
        <header className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[11px] uppercase font-bold tracking-wider text-primary flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Mạng lưới đại lý ủy quyền
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold mt-1 leading-tight">
              Đại lý gần bạn — <span className="text-primary">Tư vấn 5 phút</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Bán kính {config.map.defaultRadiusKm}km · Có sẵn hàng · Gọi hoặc Zalo trực tiếp.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link to="/dai-ly">
              Tất cả đại lý <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </Button>
        </header>

        <div className="grid grid-cols-12 gap-4">
          {/* Map — 50% on lg+ */}
          <div className="col-span-12 lg:col-span-6">
            <Suspense
              fallback={
                <div className="h-[560px] rounded-2xl bg-muted/30 flex items-center justify-center border border-border">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              }
            >
              <DealerNetworkMap />
            </Suspense>
          </div>

          {/* Dealers list — 50% on lg+ */}
          <div className="col-span-12 lg:col-span-6">
            <Card className="p-4 h-full flex flex-col border-primary/15">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <h3 className="font-display font-bold text-base flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-primary" /> Top đại lý gần bạn
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 -mr-1 max-h-[520px] scroll-smooth">
                <NearbyDealers maxResults={5} showStock={false} />
              </div>
            </Card>
          </div>
        </div>
      </MotionSection>

      {/* 4. ROI CALCULATOR — investment analysis chart */}
      <MotionSection>
        <RoiCalculatorBlock />
      </MotionSection>

      {/* 5. FIELD LOG — live social proof */}
      <MotionSection>
        <FieldLog />
      </MotionSection>

      {/* 6. TRUST FEATURES */}
      <MotionSection className="container pb-10">
        <Card className="p-4 md:p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm leading-tight">{f.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </MotionSection>
      {/* O2O Sticky Action Bar (Thanh chốt sale bám đáy) */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border/40 p-3 flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe-offset-3 md:hidden">
        <Button 
          variant="outline" 
          className="flex-1 h-12 bg-white text-[#2D5A27] border border-[#2D5A27] rounded-full shadow-lg hover:bg-[#2D5A27]/5"
          asChild
        >
          <Link to="/dai-ly">
            <MapPin className="w-4 h-4 mr-1.5" /> Tìm Đại lý
          </Link>
        </Button>
        <Button 
          className="flex-1 h-12 bg-[#F57C00] text-white hover:bg-[#E65100] rounded-full shadow-lg font-bold"
          asChild
        >
          <a href="tel:0901234567">
            <span className="flex items-center justify-center">📞 Chuyên viên Báo giá</span>
          </a>
        </Button>
      </div>
      </div>
    </div>
  );
}
