import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, ArrowLeft, Send, AlertTriangle, CheckCircle2, Timer, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import SeoMeta from '@/components/SeoMeta';

export default function FertigationPage() {
  const [tankVolume, setTankVolume] = useState('');
  const [fertilizerWeight, setFertilizerWeight] = useState('');
  const [venturiFlow, setVenturiFlow] = useState('');
  const [isMixing, setIsMixing] = useState(false);
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [injectionTime, setInjectionTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const calculateFertigation = () => {
    setError(null);
    const vol = parseFloat(tankVolume);
    const fert = parseFloat(fertilizerWeight);
    const flow = parseFloat(venturiFlow);

    if (isNaN(vol) || isNaN(fert) || isNaN(flow) || vol <= 0 || fert <= 0 || flow <= 0) {
      setError('Vui lòng nhập đầy đủ và hợp lệ các thông số.');
      return;
    }

    // Kiểm tra an toàn 1 (Độ hòa tan)
    if (vol < fert * 3) {
      setError('Pha quá đặc (Cần tối thiểu 3L nước/1kg phân). Nguy cơ nghẹt béc!');
      return;
    }

    // Phân tích thành công
    const time = Math.ceil((vol / flow) * 60);
    setInjectionTime(time);
    setIsCalculated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-6 md:pt-12">
      <SeoMeta title="Kỹ Sư Dinh Dưỡng - Nhà Bè Agri" description="Tính toán tỷ lệ pha phân bón chuẩn xác cho hệ thống châm phân." />
      
      <div className="container max-w-md mx-auto relative px-4 md:px-0">
        
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Beaker className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Kỹ Sư Dinh Dưỡng</h1>
          <p className="text-sm text-muted-foreground mt-2">Phân tích công thức & Lên lịch châm phân</p>
        </div>

        <div className="relative min-h-[520px]">
          {/* FORM NHẬP LIỆU */}
          <AnimatePresence mode="wait">
            {!isCalculated ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute w-full z-10"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-xl border-blue-100 shadow-xl shadow-black/5 rounded-3xl">
                  <div className="space-y-6">
                    
                    {/* Floating Label Input 1 */}
                    <div className="relative group">
                      <Input 
                        id="tank"
                        type="number" 
                        placeholder=" " 
                        value={tankVolume} 
                        onChange={(e) => { setTankVolume(e.target.value); setError(null); }} 
                        className={`h-14 pt-4 text-lg font-bold pr-12 peer focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl bg-gray-50/50 ${error && error.includes('Pha quá đặc') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
                      />
                      <label 
                        htmlFor="tank"
                        className="absolute text-[13px] text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none font-medium"
                      >
                        1. Dung tích bồn pha (Lít)
                      </label>
                      <span className="absolute right-4 top-4 text-muted-foreground font-medium text-sm">Lít</span>
                    </div>

                    {/* Floating Label Input 2 */}
                    <div className="relative group">
                      <Input 
                        id="fert"
                        type="number" 
                        placeholder=" " 
                        value={fertilizerWeight} 
                        onChange={(e) => { setFertilizerWeight(e.target.value); setError(null); }} 
                        className={`h-14 pt-4 text-lg font-bold pr-12 peer focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl bg-gray-50/50 ${error && error.includes('Pha quá đặc') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
                      />
                      <label 
                        htmlFor="fert"
                        className="absolute text-[13px] text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none font-medium"
                      >
                        2. Lượng phân bón (Kg)
                      </label>
                      <span className="absolute right-4 top-4 text-muted-foreground font-medium text-sm">Kg</span>
                    </div>

                    {/* Cảnh báo pha quá đặc */}
                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs font-semibold text-red-500 flex items-start gap-1.5 mt-2 bg-red-50 p-3 rounded-lg border border-red-100"
                        >
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating Label Input 3 */}
                    <div className="relative group">
                      <Input 
                        id="venturi"
                        type="number" 
                        placeholder=" " 
                        value={venturiFlow} 
                        onChange={(e) => { setVenturiFlow(e.target.value); setError(null); }} 
                        className="h-14 pt-4 text-lg font-bold pr-20 peer focus-visible:ring-blue-500 focus-visible:border-blue-500 rounded-xl bg-gray-50/50 border-gray-200"
                      />
                      <label 
                        htmlFor="venturi"
                        className="absolute text-[13px] text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none font-medium"
                      >
                        3. Lưu lượng Venturi
                      </label>
                      <span className="absolute right-4 top-4 text-muted-foreground font-medium text-sm">Lít/Giờ</span>
                    </div>

                    {/* Checkbox Pha trộn */}
                    <div className="flex items-start space-x-3 p-1">
                      <Checkbox 
                        id="mixing" 
                        checked={isMixing} 
                        onCheckedChange={(checked) => setIsMixing(checked as boolean)} 
                        className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <label 
                        htmlFor="mixing" 
                        className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700"
                      >
                        Có đang pha trộn nhiều loại phân với nhau không?
                      </label>
                    </div>

                    {/* Cảnh báo pha trộn */}
                    <AnimatePresence>
                      {isMixing && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs font-semibold text-orange-700 flex items-start gap-2 bg-orange-50 p-3 rounded-xl border border-orange-200"
                        >
                          <Info className="w-5 h-5 shrink-0 mt-0.5 text-orange-500" />
                          <span>Lưu ý: Tuyệt đối không pha chung phân chứa Canxi với Lân (MAP/MKP) hoặc Sunfat vào cùng bồn để tránh kết tủa.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button 
                      className="w-full h-14 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
                      onClick={calculateFertigation}
                    >
                      <Beaker className="w-5 h-5 mr-2" /> Phân Tích Công Thức & Thời Gian
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              /* KẾT QUẢ SOP */
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute w-full z-20"
              >
                <Card className="p-6 bg-white border-blue-100 shadow-2xl rounded-3xl flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-emerald-400" />
                  
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 pt-2">
                    <button onClick={() => setIsCalculated(false)} className="px-3 py-1.5 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors flex items-center gap-1.5 text-sm font-medium">
                      <ArrowLeft className="w-4 h-4" /> Tính lại
                    </button>
                    <h2 className="font-extrabold text-lg text-blue-600 uppercase tracking-wide">Toa Thuốc Dinh Dưỡng</h2>
                  </div>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    
                    {/* Step 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        1
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900">Tưới ẩm đất</h4>
                          <Timer className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Chạy hệ thống bằng nước sạch để làm ẩm vùng rễ.</p>
                        <span className="inline-flex px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold">15 Phút</span>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Beaker className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-orange-50/50 p-4 rounded-xl border border-orange-100 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900">Mở van châm phân</h4>
                          <Timer className="w-4 h-4 text-orange-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Hệ thống sẽ hút cạn {tankVolume}L phân trong bồn.</p>
                        <span className="inline-flex px-2.5 py-1 rounded-md bg-orange-500 text-white text-xs font-bold shadow-sm">{injectionTime} Phút</span>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900">Xả đường ống</h4>
                          <Timer className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Tưới nước sạch xả phân dư trong ống, tránh nghẹt béc.</p>
                        <span className="inline-flex px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-bold">15 Phút</span>
                      </div>
                    </div>

                  </div>

                  <div className="pt-8 mt-4 border-t border-gray-100">
                    <Button 
                      className="w-full h-14 bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-lg rounded-xl shadow-xl shadow-[#F57C00]/30 transition-transform active:scale-95"
                    >
                      <Send className="w-5 h-5 mr-2" /> Chuyển Toa Này Cho Đại Lý Báo Giá
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-3 leading-relaxed">
                      Đại lý sẽ liên hệ tư vấn dòng phân hòa tan phù hợp hệ thống tưới.
                    </p>
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
