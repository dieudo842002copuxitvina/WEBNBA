import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, ArrowLeft, Send, AlertTriangle, CheckCircle2, Droplets, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SeoMeta from '@/components/SeoMeta';

export default function FertigationPage() {
  const [tankVolume, setTankVolume] = useState('');
  const [fertilizerKg, setFertilizerKg] = useState('');
  const [venturiFlow, setVenturiFlow] = useState('');
  
  const [result, setResult] = useState<{ time: number } | null>(null);

  const vol = parseFloat(tankVolume);
  const fert = parseFloat(fertilizerKg);
  const flow = parseFloat(venturiFlow);

  // Logic: Thể tích < 3 * Khối lượng -> Nguy cơ nghẹt béc
  const isWarning = !isNaN(vol) && !isNaN(fert) && vol > 0 && fert > 0 && (vol < fert * 3);
  const canCalculate = !isNaN(vol) && !isNaN(fert) && !isNaN(flow) && vol > 0 && fert > 0 && flow > 0 && !isWarning;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const time = Math.ceil((vol / flow) * 60);
    setResult({ time });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-6 md:pt-12">
      <SeoMeta title="Kỹ Sư Dinh Dưỡng - Châm Phân Thông Minh" description="Tính toán thời gian và dung lượng châm phân tự động qua Venturi." />
      <div className="container max-w-md mx-auto relative overflow-hidden px-4 md:px-0">
        
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/80 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/20">
            <Beaker className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Kỹ Sư Dinh Dưỡng</h1>
          <p className="text-sm text-muted-foreground mt-2">Tính toán quy trình châm phân chính xác</p>
        </div>

        <div className="relative min-h-[480px]">
          {/* SmartBOMForm */}
          <Card className={`p-6 bg-white border-secondary/10 shadow-xl shadow-black/5 rounded-3xl transition-all duration-500 absolute w-full ${result ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-10'}`}>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">1. Lượng phân bón cần tưới (Kg)</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="VD: 50" 
                    value={fertilizerKg} 
                    onChange={(e) => setFertilizerKg(e.target.value)} 
                    className={`h-14 text-xl font-bold pr-12 bg-gray-50/50 ${isWarning ? 'border-destructive focus-visible:ring-destructive' : 'border-gray-200'}`}
                  />
                  <span className="absolute right-4 top-4 text-muted-foreground font-medium">kg</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">2. Dung tích bồn pha (Lít)</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="VD: 200" 
                    value={tankVolume} 
                    onChange={(e) => setTankVolume(e.target.value)} 
                    className={`h-14 text-xl font-bold pr-12 bg-gray-50/50 ${isWarning ? 'border-destructive focus-visible:ring-destructive' : 'border-gray-200'}`}
                  />
                  <span className="absolute right-4 top-4 text-muted-foreground font-medium">Lít</span>
                </div>
                <AnimatePresence>
                  {isWarning && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-semibold text-destructive flex items-start gap-1.5 mt-1.5"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Cảnh báo: Tỉ lệ pha quá đặc (Dung tích bồn phải ≥ {fert * 3}L). Tránh gây nghẹt béc tưới!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">3. Lưu lượng bộ hút (Venturi)</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="VD: 150" 
                    value={venturiFlow} 
                    onChange={(e) => setVenturiFlow(e.target.value)} 
                    className="h-14 text-xl font-bold pr-20 bg-gray-50/50 border-gray-200"
                  />
                  <span className="absolute right-4 top-4 text-muted-foreground font-medium text-sm">Lít/Giờ</span>
                </div>
              </div>

              <Button 
                className="w-full h-14 mt-4 bg-secondary hover:bg-secondary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-secondary/30 transition-transform active:scale-95 disabled:opacity-50"
                onClick={handleCalculate}
                disabled={!canCalculate}
              >
                <Beaker className="w-5 h-5 mr-2" /> Tạo Quy Trình Châm Phân
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
                <Card className="h-full min-h-[480px] p-6 bg-white border-secondary/20 shadow-2xl rounded-3xl flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-[#8D6E63]" />
                  
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 pt-2">
                    <button onClick={() => setResult(null)} className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="font-extrabold text-xl text-secondary">Quy Trình Châm Phân (SOP)</h2>
                    <div className="w-10" />
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0 mt-1">1</div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="font-bold flex items-center gap-2 mb-1"><Droplets className="w-4 h-4 text-blue-500"/> Tưới ẩm đất</h4>
                        <p className="text-sm text-muted-foreground">Chạy hệ thống tưới bằng nước sạch trong vòng <strong className="text-foreground">15 phút</strong> để làm ẩm vùng rễ.</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold shrink-0 mt-1">2</div>
                      <div className="flex-1 bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                        <h4 className="font-bold flex items-center gap-2 mb-1"><Beaker className="w-4 h-4 text-secondary"/> Châm phân bón</h4>
                        <p className="text-sm text-muted-foreground mb-2">Mở van Venturi hút hỗn hợp phân từ bồn.</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-secondary/20 text-secondary font-bold shadow-sm">
                          <Timer className="w-4 h-4"/> Rút cạn bồn trong {result.time} phút
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold shrink-0 mt-1">3</div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="font-bold flex items-center gap-2 mb-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Xả sạch đường ống</h4>
                        <p className="text-sm text-muted-foreground">Đóng van Venturi, tiếp tục tưới nước sạch trong <strong className="text-foreground">15 phút</strong> để xả phân dư trong ống.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto">
                    <Button 
                      className="w-full h-14 bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-lg rounded-xl shadow-xl shadow-[#F57C00]/30 animate-pulse-soft transition-transform active:scale-95"
                    >
                      <Send className="w-5 h-5 mr-2" /> Gửi Toa Này Báo Giá Phân Bón
                    </Button>
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
