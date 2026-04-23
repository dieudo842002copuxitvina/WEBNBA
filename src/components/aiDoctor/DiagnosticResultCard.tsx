import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Send, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { DiagnosticResult } from '@/hooks/useAICropDiagnostic';
import { submitGeneralLead } from '@/lib/supabaseQueries';
import { cn } from '@/lib/utils';

interface DiagnosticResultProps {
  result: DiagnosticResult;
  onReset: () => void;
}

export function DiagnosticResultCard({ result, onReset }: DiagnosticResultProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const handleSendToDealers = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error('Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }

    setIsSubmitting(true);
    try {
      const treatmentDetails = `
        Bệnh: ${result.diseaseName}
        Độ tin cậy: ${result.confidence}%
        Liệu pháp: ${result.treatment}
        Sản phẩm đề xuất: ${result.suggestedProducts.map((p) => p.name).join(', ')}
      `;

      await submitGeneralLead({
        customer_name: 'Nông dân',
        customer_phone: phoneNumber,
        message: `Yêu cầu toa thuốc từ Bác Sĩ AI: ${treatmentDetails}`,
        source: 'ai_crop_diagnosis',
      });

      toast.success('Toa thuốc đã được gửi cho đại lý gần nhất!', {
        description: 'Đại lý sẽ liên hệ bạn trong vòng 24h.',
      });

      setModalOpen(false);
      setPhoneNumber('');
      onReset();
    } catch (err) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="space-y-5"
      >
        {/* Diagnosis Header */}
        <Card className="overflow-hidden border-white/70 bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-2xl backdrop-blur-xl">
          <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2D5A27]/20 to-transparent pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2D5A27]/30 bg-[#2D5A27]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2D5A27]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Phân Tích Hoàn Thành
                </div>
                <div>
                  <CardTitle className="font-display text-2xl md:text-3xl text-white mb-2">
                    {result.diseaseName}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-sm leading-relaxed">
                    {result.description}
                  </CardDescription>
                </div>
              </div>

              {/* Confidence Badge */}
              <div className="shrink-0 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 px-4 py-3 text-center min-w-[100px]">
                <p className="text-xs font-bold text-green-300 uppercase tracking-wider mb-1">
                  Độ Chính Xác
                </p>
                <p className="text-3xl font-black text-green-400">{result.confidence}%</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            {/* Treatment Prescription */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-400" />
                <h3 className="font-bold text-white text-lg">💊 Toa Thuốc Đặc Trị</h3>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-orange-500/15 to-orange-600/10 border border-orange-500/30 p-4">
                <p className="text-sm leading-relaxed text-slate-100">{result.treatment}</p>
              </div>
            </div>

            {/* Prevention Tips */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">🛡️ Biện Pháp Phòng Ngừa</h3>
              <div className="space-y-2">
                {result.preventionTips.map((tip, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      onClick={() =>
                        setExpandedTip(expandedTip === idx ? null : idx)
                      }
                      className="w-full text-left rounded-lg bg-slate-800/50 hover:bg-slate-800/70 border border-white/10 p-3 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-slate-200 flex-1">
                          ✓ {tip}
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-slate-400 transition-transform duration-200',
                            expandedTip === idx && 'rotate-180'
                          )}
                        />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggested Products */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg">🛒 Sản Phẩm Đề Xuất</h3>
              <div className="grid gap-2">
                {result.suggestedProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-lg bg-slate-800/40 border border-slate-700/50 p-3 hover:bg-slate-800/60 transition-colors"
                  >
                    <p className="font-semibold text-slate-100 text-sm mb-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Hoạt chất: {product.activeIngredient}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="h-12 rounded-xl bg-slate-800/50 border-white/20 text-white hover:bg-slate-800/70"
          >
            🔄 Phân Tích Ảnh Khác
          </Button>

          <Button
            onClick={() => setModalOpen(true)}
            className="h-12 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#1a3716] text-white font-bold hover:opacity-90 gap-2"
          >
            <Send className="h-4 w-4" />
            Gửi Toa Cho Đại Lý
          </Button>
        </div>

        {/* Info */}
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-3 text-center">
          <p className="text-xs text-blue-300">
            💡 Kết quả này là phân tích AI hỗ trợ. Vui lòng tư vấn với chuyên gia nông nghiệp địa phương để có hướng xử lý tối ưu nhất.
          </p>
        </div>
      </motion.div>

      {/* O2O Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[90%] max-w-md rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Send className="h-5 w-5 text-[#2D5A27]" />
              Gửi Toa Cho Đại Lý
            </DialogTitle>
            <DialogDescription className="text-slate-300 mt-2">
              Nhập số điện thoại của bạn. Đại lý gần nhất sẽ liên hệ trong 24h để hỗ trợ xử lý.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <div className="relative group">
              <Input
                id="dealer-phone"
                type="tel"
                placeholder=" "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength="20"
                className="h-12 pt-4 peer focus-visible:ring-[#2D5A27] focus-visible:border-[#2D5A27] rounded-xl bg-slate-800 border-white/20 text-white placeholder:text-transparent"
              />
              <Label
                htmlFor="dealer-phone"
                className="absolute text-[12px] text-slate-400 duration-200 transform -translate-y-2.5 scale-75 top-2 z-10 origin-[0] left-3 peer-focus:text-[#2D5A27] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 pointer-events-none"
              >
                Số điện thoại
              </Label>
            </div>

            {/* Info */}
            <div className="rounded-lg bg-[#2D5A27]/10 border border-[#2D5A27]/30 p-3">
              <p className="text-xs text-slate-300 flex items-start gap-2">
                <span className="shrink-0 mt-0.5">📍</span>
                <span>
                  Hệ thống sẽ tìm đại lý gần nhất với vị trí của bạn và gửi toa này.
                </span>
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-lg h-11 bg-slate-800/50 border-white/20 text-white hover:bg-slate-800/70"
              onClick={() => setModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              disabled={isSubmitting || phoneNumber.length < 9}
              className="flex-1 rounded-lg h-11 bg-gradient-to-r from-[#2D5A27] to-[#1a3716] text-white hover:opacity-90 font-bold gap-2"
              onClick={handleSendToDealers}
            >
              <ShoppingCart className="h-4 w-4" />
              {isSubmitting ? 'Đang gửi...' : 'Gửi Ngay'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
