import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Beaker, Bot, MapPin, Sprout, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SeoMeta from '@/components/SeoMeta';
import { trackEvent } from '@/lib/tracking';
import { useHomepageConfig } from '@/contexts/HomepageConfigContext';

// Topographic background is rendered via inline SVG
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function CustomerHomePage() {
  const { config } = useHomepageConfig();

  useEffect(() => {
    trackEvent('page_view', { source: 'homepage_v2' });
  }, []);

  return (
    <div className="relative min-h-screen bg-background pb-32 md:pb-8 overflow-hidden">
      {/* Topographic Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-2h2v2h-2zm0-31V1h2v2h-2zm0 29v-2h2v2h-2zm0-27V3h2v2h-2zm0 25v-2h2v2h-2zm0-23V5h2v2h-2zm0 21v-2h2v2h-2zm0-19V7h2v2h-2zm0 17v-2h2v2h-2zm0-15V9h2v2h-2zm0 13v-2h2v2h-2zm0-11v-2h2v2h-2zm0 9v-2h2v2h-2zm0-7v-2h2v2h-2zm0 5v-2h2v2h-2zm0-3v-2h2v2h-2zm0 1v-2h2v2h-2z' fill='%232D5A27'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="relative z-10">
        <SeoMeta
          title="Nhà Bè Agri - Giải pháp tưới & Dinh dưỡng toàn diện"
          description="Hệ sinh thái nông nghiệp công nghệ cao Nhà Bè Agri."
          canonical="https://nhabeagri.com/"
        />

        {/* 1. Header Hero */}
        <section className="container pt-20 pb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20 backdrop-blur-sm">
              <Sprout className="w-4 h-4" /> Hệ sinh thái nông nghiệp thông minh
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-6 text-foreground">
              Giải pháp tưới & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5D4037] dark:to-[#8D6E63]">Dinh dưỡng toàn diện</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tối ưu hóa năng suất và chi phí với các công cụ tính toán chính xác, kết nối trực tiếp với mạng lưới chuyên gia và đại lý ủy quyền.
            </p>
          </motion.div>
        </section>

        {/* 2. Khối Agri App Store Teaser */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container pb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Dự toán tưới */}
            <Card className="glass p-6 hover:-translate-y-1 transition-all duration-300 border-primary/10 shadow-card-hover group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dự toán tưới</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                Tính toán chính xác chi phí vật tư, đường ống và bơm cho mọi diện tích vườn.
              </p>
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground border-primary/20 transition-colors">
                <Link to="/cong-cu">Trải nghiệm ngay <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </Card>

            {/* Card 2: Châm phân */}
            <Card className="glass p-6 hover:-translate-y-1 transition-all duration-300 border-secondary/10 shadow-card-hover group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Beaker className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Công thức châm phân</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                Khuyến cáo dinh dưỡng chuẩn xác theo giai đoạn phát triển của từng loại cây.
              </p>
              <Button asChild variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground border-secondary/20 transition-colors">
                <Link to="/cong-cu">Khám phá <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </Card>

            {/* Card 3: Bác sĩ AI */}
            <Card className="glass p-6 hover:-translate-y-1 transition-all duration-300 border-accent/10 shadow-card-hover group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bác sĩ AI</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                Hỗ trợ chuẩn đoán bệnh hại và tư vấn kỹ thuật nông nghiệp tức thì 24/7.
              </p>
              <Button asChild variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground border-accent/20 transition-colors">
                <Link to="/cong-cu">Hỏi Bác sĩ AI <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </Card>
          </div>
        </motion.section>

        {/* 3. Khối Dealer Teaser */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container pb-20"
        >
          <div className="rounded-3xl overflow-hidden bg-[#1A3A18] text-white shadow-2xl relative border border-white/5">
            {/* Background Map Abstract */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-20 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 150 Q100 50 200 100 T350 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M20 250 Q120 150 220 250 T380 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="100" cy="150" r="8" fill="currentColor" />
                <circle cx="200" cy="100" r="12" fill="currentColor" className="animate-pulse" />
                <circle cx="350" cy="50" r="6" fill="currentColor" />
                <circle cx="220" cy="250" r="10" fill="currentColor" className="animate-pulse" />
                <circle cx="380" cy="200" r="8" fill="currentColor" />
              </svg>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-16 relative z-10 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-semibold mb-4 backdrop-blur-md border border-white/20">
                  <MapPin className="w-4 h-4" /> Hệ thống phân phối
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                  Mạng lưới 25+ Điểm<br className="hidden md:block" /> phân phối toàn quốc
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#F57C00]">25+</div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">Đại lý ủy quyền</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#F57C00]">63</div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">Tỉnh thành</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#F57C00]">24/7</div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">Hỗ trợ kỹ thuật</div>
                  </div>
                </div>

                <Button asChild size="lg" className="bg-[#F57C00] hover:bg-[#E65100] text-white font-bold rounded-full shadow-lg shadow-[#F57C00]/30 h-14 px-8 w-full md:w-auto">
                  <Link to="/dai-ly">
                    📍 Tìm Đại lý quanh tôi
                  </Link>
                </Button>
              </div>
              <div className="hidden md:flex justify-end items-center opacity-80 pointer-events-none">
                {/* Abstract large map icon */}
                <div className="w-64 h-64 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <MapPin className="w-32 h-32 text-white/40 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
