import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Send, Info, Eye, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import SeoMeta from '@/components/SeoMeta';

const mockProducts = [
  { id: 1, name: "Súng tưới Ducar Jet35T", category: "Tưới Phun Mưa", brand: "Ducar", specs: "Bán kính 20-35m, Lưu lượng 10-30 m3/h", image: "https://images.unsplash.com/photo-1563223771-550bc7bc8059?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Béc tưới Rivulis S2000 PC", category: "Tưới Phun Mưa", brand: "Rivulis", specs: "Bù áp chuẩn, Lưu lượng 24-95 L/h", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Drone DJI Agras T50", category: "Máy Nông Nghiệp", brand: "DJI", specs: "Tải trọng 40kg, Phun 16ha/giờ", image: "https://images.unsplash.com/photo-1521405924368-64c5b828f0a7?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Phân bón NPK 20-20-20", category: "Dinh Dưỡng", brand: "Cà Mau", specs: "Tan hoàn toàn 100%, bổ sung TE", image: "https://images.unsplash.com/photo-1628183180295-d226a27ce538?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Thiết bị châm phân Ez Flo", category: "Bộ Trung Tâm", brand: "Ez Flo", specs: "Dung tích 10L-100L, Áp suất tối đa 8 bar", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Lọc đĩa Azud AGL", category: "Bộ Trung Tâm", brand: "Azud", specs: "Màng lọc 130 micron, Lưu lượng 25m3/h", image: "https://images.unsplash.com/photo-1589923188900-85dae5243404?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Ống LDPE 16mm Dekko", category: "Ống Dẫn", brand: "Dekko", specs: "Nhựa nguyên sinh 100%, Dày 1.2mm", image: "https://images.unsplash.com/photo-1542361345-89ce52fa070e?auto=format&fit=crop&w=400&q=80" }
];

const categories = ["Tất cả", "Tưới Phun Mưa", "Máy Nông Nghiệp", "Dinh Dưỡng", "Bộ Trung Tâm", "Ống Dẫn"];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const regionMock = "Tây Nguyên"; // Có thể lấy từ geolocation hoặc user profile

  const filteredProducts = mockProducts.filter(p => 
    (activeTab === "Tất cả" || p.category === activeTab) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenLead = (product: any) => {
    setSelectedProduct(product);
    setLeadModalOpen(true);
    setIsSuccess(false);
    setPhone("");
  };

  const handleOpenInfo = (product: any) => {
    setSelectedProduct(product);
    setInfoModalOpen(true);
  };

  const handleSubmitLead = () => {
    if (!phone || phone.length < 9) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans relative">
      <SeoMeta title="Danh Mục Sản Phẩm O2O - Nhà Bè Agri" description="Khám phá danh mục vật tư nông nghiệp công nghệ cao từ Nhà Bè Agri." />

      {/* Header & Search */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-16 z-40">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800">Vật Tư & Thiết Bị</h1>
              <p className="text-sm text-slate-500 mt-1">Sản phẩm chính hãng, bảo hành trọn đời tại vườn.</p>
            </div>
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input 
                type="text" 
                placeholder="Tìm kiếm thiết bị, thương hiệu..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10 rounded-xl bg-slate-100 border-transparent focus-visible:ring-[#2D5A27] focus-visible:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Navigation Tabs (Horizontal Scroll on Mobile) */}
          <div className="mt-6 flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === cat 
                  ? 'bg-[#2D5A27] text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 border border-white/50 shadow-sm">
                    {product.brand}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-bold text-slate-800 text-base leading-tight mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1.5 rounded-md mb-auto line-clamp-2">{product.specs}</p>
                  
                  <div className="mt-5 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 font-bold h-11"
                      onClick={() => handleOpenInfo(product)}
                    >
                      <Info className="w-4 h-4 mr-2" /> Thông số kỹ thuật
                    </Button>
                    <Button 
                      className="w-full rounded-xl bg-[#F57C00] hover:bg-[#E65100] text-white font-bold shadow-md shadow-[#F57C00]/20 h-11 transition-transform active:scale-95"
                      onClick={() => handleOpenLead(product)}
                    >
                      <MapPin className="w-4 h-4 mr-2" /> Hỏi giá & Đại lý
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Không tìm thấy sản phẩm nào phù hợp.</p>
          </div>
        )}
      </div>

      {/* Retention Block: Hot in Region */}
      <div className="fixed bottom-6 right-6 z-30 hidden md:block animate-fade-in-up">
        <Card className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl p-4 rounded-2xl w-72 flex gap-4 items-center cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">Hot tại {regionMock}</p>
            <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight mt-0.5">Ống LDPE 16mm Dekko đang được rẫy tiêu mua nhiều nhất tuần này.</p>
          </div>
        </Card>
      </div>

      {/* Info Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Thương hiệu: <strong className="text-slate-800">{selectedProduct?.brand}</strong> | Danh mục: {selectedProduct?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4">
              <img src={selectedProduct?.image} alt={selectedProduct?.name} className="w-full h-full object-cover" />
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <h4 className="text-sm font-bold text-blue-800 mb-2">Đặc tính kỹ thuật cốt lõi:</h4>
              <p className="text-sm text-blue-700 font-medium">{selectedProduct?.specs}</p>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full rounded-xl bg-slate-800 text-white" onClick={() => setInfoModalOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lead Generation Modal (O2O) */}
      <Dialog open={leadModalOpen} onOpenChange={setLeadModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F57C00] to-orange-400" />
          <DialogHeader className="pt-2">
            <DialogTitle className="text-xl font-display font-extrabold text-slate-800">
              Nhận báo giá O2O
            </DialogTitle>
          </DialogHeader>
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="py-4">
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-5">
                    <p className="text-sm text-orange-800 leading-relaxed">
                      Sản phẩm <strong className="font-bold">{selectedProduct?.name}</strong> hiện có sẵn tại các đại lý khu vực <strong className="font-bold">{regionMock}</strong>.
                    </p>
                    <p className="text-sm text-orange-800 leading-relaxed mt-2">
                      Bạn có muốn chúng tôi gửi báo giá và danh sách đại lý qua Zalo không?
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Số điện thoại Zalo của bạn:</label>
                    <Input 
                      type="tel" 
                      placeholder="09xx xxx xxx" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-[#F57C00] text-lg font-medium"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-2">
                  <Button 
                    disabled={isSubmitting || phone.length < 9}
                    className="w-full h-12 rounded-xl bg-[#F57C00] hover:bg-[#E65100] text-white font-bold shadow-lg shadow-[#F57C00]/30 transition-transform active:scale-95"
                    onClick={handleSubmitLead}
                  >
                    {isSubmitting ? 'Đang kết nối đại lý...' : <><Send className="w-4 h-4 mr-2" /> Gửi yêu cầu ngay</>}
                  </Button>
                </DialogFooter>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Đã nhận yêu cầu!</h3>
                <p className="text-slate-600 text-sm max-w-[250px] mx-auto">
                  Hệ thống đã thông báo cho đại lý tuyến {regionMock}. Báo giá sẽ được gửi qua Zalo cho bạn trong 5 phút.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-xl border-slate-200"
                  onClick={() => setLeadModalOpen(false)}
                >
                  Đóng cửa sổ
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

    </div>
  );
}
