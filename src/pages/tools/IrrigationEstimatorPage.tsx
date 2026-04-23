import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Calculator, Send, ArrowLeft, Layers, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cropsData, Crop } from '@/data/cropData';
import SeoMeta from '@/components/SeoMeta';

function CropSelect({ selected, onSelect }: { selected: Crop | null; onSelect: (c: Crop) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCrops = useMemo(() => {
    return cropsData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const grouped = useMemo(() => {
    return filteredCrops.reduce((acc, crop) => {
      if (!acc[crop.region]) acc[crop.region] = [];
      acc[crop.region].push(crop);
      return acc;
    }, {} as Record<string, Crop[]>);
  }, [filteredCrops]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open} 
          className="w-full justify-between h-14 text-base font-normal bg-white border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
        >
          {selected ? (
            <span className="flex items-center gap-3">
              <span className="text-2xl">{selected.icon}</span> 
              <span className="font-semibold text-foreground">{selected.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary/50" /> Nhấp để chọn cây trồng...
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] md:w-[400px] p-0 rounded-2xl shadow-2xl border-primary/20" align="center">
        <div className="p-3 border-b bg-gray-50/50 rounded-t-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Tìm tên cây trồng..." 
              className="pl-10 h-10 rounded-xl bg-white" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className="max-h-[350px] overflow-y-auto p-3 scrollbar-hide">
          {Object.entries(grouped).length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">Không tìm thấy cây trồng phù hợp.</p>
          )}
          {Object.entries(grouped).map(([region, crops]) => (
            <div key={region} className="mb-5 last:mb-0">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1 flex items-center gap-2">
                {region} <span className="h-px bg-border flex-1 ml-2"></span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {crops.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => {
                      onSelect(crop);
                      setOpen(false);
                      setSearch('');
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all active:scale-95 ${
                      selected?.id === crop.id 
                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm' 
                        : 'border-border hover:border-primary/40 bg-white text-foreground'
                    }`}
                  >
                    <span className="text-3xl mb-1.5 drop-shadow-sm">{crop.icon}</span>
                    <span className="text-center leading-tight text-xs">{crop.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function IrrigationEstimatorPage() {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [area, setArea] = useState<string>('');
  const [rowSpacing, setRowSpacing] = useState<string>('');
  const [plantSpacing, setPlantSpacing] = useState<string>('');
  
  const [result, setResult] = useState<{
    emitters: number;
    branchPipe: number;
    mainPipe: number;
    cropName: string;
    area: number;
  } | null>(null);

  const handleCropSelect = (crop: Crop) => {
    setSelectedCrop(crop);
    if (crop.placeholder_spacing) {
      const parts = crop.placeholder_spacing.split('x');
      if (parts.length === 2) {
        setRowSpacing(parts[0].trim());
        setPlantSpacing(parts[1].trim());
      }
    }
  };

  const calculateBOM = () => {
    const a = parseFloat(area);
    const r = parseFloat(rowSpacing);
    const p = parseFloat(plantSpacing);

    if (isNaN(a) || isNaN(r) || isNaN(p) || a <= 0 || r <= 0 || p <= 0) {
      alert("Vui lòng nhập đầy đủ diện tích và khoảng cách hợp lệ.");
      return;
    }

    // Công thức tính toán BOM
    const emitters = Math.ceil(a / (r * p));
    const branchPipe = Math.ceil((a / r) * 1.1);
    const mainPipe = Math.ceil(Math.sqrt(a) * 1.1);

    setResult({
      emitters,
      branchPipe,
      mainPipe,
      cropName: selectedCrop?.name || 'Cây trồng khác',
      area: a
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-6 md:pt-12">
      <SeoMeta title="Dự toán tưới - Nhà Bè Agri" description="Công cụ tính toán dự toán hệ thống tưới thông minh." />
      <div className="container max-w-md mx-auto relative overflow-hidden px-4 md:px-0">
        
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Calculator className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Dự Toán Tưới Nhanh</h1>
          <p className="text-sm text-muted-foreground mt-2">Tính toán số lượng vật tư chuẩn xác trong 1 nốt nhạc</p>
        </div>

        <div className="relative min-h-[460px]">
          {/* SmartBOMForm */}
          <Card className={`p-6 bg-white border-primary/10 shadow-xl shadow-black/5 rounded-3xl transition-all duration-500 absolute w-full ${result ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-10'}`}>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">1. Chọn cây trồng</Label>
                <CropSelect selected={selectedCrop} onSelect={handleCropSelect} />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">2. Diện tích canh tác (m²)</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="VD: 10000" 
                    value={area} 
                    onChange={(e) => setArea(e.target.value)} 
                    className="h-14 text-xl font-bold pr-16 bg-gray-50/50 border-gray-200"
                  />
                  <span className="absolute right-4 top-4 text-muted-foreground font-medium">m²</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Kh.cách hàng</Label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder="VD: 3" 
                      value={rowSpacing} 
                      onChange={(e) => setRowSpacing(e.target.value)} 
                      className="h-14 text-center text-xl font-bold bg-gray-50/50 border-gray-200"
                    />
                    <span className="absolute right-3 top-4 text-muted-foreground text-sm">m</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">Kh.cách cây</Label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder="VD: 3" 
                      value={plantSpacing} 
                      onChange={(e) => setPlantSpacing(e.target.value)} 
                      className="h-14 text-center text-xl font-bold bg-gray-50/50 border-gray-200"
                    />
                    <span className="absolute right-3 top-4 text-muted-foreground text-sm">m</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full h-14 mt-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 transition-transform active:scale-95"
                onClick={calculateBOM}
                disabled={!area || !rowSpacing || !plantSpacing}
              >
                <Calculator className="w-5 h-5 mr-2" /> Tính Toán Vật Tư
              </Button>
            </div>
          </Card>

          {/* Results Slide-up Overlay */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-0 z-20 w-full"
              >
                <Card className="h-full min-h-[460px] p-6 bg-white border-primary/20 shadow-2xl rounded-3xl flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2D5A27] to-[#8D6E63]" />
                  
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 pt-2">
                    <button onClick={() => setResult(null)} className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="font-extrabold text-xl text-primary">Phiếu Dự Toán</h2>
                    <div className="w-10" /> {/* Spacer */}
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-5 scrollbar-hide">
                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Loại cây</p>
                        <p className="text-xl font-black text-foreground">{result.cropName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Diện tích</p>
                        <p className="text-lg font-bold text-foreground">{result.area.toLocaleString('vi-VN')} m²</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h3 className="font-bold flex items-center gap-2 text-foreground"><Layers className="w-5 h-5 text-primary" /> Vật tư cơ bản cần chuẩn bị:</h3>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                        <span className="text-sm font-medium text-muted-foreground">Số lượng béc tưới</span>
                        <span className="font-black text-xl text-foreground">{result.emitters.toLocaleString('vi-VN')} <span className="text-sm font-medium text-muted-foreground">béc</span></span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                        <span className="text-sm font-medium text-muted-foreground">Chiều dài ống nhánh</span>
                        <span className="font-black text-xl text-foreground">{result.branchPipe.toLocaleString('vi-VN')} <span className="text-sm font-medium text-muted-foreground">mét</span></span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                        <span className="text-sm font-medium text-muted-foreground">Chiều dài ống chính</span>
                        <span className="font-black text-xl text-foreground">{result.mainPipe.toLocaleString('vi-VN')} <span className="text-sm font-medium text-muted-foreground">mét</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto">
                    <Button 
                      className="w-full h-14 bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-lg rounded-xl shadow-xl shadow-[#F57C00]/30 animate-pulse-soft transition-transform active:scale-95"
                    >
                      <Send className="w-5 h-5 mr-2" /> Chuyển Dự Toán Cho Đại Lý
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-4 font-medium">Đại lý gần nhất sẽ liên hệ báo giá chi tiết trong 30 phút</p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
