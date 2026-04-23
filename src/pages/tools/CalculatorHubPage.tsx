import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Droplet, Zap, TrendingUp, Sprout, ArrowRight, Sparkles } from 'lucide-react';
import SeoMeta from '@/components/SeoMeta';

const TOOLS = [
  {
    href: '/cong-cu/tinh-toan',
    title: 'Máy tính tưới (Wizard)',
    desc: 'Wizard 4 bước: cây trồng → diện tích → nguồn nước → kết quả + báo giá nhanh.',
    icon: Sprout, accent: 'from-primary/15 to-primary/5', iconBg: 'bg-primary/15 text-primary',
    badge: 'Phổ biến',
  },
  {
    href: '/cong-cu/sut-ap',
    title: 'Sụt áp thuỷ lực',
    desc: 'Tính tổn thất áp lực Hazen-Williams theo đường kính, chiều dài, lưu lượng.',
    icon: Droplet, accent: 'from-info/15 to-info/5', iconBg: 'bg-info/15 text-info',
    badge: 'Kỹ thuật',
  },
  {
    href: '/cong-cu/du-toan-1ha',
    title: 'Dự toán vật tư 1 Hecta',
    desc: 'Chọn cây trồng + diện tích → BOM tự động (béc, ống, phụ kiện, máy bơm).',
    icon: Calculator, accent: 'from-success/15 to-success/5', iconBg: 'bg-success/15 text-success',
    badge: 'Mới',
  },
  {
    href: '/cong-cu/dien-nang',
    title: 'Điện năng & Tủ điện',
    desc: 'Tự động chọn dây dẫn, CB, RCD theo công suất bơm và khoảng cách kéo dây.',
    icon: Zap, accent: 'from-warning/15 to-warning/5', iconBg: 'bg-warning/15 text-warning',
    badge: 'Mới',
  },
  {
    href: '/cong-cu/roi',
    title: 'ROI - Hoàn vốn đầu tư',
    desc: 'So sánh Nhà Bè Agri vs tưới truyền thống: payback, lợi nhuận tích luỹ.',
    icon: TrendingUp, accent: 'from-destructive/15 to-destructive/5', iconBg: 'bg-destructive/15 text-destructive',
    badge: 'Mới',
  },
];

export default function CalculatorHubPage() {
  return (
    <div className="container py-8 md:py-12 animate-fade-in">
      <SeoMeta
        title="Bộ công cụ kỹ thuật tưới - Nhà Bè Agri"
        description="5 công cụ tính toán: tưới thông minh, sụt áp thuỷ lực, dự toán 1 Hecta, điện năng, ROI hoàn vốn. Miễn phí, kết quả tức thì."
        canonical="/cong-cu"
      />

      <header className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <Badge variant="secondary" className="mb-3 gap-1.5">
          <Sparkles className="w-3 h-3" /> Irrigation Engineer Suite
        </Badge>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Bộ công cụ kỹ thuật tưới
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          5 công cụ chuyên dụng giúp nông dân và đại lý tính toán nhanh — miễn phí, không cần đăng ký.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            to={t.href}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          >
            <Card className={`h-full bg-gradient-to-br ${t.accent} border hover:border-primary/40 hover:shadow-md transition-all hover:-translate-y-0.5`}>
              <CardContent className="p-5 md:p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${t.iconBg} flex items-center justify-center`}>
                    <t.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-[10px]">{t.badge}</Badge>
                </div>
                <h3 className="font-display font-bold text-lg mb-1.5 group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">{t.desc}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary mt-4">
                  Mở công cụ
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
