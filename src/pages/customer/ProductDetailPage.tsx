import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  MapPin, 
  FileText, 
  Download, 
  ShieldCheck, 
  Phone, 
  Navigation, 
  ArrowRight, 
  Store, 
  BookOpen, 
  BarChart3, 
  Settings,
  Share2,
  ExternalLink,
  MessageCircle,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';
import { dealersData } from '@/data/dealersData';
import { toast } from 'sonner';
import SeoMeta from '@/components/SeoMeta';

// --- MOCK DATA ---
const PRODUCT_DATA = {
  id: 'rivulis-s2000',
  name: 'Béc tưới bù áp Rivulis S2000 (Israel)',
  category: 'IRRIGATION',
  brand: 'Rivulis',
  country: 'Israel',
  efficiency: 'Tiết kiệm 20% nước & năng lượng',
  image: 'https://images.unsplash.com/photo-1592861343717-3bf79ab44621?w=800&q=80',
  summary: 'Giải pháp tưới bù áp hàng đầu cho địa hình đốc, đảm bảo độ đồng đều 98% trên toàn diện tích.',
  expertNote: 'Đạt hiệu quả cao nhất khi kết hợp với bộ lọc đĩa Azud 120 mesh để bảo vệ vòi phun khỏi cặn bẩn.',
  specs: {
    pressure: '1.5 - 3.5 Bar',
    flow: '35 - 95 L/h',
    radius: '3.5 - 5.0 m',
    uniformity: '98%',
    connection: 'Ngậm ống 6mm / Ren 21mm'
  },
  documents: [
    { title: 'Catalogue Kỹ Thuật (PDF)', size: '2.4 MB' },
    { title: 'Sơ Đồ Lắp Đặt Hệ Thống', size: '1.8 MB' },
    { title: 'Quy Trình Vận Hành SOP', size: '0.9 MB' }
  ]
};

