import { dealers, dealerProducts } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Package, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { provinces } from '@/data/mock';
import { useApp } from '@/contexts/AppContext';
import { haversineDistance } from '@/lib/geo';
import { trackEvent } from '@/lib/tracking';
import DealerCTA from '@/components/DealerCTA';
import { Slider } from '@/components/ui/slider';
import { GEO_CONFIG } from '@/lib/geo';
import { DealerCardSkeleton } from '@/components/skeletons/PriceTickerSkeleton';

export default function DealerDirectoryPage() {
  const [province, setProvince] = useState('Tất cả');
  const [radius, setRadius] = useState(GEO_CONFIG.MAX_RADIUS_KM);
  const [loading, setLoading] = useState(true);
  const { userLocation } = useApp();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = dealers
    .filter(d => d.status === 'active')
    .filter(d => province === 'Tất cả' || d.province === province)
    .map(d => ({ ...d, distance: Math.round(haversineDistance(userLocation, { lat: d.lat, lng: d.lng })) }))
    .filter(d => d.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="container py-8">
      <div className="animate-slide-up">
        <h1 className="font-display text-3xl font-bold mb-1">Hệ thống đại lý</h1>
        <p className="text-muted-foreground mb-6">Tìm đại lý ủy quyền gần bạn · Gọi hoặc Zalo ngay</p>
      </div>

      {/* Radius Slider */}
      <div className="mb-6 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium flex items-center gap-1"><Navigation className="w-3 h-3" /> Bán kính</span>
          <Badge variant="outline">{radius} km</Badge>
        </div>
        <Slider
          value={[radius]}
          onValueChange={v => setRadius(v[0])}
          min={GEO_CONFIG.MIN_RADIUS_KM}
          max={200}
          step={5}
        />
      </div>

      {/* Province Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {provinces.map(p => (
          <button
            key={p}
            onClick={() => setProvince(p)}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
              province === p
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-muted border'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Map placeholder */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Bản đồ đại lý · {filtered.length} kết quả</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dealer list */}
      {loading ? <DealerCardSkeleton count={6} /> : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d, i) => {
          const productCount = dealerProducts.filter(dp => dp.dealerId === d.id).length;
          return (
            <Card
              key={d.id}
              className={`animate-slide-up hover:shadow-lg transition-shadow ${i === 0 ? 'ring-2 ring-primary/20' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-lg">{d.name}</h3>
                      {i === 0 && <Badge className="bg-primary/10 text-primary border-0 text-[10px]">Gần nhất</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {d.address}
                    </p>
                  </div>
                  <Badge variant="outline">{d.distance} km</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent" /> {d.rating}</span>
                  <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {productCount} SP</span>
                  <span>{d.totalOrders} đơn</span>
                </div>

                <DealerCTA
                  phone={d.phone}
                  zalo={d.zalo}
                  dealerId={d.id}
                  dealerName={d.name}
                  size="lg"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Không tìm thấy đại lý trong bán kính {radius}km.</p>
          <p className="text-sm mt-1">Thử tăng bán kính hoặc chọn tỉnh khác.</p>
        </div>
      )}
    </div>
  );
}
