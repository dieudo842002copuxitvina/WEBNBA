import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, Beaker, Bot, MapPin, ArrowRight, 
  Search, TrendingUp, TrendingDown, Sun, Package, Map, Video, Play, Newspaper, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import SeoMeta from '@/components/SeoMeta';

// --- SUB-COMPONENTS ---

function DailyMarketWidget() {
  return (
    <div className="space-y-4">
      {/* Widget Bảng giá */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2D5A27]" />
            Bảng Tin Nông Vụ
          </h3>
          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-[#2D5A27] rounded-full">Hôm nay</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2D5A27]/10 flex items-center justify-center font-bold text-[#2D5A27] text-xs">CF</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Cà phê</p>
                <p className="text-xs text-slate-500">Tây Nguyên</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">120.000đ</p>
              <p className="text-xs text-green-600 flex items-center justify-end gap-0.5"><TrendingUp className="w-3 h-3" /> +1,500đ</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2D5A27]/10 flex items-center justify-center font-bold text-[#2D5A27] text-xs">HT</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Hồ tiêu</p>
                <p className="text-xs text-slate-500">Đắk Lắk</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">150.000đ</p>
              <p className="text-xs text-red-500 flex items-center justify-end gap-0.5"><TrendingDown className="w-3 h-3" /> -500đ</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Widget Thời tiết */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/40 shadow-sm p-4 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
          <Sun className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">Bình Phước: 32°C</p>
          <p className="text-xs text-slate-600 mt-0.5 leading-tight">Nắng gắt, lưu ý tưới bù nước vào buổi sáng sớm.</p>
        </div>
      </Card>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="container pt-12 md:pt-20 pb-16">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Cột trái */}
        <div className="md:col-span-7 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-800 leading-[1.15]">
              Giải Pháp Tưới & Dinh Dưỡng Nông Nghiệp <span className="text-[#2D5A27]">O2O</span>
            </h1>
            <p className="text-lg text-slate-600 mt-6 max-w-xl leading-relaxed">
              Từ ứng dụng chẩn đoán thông minh đến thiết bị tại vườn. Nền tảng kết nối trực tiếp Nông Dân - Kỹ Sư - Đại Lý.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="relative max-w-xl"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <Input 
              type="text" 
              placeholder="Bạn cần tìm béc tưới, ống dẫn hay chẩn đoán bệnh cây?" 
              className="h-16 pl-12 pr-32 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-sm text-base focus-visible:ring-[#2D5A27] focus-visible:border-[#2D5A27]"
            />
            <div className="absolute inset-y-2 right-2">
              <Button className="h-full px-6 rounded-xl bg-[#2D5A27] hover:bg-[#1A3A18] text-white font-bold shadow-md">
                Tìm kiếm
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Cột phải */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="md:col-span-5"
        >
          <DailyMarketWidget />
        </motion.div>
      </div>
    </section>
  );
}

