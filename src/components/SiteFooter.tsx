import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Youtube, Sprout } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';

const SOCIALS = [
  {
    key: 'tiktok',
    label: 'TikTok Điểu Đơ',
    href: 'https://www.tiktok.com/@dieudo',
    color: 'hover:bg-foreground hover:text-background',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M19.6 6.3a5.6 5.6 0 0 1-3.4-1.2 5.6 5.6 0 0 1-2.2-4.1h-3.4v14.5a3 3 0 1 1-2.1-2.9V9a6.4 6.4 0 1 0 5.5 6.4V9.7a9 9 0 0 0 5.6 1.9V8.2a5.5 5.5 0 0 1 0-1.9z" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/nhabeagri',
    color: 'hover:bg-info hover:text-info-foreground',
    icon: <Facebook className="w-4 h-4" />,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@nhabeagri',
    color: 'hover:bg-destructive hover:text-destructive-foreground',
    icon: <Youtube className="w-4 h-4" />,
  },
];

export default function SiteFooter() {
  const onSocialClick = (key: string) => {
    // Reuse generic 'inquiry_submit' channel-style tracking is overkill — log via console.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.debug('[social_click]', { network: key, source: 'footer' });
    }
  };

  return (
    <footer className="mt-10 border-t bg-muted/30">
      <div className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-extrabold text-base leading-tight">Nhà Bè Agri</p>
              <p className="text-[11px] text-muted-foreground">Nông nghiệp công nghệ cao</p>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Mạng lưới đại lý &amp; thợ kỹ thuật phủ khắp 63 tỉnh thành — cung cấp giải pháp tưới
            tự động, IoT và máy móc nông nghiệp chính hãng.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display font-bold text-sm mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="tel:0901234567"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => trackEvent('call_click', { source: 'footer' })}
              >
                <Phone className="w-4 h-4 shrink-0" /> 0901 234 567 (Hotline)
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@nhabeagri.vn"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" /> hello@nhabeagri.vn
              </a>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Số 1 Nhà Bè, TP. Hồ Chí Minh, Việt Nam</span>
            </li>
          </ul>
        </div>

        {/* Socials + quick links */}
        <div>
          <h3 className="font-display font-bold text-sm mb-3">Theo dõi chúng tôi</h3>
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                onClick={() => onSocialClick(s.key)}
                className={`w-10 h-10 rounded-full border bg-background flex items-center justify-center transition-colors ${s.color}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            <span className="font-semibold text-foreground">TikTok Điểu Đơ</span> · review thực
            tế từ rẫy.
          </p>

          <nav aria-label="Liên kết nhanh" className="mt-5">
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              <li><Link to="/giai-phap" className="text-muted-foreground hover:text-primary transition-colors">Giải pháp</Link></li>
              <li><Link to="/dai-ly" className="text-muted-foreground hover:text-primary transition-colors">Đại lý</Link></li>
              <li><Link to="/tin-tuc" className="text-muted-foreground hover:text-primary transition-colors">Tin tức</Link></li>
              <li><Link to="/thu-vien" className="text-muted-foreground hover:text-primary transition-colors">Kỹ thuật</Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">Công cụ</Link></li>
              <li><Link to="/lien-he" className="text-muted-foreground hover:text-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Nhà Bè Agri. All rights reserved.</p>
          <p>Made with 🌱 for Vietnamese farmers.</p>
        </div>
      </div>
    </footer>
  );
}
