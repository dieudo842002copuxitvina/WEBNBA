import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Wrench, 
  Droplets, 
  TrendingUp, 
  Search, 
  Clock, 
  ChevronRight, 
  Filter,
  BarChart3,
  FileText,
  Zap,
  Leaf
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SeoMeta from '@/components/SeoMeta';

// --- MOCK DATA ---
const TAGS = ['Tất cả', '#KỹThuật', '#ThịTrường', '#ThựcĐịa', '#SầuRiêng', '#CàPhê'];

const TECH_ARTICLES = [
  {
    id: 's2000-slope',
    title: 'Quy trình lắp đặt béc tưới Rivulis S2000 cho vườn sầu riêng địa hình dốc',
    desc: 'Hướng dẫn cách tính toán khoảng cách béc và cách đi đường ống LDPE để áp suất đồng đều nhất trên sườn đồi.',
    thumbnail: 'https://images.unsplash.com/photo-1592861343717-3bf79ab44621?w=800&q=80', // Placeholder: Cận cảnh béc tưới
    tag: '#KỹThuật',
    readTime: '7 phút đọc',
    icon: Wrench
  },
  {
    id: 'clogging-fix',
    title: 'Mẹo xử lý tắc nghẽn hệ thống tưới nhỏ giọt do nguồn nước phèn/vôi',
    desc: 'Cách sử dụng axit nhẹ để súc rửa đường ống và quy trình vệ sinh bộ lọc đĩa Azud định kỳ hiệu quả.',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', // Placeholder: Vệ sinh bộ lọc
    tag: '#ThựcĐịa',
    readTime: '5 phút đọc',
    icon: Droplets
  },
  {
    id: 'venturi-sop',
    title: 'SOP: 5 bước vận hành trạm bơm châm phân Venturi không gây kết tủa',
    desc: 'Quy tắc pha phân và thời điểm bắt đầu/kết thúc chu kỳ châm phân trong quá trình tưới để bảo vệ hệ thống.',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', // Placeholder: Cụm trung tâm
    tag: '#KỹThuật',
    readTime: '6 phút đọc',
    icon: Zap
  }
];

const MARKET_ARTICLES = [
  {
    id: 'durian-price-2026',
    title: 'Phân tích chu kỳ giá Sầu riêng 2026: Cơ hội từ nghị định thư xuất khẩu chính ngạch',
    desc: 'Đánh giá nhu cầu từ thị trường Trung Quốc và yêu cầu về mã số vùng trồng cho nông dân Việt Nam.',
    thumbnail: 'https://images.unsplash.com/photo-1615485240384-552e403bc68e?w=800&q=80', // Placeholder: Cánh đồng sầu riêng
    tag: '#ThịTrường',
    readTime: '8 phút đọc',
    icon: TrendingUp
  },
  {
    id: 'globalgap-automation',
    title: 'Tại sao tưới tự động là chìa khóa để đạt chuẩn GlobalGAP?',
    desc: 'Sự minh bạch trong việc ghi chép nhật ký tưới và bón phân thông qua hệ thống tự động hóa Smartphone.',
    thumbnail: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80', // Placeholder: Nông dân smartphone
    tag: '#ThựcĐịa',
    readTime: '5 phút đọc',
    icon: BarChart3
  },
  {
    id: 'pressure-compensating-trend',
    title: 'Báo cáo thị trường vật tư nông nghiệp: Xu hướng chuyển dịch sang thiết bị tưới bù áp',
    desc: 'Tại sao nông dân sẵn sàng đầu tư béc đắt tiền để tiết kiệm chi phí vận hành và nhân công lâu dài.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Placeholder: Biểu đồ tăng trưởng
    tag: '#ThịTrường',
    readTime: '10 phút đọc',
    icon: Search
  }
];