const RELATED = [
  { id: 'ldpe-16', name: 'Ống LDPE 16mm Dekko', price: 'Liên hệ', img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80' },
  { id: 'filter-azud', name: 'Bộ lọc đĩa Azud 2"', price: 'Liên hệ', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { profile } = useFarmerProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic O2O: Get 2 dealers in user province
  const matchedDealers = useMemo(() => {
    const province = profile.provinceName || 'Đồng Nai';
    const matched = dealersData.filter(d => d.province === province && !d.isHeadOffice);
    return matched.length >= 2 ? matched.slice(0, 2) : dealersData.filter(d => d.isHeadOffice || d.type === 'branch').slice(0, 2);
  }, [profile.provinceName]);

  const dealerToContact = matchedDealers[0];

  const handleShare = () => {
    toast.info('Đã sao chép liên kết chia sẻ kỹ thuật sang Zalo.');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SeoMeta 
        title={`${PRODUCT_DATA.name} | Thông Số Kỹ Thuật & Giải Pháp Tưới`}
        description={PRODUCT_DATA.summary}
      />

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white p-8 shadow-xl shadow-slate-200/50 aspect-square flex items-center justify-center group overflow-hidden">
              <img 
                src={PRODUCT_DATA.image} 
                alt={PRODUCT_DATA.name} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <Badge className="bg-slate-900 text-white border-0 px-3 py-1 text-xs">{PRODUCT_DATA.brand}</Badge>
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 border px-3 py-1 text-xs">🌐 {PRODUCT_DATA.country}</Badge>
              </div>
            </div>
          </motion.div>

          {/* Right: Summary & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <Badge className="w-fit bg-green-100 text-green-700 hover:bg-green-100 border-0 mb-4 px-3 py-1 font-bold">
              ✨ {PRODUCT_DATA.efficiency}
            </Badge>
            <h1 className="text-4xl font-bold text-slate-900 font-display mb-4 leading-tight">
              {PRODUCT_DATA.name}
            </h1>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              {PRODUCT_DATA.summary}
            </p>

            <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-6 mb-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái</p>
                  <p className="text-sm font-bold text-slate-800">
                    Sẵn hàng tại các đại lý khu vực <span className="text-[#2D5A27]">{profile.provinceName || 'Đồng Nai'}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 h-14 rounded-2xl bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-base shadow-lg shadow-orange-500/20"
                >
                  📍 Nhận Báo Giá & Tư Vấn Kỹ Thuật
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleShare}
                  className="w-14 h-14 rounded-2xl border-slate-200 text-slate-500 hover:bg-white"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DETAILS TABS */}
        <Tabs defaultValue="specs" className="mb-20">
          <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start gap-8 rounded-none h-12 mb-8 px-0">
            <TabsTrigger value="specs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2D5A27] data-[state=active]:text-[#2D5A27] rounded-none px-0 font-bold text-slate-400">
              <BarChart3 className="w-4 h-4 mr-2" /> Thông Số Khoa Học
            </TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2D5A27] data-[state=active]:text-[#2D5A27] rounded-none px-0 font-bold text-slate-400">
              <BookOpen className="w-4 h-4 mr-2" /> Tài Liệu & SOP
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specs">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="py-4 px-6 font-bold text-slate-600 uppercase text-xs tracking-widest">Đặc tính kỹ thuật</th>
                        <th className="py-4 px-6 font-bold text-slate-600 uppercase text-xs tracking-widest text-right">Thông số / Đơn vị</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-4 px-6 text-slate-700 font-medium">Áp suất vận hành</td>
                        <td className="py-4 px-6 text-slate-900 font-bold text-right">{PRODUCT_DATA.specs.pressure}</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 text-slate-700 font-medium">Lưu lượng chuẩn</td>
                        <td className="py-4 px-6 text-slate-900 font-bold text-right">{PRODUCT_DATA.specs.flow}</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 text-slate-700 font-medium">Bán kính tưới thực tế</td>
                        <td className="py-4 px-6 text-slate-900 font-bold text-right">{PRODUCT_DATA.specs.radius}</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 text-slate-700 font-medium">Độ đồng đều thủy lực (CU)</td>
                        <td className="py-4 px-6 text-[#2D5A27] font-bold text-right">{PRODUCT_DATA.specs.uniformity}</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 text-slate-700 font-medium">Kiểu kết nối vật lý</td>
                        <td className="py-4 px-6 text-slate-900 font-bold text-right">{PRODUCT_DATA.specs.connection}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-6">
                <Card className="bg-[#2D5A27] text-white rounded-3xl border-0 p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <div className="flex gap-4 items-start relative z-10">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Lưu ý từ chuyên gia</h4>
                      <p className="text-sm text-green-100 mt-2 leading-relaxed">
                        {PRODUCT_DATA.expertNote}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="docs">
            <div className="grid md:grid-cols-3 gap-6">
              {PRODUCT_DATA.documents.map((doc, idx) => (
                <Card key={idx} className="bg-white border-slate-100 hover:border-blue-200 transition-all rounded-3xl group cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">{doc.title}</h4>
                    <p className="text-xs text-slate-400 mb-6">Định dạng PDF • {doc.size}</p>
                    <Button variant="outline" className="w-full rounded-xl border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                      <Download className="w-4 h-4 mr-2" /> Tải về ngay
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* O2O DEALER MATCHING */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-display">Hỗ Trợ Thi Công & Bảo Trì Tại Chỗ</h2>
              <p className="text-slate-500 mt-2">Dựa trên vị trí của bạn, chúng tôi đề xuất các đối tác kỹ thuật tin cậy nhất.</p>
            </div>
            <Link to="/dai-ly">
              <Button variant="link" className="text-[#2D5A27] font-bold p-0 flex items-center gap-2">
                Xem toàn bộ mạng lưới <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {matchedDealers.map((dealer, idx) => (
              <Card key={idx} className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                        <Store className="w-7 h-7 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800">{dealer.name}</h4>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {dealer.district}, {dealer.province}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">Chuyên gia tưới</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Dịch vụ đặc thù</p>
                      <p className="text-xs font-bold text-slate-700">Có thợ khảo sát tận rẫy</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Khoảng cách</p>
                      <p className="text-xs font-bold text-slate-700">~{Math.floor(Math.random() * 10 + 2)} km</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 rounded-xl bg-[#2D5A27] hover:bg-[#1f421b] text-white font-bold h-12">
                      <Phone className="w-4 h-4 mr-2" /> Hotline
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl border-slate-200 text-slate-600 h-12 font-bold">
                      <Navigation className="w-4 h-4 mr-2" /> Chỉ đường
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* UPSELL SECTION */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2D5A27] rounded-full blur-[120px] opacity-20 translate-x-1/4 translate-y-1/4" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold font-display mb-8">Sản phẩm thường dùng kèm</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {RELATED.map(item => (
                <div key={item.id} className="flex gap-6 items-center p-4 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                    <p className="text-orange-400 font-bold">{item.price}</p>
                    <Button variant="link" className="text-white p-0 h-auto font-bold mt-2 flex items-center group/btn">
                      Xem chi tiết <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DEALER CONTACT MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[2rem] p-0 overflow-hidden border-0">
          <div className="bg-[#2D5A27] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)]"></div>
            <DialogHeader className="relative z-10">
              <DialogTitle className="text-2xl font-bold font-display text-white">Kết nối Chuyên gia Khu vực</DialogTitle>
              <DialogDescription className="text-green-100 text-sm mt-2">
                Đại lý {dealerToContact?.name} sẽ trực tiếp hỗ trợ kỹ thuật và báo giá cho bạn.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Đối tác ủy quyền</p>
                  <p className="font-bold text-slate-800">{dealerToContact?.name}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full h-14 rounded-xl bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-lg">
                  <Phone className="w-5 h-5 mr-3" /> Gọi Báo Giá Ngay
                </Button>
                <Button variant="outline" className="w-full h-14 rounded-xl border-slate-200 text-slate-600 font-bold">
                  <MessageCircle className="w-5 h-5 mr-3 text-green-500" /> Nhắn Tin Zalo Tư Vấn
                </Button>
              </div>
              
              <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">
                Đảm bảo chính hãng & Bảo hành 2 năm
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
