import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Sprout, 
  Wrench, 
  ShieldCheck, 
  Leaf, 
  ArrowRight,
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SeoMeta from '@/components/SeoMeta';

const CROPS = [
  { value: 'sau-rieng', label: 'Sầu riêng' },
  { value: 'ca-phe', label: 'Cà phê' },
  { value: 'tieu', label: 'Hồ tiêu' },
  { value: 'dieu', label: 'Cây Điều' },
  { value: 'cay-an-trai', label: 'Cây ăn trái khác' },
];

const PROVINCES = [
  { value: 'dak-lak', label: 'Đắk Lắk' },
  { value: 'lam-dong', label: 'Lâm Đồng' },
  { value: 'gia-lai', label: 'Gia Lai' },
  { value: 'dong-nai', label: 'Đồng Nai' },
  { value: 'binh-phuoc', label: 'Bình Phước' },
];

export default function SolutionsPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SeoMeta 
        title="Giải Pháp Nông Nghiệp Thông Minh | Nhà Bè Agri"
        description="Giải pháp trọn gói thiết kế bởi kỹ sư, thi công bởi thợ địa phương và chăm sóc bởi chuyên gia dinh dưỡng."
      />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-[#2D5A27]/10 text-[#2D5A27] border-0 mb-4 px-4 py-1 text-sm font-bold">
                EXPERT SOLUTIONS
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-display mb-6 leading-tight">
                Giải Pháp Nông Nghiệp <br />
                <span className="text-[#2D5A27]">Thông Minh & Toàn Diện</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Tối ưu hóa năng suất rẫy của bạn bằng công nghệ tưới tiên tiến và sự đồng hành từ các chuyên gia hàng đầu.
              </p>
            </motion.div>
          </div>

          {/* SMART SEARCH BOX */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-xl border border-white p-2 md:p-4 rounded-[2.5rem] shadow-2xl shadow-slate-200/50">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <Select onValueChange={setSelectedCrop}>
                      <SelectTrigger className="h-14 md:h-16 rounded-3xl border-slate-100 bg-white/50 text-base font-medium px-6">
                        <div className="flex items-center gap-3">
                          <Sprout className="w-5 h-5 text-[#2D5A27]" />
                          <SelectValue placeholder="Chọn loại cây trồng" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                        {CROPS.map(crop => (
                          <SelectItem key={crop.value} value={crop.value} className="py-3 rounded-xl focus:bg-green-50 focus:text-[#2D5A27]">
                            {crop.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative">
                    <Select onValueChange={setSelectedProvince}>
                      <SelectTrigger className="h-14 md:h-16 rounded-3xl border-slate-100 bg-white/50 text-base font-medium px-6">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <SelectValue placeholder="Chọn tỉnh thành" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                        {PROVINCES.map(p => (
                          <SelectItem key={p.value} value={p.value} className="py-3 rounded-xl focus:bg-blue-50 focus:text-blue-600">
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  className="w-full md:w-auto h-14 md:h-16 px-8 rounded-3xl bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-base shadow-lg shadow-orange-500/20 transition-all active:scale-95 group shrink-0"
                >
                  🚀 Xem Giải Pháp Tối Ưu <span className="hidden lg:inline ml-1">Cho Vườn Của Bạn</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ALL-IN-ONE SOLUTION SECTION: Vườn Chuẩn 5 Sao */}
      <section className="container py-20 border-b border-slate-100">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-600 border-0 mb-3 px-4 py-1">ALL-IN-ONE SOLUTION</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display">
            Giải Pháp <span className="text-[#2D5A27]">Đồng Hành Quanh Năm</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Quy trình khép kín giúp rẫy sầu riêng, cà phê của bạn đạt chuẩn chất lượng xuất khẩu.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Khảo sát & Thiết kế",
              desc: "Bản vẽ thủy lực chuẩn khoa học cho địa hình dốc.",
              img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80" // Vườn cây
            },
            {
              step: "02",
              title: "Cung ứng vật tư",
              desc: "Phân bón & thiết bị chính hãng Ducar, Rivulis, Cà Mau.",
              img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80" // Vật tư
            },
            {
              step: "03",
              title: "Thi công chuyên nghiệp",
              desc: "Kết nối đội thợ vãng lai địa phương trực tiếp tại vườn.",
              img: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&q=80" // Đội thợ
            },
            {
              step: "04",
              title: "Chăm sóc 365 ngày",
              desc: "Lịch châm phân & kỹ thuật từ giống đến thu hoạch.",
              img: "https://images.unsplash.com/photo-1530836361253-efad53bc9717?w=400&q=80" // Thu hoạch
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full bg-white/70 backdrop-blur-md border border-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="h-40 overflow-hidden relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 w-8 h-8 bg-[#2D5A27] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    {item.step}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE SERVICE FORCE: Thợ Vãng Lai */}
      <section className="container py-20">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="flex gap-3 mb-6">
                <Badge className="bg-green-100 text-[#2D5A27] border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Dịch vụ tận rẫy
                </Badge>
                <Badge className="bg-blue-100 text-blue-600 border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Bảo trì trọn đời
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-6">
                Đội Ngũ <span className="text-[#2D5A27]">Thợ Vãng Lai</span> <br />
                Sẵn Sàng Hỗ Trợ Tại Chỗ
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Không còn lo lắng về việc tìm thợ thi công hay sửa chữa. Hệ thống của chúng tôi kết nối bạn với những thợ kỹ thuật lành nghề nhất ngay tại địa phương, hiểu rõ địa hình và thổ nhưỡng của khu vực bạn.
              </p>
              <Button className="h-14 px-8 rounded-2xl bg-[#2D5A27] hover:bg-[#1f421b] text-white font-bold text-base shadow-lg shadow-[#2D5A27]/20 group">
                <MessageCircle className="w-5 h-5 mr-3" /> Kết nối Thợ thi công gần bạn
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" 
                  alt="Thợ kỹ thuật" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#2D5A27]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Tin cậy</p>
                  <p className="font-bold text-slate-800">100% Đã xác thực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACITY SECTION (from previous design) */}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Thiết kế bởi Kỹ sư",
              desc: "Bản vẽ 2D/3D chi tiết, tính toán lưu lượng và áp suất chuẩn xác 99%.",
              icon: Wrench,
              color: "bg-orange-50 text-orange-600",
              border: "border-orange-100"
            },
            {
              title: "Thi công bởi Thợ địa phương",
              desc: "Đội ngũ thợ lành nghề tại từng vùng miền, hỗ trợ lắp đặt nhanh chóng, bảo trì tận nơi.",
              icon: ShieldCheck,
              color: "bg-blue-50 text-blue-600",
              border: "border-blue-100"
            },
            {
              title: "Chăm sóc bởi Chuyên gia",
              desc: "Tư vấn lộ trình dinh dưỡng và điều tiết phân bón theo từng giai đoạn sinh trưởng của cây.",
              icon: Leaf,
              color: "bg-green-50 text-green-600",
              border: "border-green-100"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`h-full bg-white/80 backdrop-blur-md border-0 shadow-sm hover:shadow-md transition-all rounded-[2.5rem] overflow-hidden group`}>
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 mx-auto ${item.color} rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ADDITIONAL CTAs or Solutions Grid can go here */}
      <section className="container pb-20">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2D5A27] rounded-full blur-[120px] opacity-20 translate-x-1/4 translate-y-1/4" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold font-display mb-2">Bạn cần tư vấn trực tiếp từ kỹ sư?</h2>
              <p className="text-slate-400">Gửi thông tin diện tích và loại cây, chúng tôi sẽ gọi lại ngay trong 5 phút.</p>
            </div>
            <Button size="lg" className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 h-14">
              Kết nối chuyên gia ngay
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