export default function KnowledgeHubPage() {
  const [activeTag, setActiveTag] = useState('Tất cả');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SeoMeta 
        title="Trung Tâm Tri Thức Nhà Bè Agri | Kỹ Thuật & Thị Trường"
        description="Kho kiến thức thực chiến về hệ thống tưới, dinh dưỡng cây trồng và phân tích thị trường nông sản chuyên sâu."
      />

      {/* HEADER */}
      <div className="relative bg-white/40 backdrop-blur-md pt-12 pb-16 border-b border-white/60">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-[#2D5A27]/10 text-[#2D5A27] border-0 mb-4 px-4 py-1 text-sm font-bold">
              KNOWLEDGE HUB
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-display mb-6">
              Trung Tâm Tri Thức <span className="text-[#2D5A27]">Nhà Bè Agri</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Nơi chia sẻ những bí quyết kỹ thuật thực chiến và xu hướng thị trường nông sản mới nhất dành cho nhà nông hiện đại.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 -z-10" />
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-16 z-30 bg-white/70 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm">
        <div className="container">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-500 shrink-0">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Lọc:</span>
            </div>
            {TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${
                  activeTag === tag 
                    ? 'bg-[#2D5A27] text-white shadow-lg shadow-[#2D5A27]/20' 
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-[#2D5A27]/40 hover:text-[#2D5A27]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12 space-y-20">
        
        {/* SECTION A: Kỹ Thuật Thực Chiến */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-display flex items-center gap-3">
                <Wrench className="w-8 h-8 text-[#2D5A27]" />
                Kỹ Thuật Thực Chiến
              </h2>
              <p className="text-slate-500 mt-2">Hướng dẫn chuyên sâu về lắp đặt, vận hành và bảo trì hệ thống.</p>
            </div>
            <Button variant="ghost" className="text-[#2D5A27] font-bold group">
              Xem thêm <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TECH_ARTICLES.map(article => (
              <motion.div 
                key={article.id}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[24px] overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={article.thumbnail} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur text-[#2D5A27] border-0 px-3 py-1 font-bold text-[10px]">
                        {article.tag}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur text-white px-2 py-1 rounded-lg text-[10px] flex items-center gap-1.5 font-medium">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-10 h-10 bg-[#2D5A27]/5 rounded-xl flex items-center justify-center mb-4">
                      <article.icon className="w-5 h-5 text-[#2D5A27]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#2D5A27] transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                      {article.desc}
                    </p>
                    <div className="mt-auto">
                      <Button variant="link" className="p-0 h-auto text-slate-900 font-bold flex items-center gap-2 group-hover:text-[#2D5A27]">
                        Đọc chi tiết <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION B: Thị Trường & Xu Hướng */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-display flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Thị Trường & Xu Hướng
              </h2>
              <p className="text-slate-500 mt-2">Báo cáo, phân tích và định hướng phát triển nông nghiệp hiện đại.</p>
            </div>
            <Button variant="ghost" className="text-blue-600 font-bold group">
              Xem thêm <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="space-y-6">
            {MARKET_ARTICLES.map(article => (
              <motion.div 
                key={article.id}
                whileHover={{ x: 8 }}
                className="group"
              >
                <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all rounded-[24px] overflow-hidden">
                  <CardContent className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 h-40 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                      <img 
                        src={article.thumbnail} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col py-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-blue-50 text-blue-600 border-0 px-3 py-0.5 text-[10px] font-bold">
                          {article.tag}
                        </Badge>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {article.desc}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <article.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-400">Phân tích bởi Chuyên gia NB</span>
                        </div>
                        <Button size="sm" className="rounded-full bg-slate-900 text-white hover:bg-blue-600 px-6">
                          Đọc ngay
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER / SUBSCRIBE */}
        <div className="bg-[#2D5A27] rounded-[40px] p-12 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Cập nhật tri thức mới nhất?</h3>
            <p className="text-green-100 mb-8">Đăng ký để nhận báo cáo thị trường và hướng dẫn kỹ thuật độc quyền hàng tuần qua Zalo.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="tel" 
                placeholder="Nhập số điện thoại Zalo..." 
                className="flex-1 h-14 bg-white/10 border border-white/20 rounded-2xl px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <Button className="h-14 px-8 rounded-2xl bg-white text-[#2D5A27] font-bold hover:bg-green-50">
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Arrow icon since I need it and didn't import ArrowRight earlier but used it in Button
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
