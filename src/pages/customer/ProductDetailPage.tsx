import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, MessageCircle, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/tracking';
import NearbyDealers from '@/components/NearbyDealers';
import InquiryForm from '@/components/InquiryForm';
import RelatedContent from '@/components/RelatedContent';
import { formatVND } from '@/components/ProductCard';
import { useApp } from '@/contexts/AppContext';
import { findNearestProvince } from '@/lib/seoLanding';
import { buildZaloLink } from '@/components/DealerCTA';
import { GEO_CONFIG } from '@/lib/geo';
import { supabase } from '@/integrations/supabase/client';
import { normalizeAttributes, normalizeMedia, type PimProduct } from '@/lib/pim';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { userLocation } = useApp();
  const [product, setProduct] = useState<PimProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const customerProvince = useMemo(
    () => findNearestProvince(userLocation.lat, userLocation.lng).name,
    [userLocation.lat, userLocation.lng],
  );

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (!data) { setProduct(null); return; }
        const row = data as Record<string, unknown>;
        setProduct({
          ...(row as unknown as PimProduct),
          attributes: normalizeAttributes(row.attributes),
          media: normalizeMedia(row.media),
          tags: (row.tags as string[]) ?? [],
          crop_tags: (row.crop_tags as string[]) ?? [],
          terrain_tags: (row.terrain_tags as string[]) ?? [],
        });
      })
      .then(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (product) trackEvent('product_view', { productId: product.id, productName: product.name, category: product.category });
  }, [product]);

  if (loading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) return (
    <div className="container py-16 text-center">
      <p className="text-muted-foreground">Sản phẩm không tồn tại.</p>
      <Button asChild variant="outline" className="mt-4"><Link to="/products">Quay lại</Link></Button>
    </div>
  );

  const isBestSeller = product.tags.includes('best seller');
  const inStock = product.stock > 0;
  const heroImage = product.image || product.media.images[0];

  // Group technical specs by attribute group for nicer rendering
  const specGroups = product.attributes.reduce<Record<string, typeof product.attributes>>((acc, attr) => {
    const g = attr.group || 'Thông số';
    (acc[g] ||= []).push(attr);
    return acc;
  }, {});

  return (
    <div className="container py-6 md:py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Quay lại sản phẩm
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Info */}
        <div className="animate-slide-up">
          <div className="aspect-square bg-muted rounded-xl flex items-center justify-center relative max-w-md mx-auto lg:max-w-none overflow-hidden">
            {heroImage ? (
              <img src={heroImage} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                <span className="text-8xl opacity-30">🌱</span>
              </div>
            )}
            {isBestSeller && (
              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0">🔥 Bán chạy</Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-4">{product.category}</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <p className="font-display text-xl font-bold text-primary">
              Từ {formatVND(Number(product.base_price) || 0)}/{product.unit}
            </p>
            {/* stock_status badge */}
            {inStock ? (
              <Badge className="gap-1 bg-success/10 text-success border-success/20" variant="outline">
                <CheckCircle2 className="w-3 h-3" /> Còn hàng ({product.stock})
              </Badge>
            ) : (
              <Badge className="gap-1" variant="destructive">
                <XCircle className="w-3 h-3" /> Hết hàng
              </Badge>
            )}
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {product.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
          </div>

          {product.description && (
            <p className="text-muted-foreground mt-4 leading-relaxed whitespace-pre-line">{product.description}</p>
          )}

          {/* Technical specs (JSONB attributes) */}
          {product.attributes.length > 0 && (
            <div className="mt-6 border-t pt-4 space-y-5">
              <h3 className="font-display font-semibold">Thông số kỹ thuật</h3>
              {Object.entries(specGroups).map(([group, attrs]) => (
                <div key={group}>
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide mb-1.5">{group}</p>
                  <div className="space-y-0">
                    {attrs.map((attr) => (
                      <div key={attr.key} className="flex justify-between text-sm py-1.5 border-b border-dashed">
                        <span className="text-muted-foreground">{attr.label}</span>
                        <span className="font-medium text-right">
                          {attr.value}{attr.unit ? ` ${attr.unit}` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Media: PDFs */}
          {product.media.pdfs.length > 0 && (
            <div className="mt-5 border-t pt-4">
              <h3 className="font-display font-semibold mb-2">Tài liệu kỹ thuật</h3>
              <ul className="space-y-1.5">
                {product.media.pdfs.map((pdf, i) => (
                  <li key={i}>
                    <a href={pdf.url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline">
                      📄 {pdf.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* O2O Lead Section — THE CORE */}
        <div className="animate-slide-in-right">
          <h2 className="font-display text-xl font-bold mb-1">📍 Đại lý có hàng gần bạn</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Top 3 đại lý trong bán kính 50km · Gọi hoặc Zalo ngay
          </p>

          <NearbyDealers productId={product.id} productName={product.name} maxResults={3} />

          <div className="mt-6">
            <InquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>
      </div>

      <RelatedContent
        productId={product.id}
        productName={product.name}
        productCategory={product.category}
        productCropTags={product.crop_tags}
      />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-card/95 backdrop-blur-md border-t lg:hidden z-40">
        <div className="container flex gap-2">
          <Button
            size="lg"
            className="flex-1 h-14 text-base font-semibold"
            asChild
            onClick={() => trackEvent('call_click', { productId: product.id, productName: product.name, source: 'sticky_bar' })}
          >
            <a href={`tel:${GEO_CONFIG.HOTLINE}`}>
              <Phone className="w-5 h-5 mr-2" /> Gọi kỹ thuật viên
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-14 text-base font-semibold border-primary text-primary"
            asChild
            onClick={() => trackEvent('zalo_click', { productId: product.id, productName: product.name, customerProvince, source: 'sticky_bar' })}
          >
            <a
              href={buildZaloLink('0901234567', product.name, customerProvince)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" /> Tư vấn đại lý gần nhất
            </a>
          </Button>
        </div>
      </div>

      <div className="h-20 lg:hidden" />
    </div>
  );
}
