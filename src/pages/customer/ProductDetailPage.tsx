import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MapPin, MessageCircle, FileText, Download, ShieldCheck, Phone, Navigation, ArrowRight, Store, BookOpen, BarChart3, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';
import { dealersData } from '@/data/dealersData';

// MOCK DATA
const productData = {
  id: 'rivulis-s2000',
  name: 'Béc tưới bù áp Rivulis S2000',
  category: 'Tưới Phun Mưa',
  brand: 'Rivulis',
  country: 'Israel',
  image: 'https://images.unsplash.com/photo-1592861343717-3bf79ab44621?w=800&q=80',
  features: [
    'Bù áp cực tốt (PC) giúp lưu lượng đồng đều trên mọi địa hình',
    'Chống côn trùng xâm nhập siêu việt',
    'Nhựa nguyên sinh UV, độ bền ngoài trời trên 10 năm',
    'Bảo hành chính hãng 2 năm'
  ],
  specsData: {
    operatingPressure: '1.0 - 3.0',
    radius: '3.5 - 4.5',
    flowRate: '35, 53, 70, 95',
    connection: 'Khởi thủy 6mm hoặc ren 21mm'
    // missing nozzleSize intentionally to test Smart Hide
  }
};

const relatedProducts = [
  { id: 'ong-ldpe', name: 'Ống dẫn nước LDPE 16mm Dekko', img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80' },
  { id: 'ez-flo', name: 'Thiết bị châm phân Ez Flo', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' }
];

const categorySpecsMap = {
  'TƯỚI PHUN MƯA': [
    { key: 'operatingPressure', label: 'Áp suất hoạt động', unit: 'Bar' },
    { key: 'radius', label: 'Bán kính tưới', unit: 'm' },
    { key: 'flowRate', label: 'Lưu lượng', unit: 'l/h' },
    { key: 'nozzleSize', label: 'Kích thước họng phun', unit: 'mm' },
    { key: 'connection', label: 'Kiểu kết nối' },
  ],
  'MÁY NÔNG NGHIỆP': [
    { key: 'sprayCapacity', label: 'Tải trọng bình phun', unit: 'Lít' },
    { key: 'spreadCapacity', label: 'Tải trọng bình rải', unit: 'kg' },
    { key: 'flightTime', label: 'Thời gian bay', unit: 'phút' },
    { key: 'radar', label: 'Hệ thống Radar' },
    { key: 'efficiency', label: 'Hiệu suất làm việc', unit: 'ha/giờ' },
  ],
  'DINH DƯỠNG CÂY TRỒNG': [
    { key: 'composition', label: 'Thành phần' },
    { key: 'solubility', label: 'Độ hòa tan', unit: '%' },
    { key: 'packaging', label: 'Quy cách đóng gói', unit: 'kg/bao' },
    { key: 'mainUse', label: 'Công dụng chính' },
    { key: 'dosage', label: 'Liều lượng khuyến cáo' },
  ],
  'ỐNG DẪN NƯỚC': [
    { key: 'outerDiameter', label: 'Đường kính ngoài', unit: 'mm' },
    { key: 'thickness', label: 'Độ dày thành ống', unit: 'mm' },
    { key: 'pressureRating', label: 'Áp suất chịu tải', unit: 'PN' },
    { key: 'material', label: 'Chất liệu' },
    { key: 'rollLength', label: 'Chiều dài cuộn', unit: 'm' },
  ],
  'BỘ TRUNG TÂM': [
    { key: 'maxFlow', label: 'Lưu lượng tối đa', unit: 'm³/h' },
    { key: 'filterType', label: 'Kiểu lọc' },
    { key: 'meshSize', label: 'Kích thước lưới lọc' },
    { key: 'tankCapacity', label: 'Dung tích bình chứa', unit: 'Lít' },
  ],
};

function ProductSpecsTable({ category, data }: { category: string, data: any }) {
  // Normalize category match
  const catKey = Object.keys(categorySpecsMap).find(k => category.toUpperCase().includes(k)) || 'TƯỚI PHUN MƯA';
  const specFields = categorySpecsMap[catKey as keyof typeof categorySpecsMap];

  const renderSpecs = specFields.map(field => {
    const rawValue = data[field.key];
    if (!rawValue) return null; // Smart Hide if data is missing
    
    // Auto append unit if not present
    const hasUnit = field.unit ? String(rawValue).toLowerCase().includes(field.unit.toLowerCase()) : true;
    const finalValue = hasUnit ? rawValue : `${rawValue} ${field.unit}`;

    return (
      <tr key={field.key} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
        <td className="py-4 px-6 font-medium bg-slate-50/50 w-1/2 text-slate-600 border-r border-slate-50">{field.label}</td>
        <td className="py-4 px-6 text-slate-800 text-right">{finalValue}</td>
      </tr>
    );
  }).filter(Boolean);

  if (renderSpecs.length === 0) {
    return <div className="text-slate-500 italic p-4">Thông số đang được cập nhật.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm">
      <table className="w-full text-base">
        <tbody>
          {renderSpecs}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('desc');
  const { profile, isLoaded } = useFarmerProfile();
  
  const dealersSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDealers = () => {
    dealersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Geo-Matching Logic
  const nearbyDealers = useMemo(() => {
    const userProvince = profile.provinceName || 'Đồng Nai'; // Fallback for testing
    let matched = dealersData.filter(d => d.province === userProvince && !d.isHeadOffice);
    
    if (matched.length === 0) {
      // Fallback to HQ
      const hq = dealersData.find(d => d.isHeadOffice);
      return hq ? [{ ...hq, distance: 'Ship toàn quốc' }] : [];
    }

    return matched.slice(0, 3).map(d => ({
      ...d,
      distance: `${(Math.random() * 15 + 2).toFixed(1)} km` // Mock distance
    }));
  }, [profile.provinceName]);

  return (
    <div className="min-h-screen bg-slate-50 pt-6 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#2D5A27]">Trang chủ</Link>
          <span className="text-slate-300">/</span>
          <Link to="/san-pham" className="hover:text-[#2D5A27]">Sản phẩm</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400">{productData.category}</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#2D5A27] font-semibold truncate">{productData.name}</span>
        </nav>

        {/* 2-Column Product Intro */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Left Column: Image & Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/40 aspect-square flex items-center justify-center overflow-hidden group">
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <Badge className="bg-slate-800 text-white hover:bg-slate-900 border-0 px-3 py-1 shadow-md text-sm">
                  {productData.brand}
                </Badge>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-1 shadow-sm text-sm">
                  🌐 {productData.country}
                </Badge>
              </div>
              <img 
                src={productData.image} 
                alt={productData.name} 
                className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 origin-center"
              />
            </div>
          </motion.div>

          {/* Right Column: Lead Conversion */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 flex flex-col"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/40 flex-1 flex flex-col">
              <div className="mb-2">
                <Badge className="text-[#2D5A27] bg-green-50 hover:bg-green-100 border-0">{productData.category}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-display leading-tight mb-6">
                {productData.name}
              </h1>

              {/* Highlight Features */}
              <div className="space-y-3 mb-8">
                {productData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#2D5A27]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#2D5A27]" />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price Mask (O2O Strategy) */}
              <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 mb-8">
                <p className="text-orange-800 font-semibold text-lg">Giá: Liên hệ đại lý gần nhất để nhận báo giá theo khu vực.</p>
              </div>

              {/* CTA Group */}
              <div className="space-y-4 mt-auto">
                <Button onClick={scrollToDealers} className="w-full h-14 bg-[#F57C00] hover:bg-[#E65100] text-white rounded-2xl text-lg font-bold shadow-lg shadow-orange-500/25 transition-all">
                  <MapPin className="w-5 h-5 mr-2" /> Hỏi Giá & Tìm Đại Lý Có Hàng
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deep Content Tabs */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 p-4 md:p-8 mb-12">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b border-slate-100 rounded-none bg-transparent h-auto p-0 mb-8 space-x-6 overflow-x-auto">
              <TabsTrigger value="desc" className="data-[state=active]:border-b-2 data-[state=active]:border-[#2D5A27] data-[state=active]:text-[#2D5A27] data-[state=active]:bg-transparent rounded-none px-0 pb-4 text-slate-500 text-base font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Mô tả giải pháp
              </TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:border-b-2 data-[state=active]:border-[#2D5A27] data-[state=active]:text-[#2D5A27] data-[state=active]:bg-transparent rounded-none px-0 pb-4 text-slate-500 text-base font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Thông số kỹ thuật
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:border-b-2 data-[state=active]:border-[#2D5A27] data-[state=active]:text-[#2D5A27] data-[state=active]:bg-transparent rounded-none px-0 pb-4 text-slate-500 text-base font-semibold flex items-center gap-2">
                <Inbox className="w-4 h-4" /> Tài liệu & Catalogue
              </TabsTrigger>
            </TabsList>

            <TabsContent value="desc" className="text-slate-600 leading-relaxed space-y-4 text-lg">
              <p>Sản phẩm phù hợp cho địa hình dốc tại Tây Nguyên và các vùng chuyên canh cây ăn trái lâu năm.</p>
              <p>Béc tưới bù áp Rivulis S2000 là giải pháp hoàn hảo giúp lượng nước phun ra đồng đều tại mọi vị trí, bất kể sự chênh lệch độ cao địa hình. Cơ chế màng silicone cao cấp tự động điều tiết áp suất, giúp tiết kiệm nước và tối ưu hóa hệ thống máy bơm.</p>
            </TabsContent>

            <TabsContent value="specs">
              <ProductSpecsTable category={productData.category} data={productData.specsData} />
            </TabsContent>

            <TabsContent value="docs">
              <div className="flex items-center justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">HDSD_Rivulis_S2000.pdf</h4>
                    <p className="text-sm text-slate-500">2.4 MB • File hướng dẫn lắp đặt (SOP)</p>
                  </div>
                </div>
                <Button className="bg-[#2D5A27] hover:bg-[#1f421b] text-white rounded-xl shadow-md">
                  <Download className="w-4 h-4 mr-2" /> Tải về máy
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* O2O Section: Geo-Matching Dealers */}
        <div ref={dealersSectionRef} className="mb-12 scroll-mt-24">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Store className="w-6 h-6 text-[#F57C00]" /> Hệ thống phân phối gần bạn
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyDealers.map(dealer => (
              <Card key={dealer.id} className="border-white/40 shadow-sm hover:shadow-md transition-shadow rounded-3xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1">{dealer.name}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> 
                        {dealer.isHeadOffice ? 'Tổng kho trung tâm' : `Cách bạn ~${dealer.distance}`}
                      </p>
                    </div>
                    {dealer.isHeadOffice && <ShieldCheck className="w-6 h-6 text-amber-500" />}
                  </div>
                  <p className="text-sm text-slate-600 mb-6 line-clamp-2 min-h-[40px]">{dealer.address}, {dealer.district}, {dealer.province}</p>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-[#2D5A27] hover:bg-[#1f421b] text-white rounded-xl shadow-md font-semibold">
                      <Phone className="w-4 h-4 mr-2" /> Gọi ngay
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl font-semibold">
                      <Navigation className="w-4 h-4 mr-2" /> Chỉ đường
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upsell: Related Products */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Sản phẩm bổ trợ khuyên dùng</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(prod => (
              <Link to={`/san-pham/${prod.id}`} key={prod.id}>
                <Card className="border-white/40 shadow-sm hover:shadow-md hover:border-[#2D5A27]/30 transition-all rounded-3xl overflow-hidden group h-full bg-white/80 backdrop-blur-md">
                  <div className="aspect-square bg-white p-4 flex items-center justify-center border-b border-slate-50">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-4 md:p-5">
                    <h4 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 group-hover:text-[#2D5A27] transition-colors">{prod.name}</h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
