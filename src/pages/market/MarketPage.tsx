import { lazy, Suspense, useState } from 'react';
import { commodityPrices, weatherData, marketAlerts, products } from '@/data/mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Droplets, Wind, CloudRain, AlertTriangle, Lightbulb, Sprout, Activity, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { HeatLayer } from '@/components/MarketHeatmap';
import PriceComparisonChart from '@/components/PriceComparisonChart';
import MarketInsightsSidebar from '@/components/MarketInsightsSidebar';
import SeoMeta from '@/components/SeoMeta';
import { useEffect } from 'react';
import { PriceTickerSkeleton } from '@/components/skeletons/PriceTickerSkeleton';

const MarketHeatmap = lazy(() => import('@/components/MarketHeatmap'));

export default function MarketPage() {
  const [layer, setLayer] = useState<HeatLayer>('demand');
  const [pricesLoading, setPricesLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPricesLoading(false), 400);
    return () => clearTimeout(t);
  }, []);
  const suggestedProducts = products.filter(p =>
    p.category === 'Hệ thống tưới' || p.category === 'Cảm biến IoT'
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-muted/20">
      <SeoMeta
        title="Trung tâm dữ liệu thị trường nông sản — AgriFlow"
        description="Heatmap nhu cầu, mạng lưới đại lý, biến động giá cà phê / tiêu / sầu riêng theo tỉnh. Phân tích AI thời gian thực."
      />
      <div className="container py-6">
        <div className="animate-slide-up mb-5 flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Activity className="w-7 h-7 text-primary" /> Trung tâm dữ liệu thị trường
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">Heatmap nhu cầu · Mạng lưới đại lý · Giá nông sản — phân tích AI 24/7</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
            Live · cập nhật mỗi 60s
          </Badge>
        </div>

        {/* ============ MAIN: Heatmap (2/3) + Insights sidebar (1/3) ============ */}
        <section className="grid grid-cols-12 gap-3 mb-5">
          <div className="col-span-12 lg:col-span-8">
            <Suspense fallback={
              <div className="h-[500px] rounded-lg bg-muted/30 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            }>
              <MarketHeatmap layer={layer} onLayerChange={setLayer} />
            </Suspense>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <MarketInsightsSidebar />
          </div>
        </section>

        {/* ============ Comparison charts ============ */}
        <section className="mb-6">
          <PriceComparisonChart />
        </section>

        {/* ============ Commodity price cards ============ */}
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold mb-3">📈 Bảng giá nông sản</h2>
          {pricesLoading ? <PriceTickerSkeleton count={commodityPrices.length || 5} /> : (
          <div className="lg:grid lg:grid-cols-5 lg:gap-3 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible scrollbar-hide">
            {commodityPrices.map((c) => {
              const up = c.change >= 0;
              return (
                <Card key={c.name} className="hover:border-primary/40 transition shrink-0 w-[160px] snap-start lg:w-auto">
                  <CardContent className="p-3">
                    <p className="text-[11px] text-muted-foreground truncate">{c.name}</p>
                    <p className="font-display font-bold text-lg mt-1">{c.currentPrice.toLocaleString('vi-VN')}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">{c.unit}</span>
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? 'text-success' : 'text-destructive'}`}>
                        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {up ? '+' : ''}{c.change}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          )}
        </section>

        {/* ============ Weather + AI alerts ============ */}
        <section className="grid grid-cols-12 gap-3 mb-8">
          <Card className="col-span-12 md:col-span-4 bg-gradient-to-br from-info/5 to-info/15">
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground mb-1">{weatherData.location}</p>
              <p className="font-display text-4xl font-bold">{weatherData.current.temp}°C</p>
              <p className="text-sm text-muted-foreground mt-1">{weatherData.current.condition}</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <Stat icon={Droplets} label="Độ ẩm" value={`${weatherData.current.humidity}%`} />
                <Stat icon={CloudRain} label="Mưa" value={`${weatherData.current.rainfall}mm`} />
                <Stat icon={Wind} label="Gió" value={`${weatherData.current.wind}km/h`} />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-12 md:col-span-8">
            <CardHeader className="pb-2"><CardTitle className="text-base font-display">Dự báo 7 ngày</CardTitle></CardHeader>
            <CardContent>
              {/* Mobile: horizontal scroll. Desktop: grid 7 cols */}
              <div className="md:grid md:grid-cols-7 md:gap-2 flex gap-2 overflow-x-auto snap-x pb-1 scrollbar-hide">
                {weatherData.forecast.map(f => (
                  <div key={f.day} className="text-center p-2 rounded-lg hover:bg-muted transition-colors shrink-0 w-[68px] snap-start md:w-auto">
                    <p className="text-xs font-medium text-muted-foreground">{f.day}</p>
                    <p className="text-2xl my-1">{f.condition}</p>
                    <p className="font-display font-bold text-sm">{f.temp}°C</p>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      <Droplets className="w-2.5 h-2.5 text-info" />
                      <span className="text-[10px] text-muted-foreground">{f.humidity}%</span>
                    </div>
                    {f.rainfall > 0 && <p className="text-[10px] text-info font-medium">{f.rainfall}mm</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ============ AI alerts ============ */}
        <section className="mb-8">
          <h2 className="font-display text-lg font-bold mb-3">🤖 Phân tích AI</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {marketAlerts.map((alert, i) => (
              <Card key={i} className={`border-l-4 ${alert.type === 'warning' ? 'border-l-warning' : 'border-l-success'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${alert.type === 'warning' ? 'bg-warning/10' : 'bg-success/10'}`}>
                      {alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-warning" /> : <Lightbulb className="w-4 h-4 text-success" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-sm">{alert.title}</h3>
                        <Badge variant="secondary" className="text-[10px]">{alert.region}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============ AI Product Suggestions ============ */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-bold">Gợi ý sản phẩm phù hợp</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Droplets; label: string; value: string; }) {
  return (
    <div className="text-center">
      <Icon className="w-4 h-4 text-info mx-auto" />
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  );
}