function ToolTeaser() {
  const tools = [
    {
      title: "Dự Toán Vật Tư Tưới",
      desc: "Tính số lượng béc, đường ống và báo giá theo diện tích vườn.",
      icon: <Calculator className="w-7 h-7" />,
      path: "/cong-cu/du-toan-tuoi",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Kỹ Sư Châm Phân",
      desc: "Công thức pha dinh dưỡng và thời gian bơm chuẩn xác.",
      icon: <Beaker className="w-7 h-7" />,
      path: "/cong-cu/cham-phan",
      color: "bg-orange-50 text-orange-600 border-orange-100"
    },
    {
      title: "Bác Sĩ Cây Trồng AI",
      desc: "Chụp ảnh lá bệnh, nhận chẩn đoán và toa thuốc tức thì.",
      icon: <Bot className="w-7 h-7" />,
      path: "/cong-cu/bac-si-ai",
      color: "bg-purple-50 text-purple-600 border-purple-100"
    }
  ];

  return (
    <section className="container pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-extrabold text-slate-800">Agri App Store</h2>
        <p className="text-slate-500 mt-1">Trung tâm công cụ số dành cho nhà nông</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="group h-full bg-white/70 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all p-6 rounded-3xl cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${tool.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{tool.title}</h3>
              <p className="text-slate-600 mb-8 line-clamp-2">{tool.desc}</p>
              
              <Button asChild variant="ghost" className="w-full justify-between hover:bg-slate-100/50 text-[#2D5A27] font-semibold">
                <Link to={tool.path}>
                  Mở công cụ <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AgriVideoShorts() {
  const videos = [
    { title: "Quy trình tưới nhỏ giọt công nghệ cao", thumbnail: "https://images.unsplash.com/photo-1592982537447-6f296d0540eb?auto=format&fit=crop&w=400&q=80" },
    { title: "Cách châm phân qua Venturi chuẩn", thumbnail: "https://images.unsplash.com/photo-1628183180295-d226a27ce538?auto=format&fit=crop&w=400&q=80" },
    { title: "Bảo trì vệ sinh lọc đĩa 130 micron", thumbnail: "https://images.unsplash.com/photo-1589923188900-85dae5243404?auto=format&fit=crop&w=400&q=80" },
    { title: "Phòng chống rủi ro an ninh mạng nông nghiệp", thumbnail: "https://images.unsplash.com/photo-1530836369250-ef71a359671c?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <section className="container pb-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
          <Video className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-extrabold text-slate-800">Kỹ Thuật & Thực Hành Tại Rẫy</h2>
          <p className="text-slate-500 mt-1">Video ngắn hướng dẫn trực quan</p>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {videos.map((vid, i) => (
          <div key={i} className="snap-center shrink-0 w-[240px] md:w-[280px] aspect-[9/16] relative rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all">
            <img src={vid.thumbnail} alt={vid.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <p className="text-white font-bold leading-snug line-clamp-2">{vid.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsFeedSection() {
  const news = [
    {
      title: "Thị trường tín chỉ Carbon: Nông dân có thể kiếm thêm bao nhiêu?",
      desc: "Xu hướng nông nghiệp bền vững mở ra cơ hội tăng thu nhập từ việc bán tín chỉ Carbon trên rẫy cà phê.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80",
      date: "23 Tháng 4, 2026"
    },
    {
      title: "Chính sách xuất khẩu nông sản 2026: Tiêu chuẩn mới về dư lượng",
      desc: "Nắm bắt ngay các quy định khắt khe mới nhất từ thị trường EU và Mỹ đối với nông sản xuất khẩu.",
      image: "https://images.unsplash.com/photo-1598046937895-2630ce5a9c9f?auto=format&fit=crop&w=400&q=80",
      date: "22 Tháng 4, 2026"
    },
    {
      title: "Giải pháp tưới tiết kiệm nước ứng phó hạn hán El Nino",
      desc: "Chuyên gia khuyến cáo các biện pháp quản lý tưới tiêu hiệu quả để vượt qua mùa khô khốc liệt.",
      image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80",
      date: "20 Tháng 4, 2026"
    },
    {
      title: "Giá hồ tiêu đạt đỉnh 10 năm: Chiến lược chăm sóc sau thu hoạch",
      desc: "Cách duy trì năng suất và sức khỏe cây tiêu để đón đầu chu kỳ giá cao tiếp theo.",
      image: "https://images.unsplash.com/photo-1620986790595-d22ebc298ec2?auto=format&fit=crop&w=400&q=80",
      date: "18 Tháng 4, 2026"
    }
  ];

  return (
    <section className="container pb-24">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-extrabold text-slate-800">Tin Tức Nông Vụ</h2>
            <p className="text-slate-500 mt-1">Điểm tin & Xu hướng thị trường</p>
          </div>
        </div>
        <Link to="/tin-tuc" className="hidden md:flex items-center text-[#2D5A27] font-semibold hover:underline">
          Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {news.map((item, i) => (
          <Link key={i} to="/tin-tuc" className="group">
            <Card className="flex flex-row items-center gap-4 p-3 md:p-4 bg-white/70 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md transition-all rounded-2xl">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium mb-1">{item.date}</p>
                <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#2D5A27] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed hidden md:block">
                  {item.desc}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 md:hidden text-center">
        <Button asChild variant="outline" className="w-full rounded-xl border-[#2D5A27]/20 text-[#2D5A27]">
          <Link to="/tin-tuc">Xem tất cả tin tức <ChevronRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>
    </section>
  );
}

function DealerTeaser() {
  return (
    <section className="container pb-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden relative shadow-2xl"
      >
        <div className="absolute inset-0 bg-[#2D5A27]">
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
          />
        </div>

        <div className="relative z-10 px-8 py-16 md:p-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">
              <Map className="w-4 h-4" /> Hệ thống O2O Showroom
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
              Mạng lưới 25+ Đại Lý &<br /> Trạm Dịch Vụ Toàn Quốc
            </h2>
            
            <p className="text-lg text-white/80 mb-10 max-w-xl leading-relaxed">
              Không chỉ bán vật tư, chúng tôi cung cấp giải pháp trọn gói. Đội ngũ kỹ sư tại đại lý sẵn sàng xuống tận rẫy khảo sát, thiết kế và thi công hệ thống theo đúng chuẩn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#F57C00] hover:bg-[#E65100] text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-[#F57C00]/30 transition-transform active:scale-95">
                <Link to="/dai-ly">
                  <MapPin className="w-5 h-5 mr-2" /> Tìm Đại Lý Quanh Tôi
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-xl backdrop-blur-sm transition-colors">
                <Link to="/products">
                  <Package className="w-5 h-5 mr-2" /> Khám Phá Vật Tư
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 hidden md:flex justify-end relative">
            {/* Decorative Map abstract */}
            <div className="w-64 h-64 border-4 border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative">
              <div className="absolute inset-0 rounded-full border-t border-white/20 animate-spin-slow" style={{ animationDuration: '8s' }} />
              <MapPin className="w-24 h-24 text-white/40 drop-shadow-2xl" />
              {/* Pulse dots */}
              <div className="absolute top-10 left-10 w-3 h-3 bg-[#F57C00] rounded-full animate-ping" />
              <div className="absolute bottom-20 right-10 w-4 h-4 bg-[#F57C00] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// --- MAIN PAGE ---

export default function CustomerHomePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 font-sans selection:bg-[#2D5A27]/20">
      
      <SeoMeta
        title="Nhà Bè Agri - Giải pháp tưới & Dinh dưỡng Nông nghiệp O2O"
        description="Nền tảng kết nối trực tiếp Nông Dân - Kỹ Sư - Đại Lý. Công cụ dự toán vật tư, châm phân tự động, bác sĩ cây trồng AI."
        canonical="https://nhabeagri.com/"
      />

      {/* Topographic Background Pattern - 5-10% opacity */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-2h2v2h-2zm0-31V1h2v2h-2zm0 29v-2h2v2h-2zm0-27V3h2v2h-2zm0 25v-2h2v2h-2zm0-23V5h2v2h-2zm0 21v-2h2v2h-2zm0-19V7h2v2h-2zm0 17v-2h2v2h-2zm0-15V9h2v2h-2zm0 13v-2h2v2h-2zm0-11v-2h2v2h-2zm0 9v-2h2v2h-2zm0-7v-2h2v2h-2zm0 5v-2h2v2h-2zm0-3v-2h2v2h-2zm0 1v-2h2v2h-2z' fill='%232D5A27'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="relative z-10">
        <HeroSection />
        <ToolTeaser />
        <AgriVideoShorts />
        <NewsFeedSection />
        <DealerTeaser />
      </div>

    </div>
  );
}
