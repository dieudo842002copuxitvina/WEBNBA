import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FertigationTimelineStep } from './FertigationTimelineStep';
import { cn } from '@/lib/utils';

interface FertigationReceiptProps {
  injectionTime: number | null;
  warningMessage: string | null;
  isSafe: boolean;
  tankVolume: number;
  fertilizerWeight: number;
  venturiFlow: number;
  onReset: () => void;
}

export function FertigationReceipt({
  injectionTime,
  warningMessage,
  isSafe,
  tankVolume,
  fertilizerWeight,
  venturiFlow,
  onReset,
}: FertigationReceiptProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      {warningMessage && !isSafe ? (
        // WARNING STATE - Red Alert
        <Card className="overflow-hidden border-red-300/50 bg-red-50/80 shadow-[0_24px_80px_-48px_rgba(239,68,68,0.3)] backdrop-blur-md">
          <CardContent className="p-6 md:p-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 pt-0.5">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  ⚠️ Cảnh Báo: Công Thức Không An Toàn
                </h3>
                <p className="text-sm text-red-800 leading-relaxed mb-4">
                  {warningMessage}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={onReset}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Chỉnh Sửa Thông Số
                  </Button>
                  <Button
                    onClick={() => navigate('/cong-cu')}
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                  >
                    Quay Lại Công Cụ
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // SUCCESS STATE - Receipt with Timeline
        <>
          <div className="space-y-5">
            {/* Summary Card */}
            <Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_24px_80px_-48px_rgba(245,124,0,0.3)] backdrop-blur-md">
              <CardHeader className="space-y-3 border-b border-white/60 bg-[linear-gradient(135deg,rgba(245,124,0,0.10),rgba(255,255,255,0.65),rgba(45,90,39,0.08))] pb-5">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F57C00] shadow-sm backdrop-blur-md">
                  ⚗️ Toa Thuốc Dinh Dưỡng
                </div>
                <div>
                  <CardTitle className="font-display text-2xl text-slate-950 md:text-[2rem]">
                    Công Thức Châm Phân Tối Ưu
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm text-slate-600">
                    Quy trình 3 bước an toàn với thời gian châm chính xác.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-5 md:p-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 text-center border border-blue-100">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      Dung Tích
                    </p>
                    <p className="text-xl font-bold text-blue-900">{tankVolume}</p>
                    <p className="text-[10px] text-blue-600">Lít</p>
                  </div>

                  <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50 p-3 text-center border border-orange-100">
                    <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">
                      Phân Bón
                    </p>
                    <p className="text-xl font-bold text-orange-900">{fertilizerWeight}</p>
                    <p className="text-[10px] text-orange-600">Kg</p>
                  </div>

                  <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 p-3 text-center border border-green-100">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">
                      Venturi
                    </p>
                    <p className="text-xl font-bold text-green-900">{venturiFlow}</p>
                    <p className="text-[10px] text-green-600">L/H</p>
                  </div>
                </div>

                {/* Main Result Box */}
                <div className="rounded-xl bg-gradient-to-r from-[#F57C00]/10 to-[#F57C00]/5 px-4 py-5 md:px-5 md:py-6 border border-[#F57C00]/20 mb-6">
                  <p className="text-[11px] font-bold text-[#F57C00] uppercase tracking-widest mb-2">
                    ⏱️ Thời Gian Châm Phân
                  </p>
                  <p className="text-4xl md:text-5xl font-black text-slate-900">
                    {injectionTime}{' '}
                    <span className="text-xl md:text-2xl font-bold text-slate-500 ml-2">
                      phút
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 mt-2">
                    Châm liên tục trong khoảng thời gian này để phân bón hòa tan đều đặn.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline - 3 Steps */}
            <Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_24px_80px_-48px_rgba(45,90,39,0.15)] backdrop-blur-md">
              <CardHeader className="border-b border-white/60 bg-[linear-gradient(135deg,rgba(45,90,39,0.10),rgba(255,255,255,0.65),rgba(245,124,0,0.08))] pb-5">
                <CardTitle className="text-lg text-slate-950 flex items-center gap-2">
                  📋 Quy Trình an Toàn (SOP)
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 md:p-6">
                <div className="space-y-2">
                  <FertigationTimelineStep
                    stepNumber={1}
                    icon="💧"
                    title="Tưới Nước Trong"
                    description="Làm ẩm vùng rễ, giãn nở lỗ mao dẫn. Quá trình này giúp đất thấm hút tốt hơn, chuẩn bị sẵn sàng cho bước châm phân."
                    duration="10-15 phút"
                  />

                  <FertigationTimelineStep
                    stepNumber={2}
                    icon="⚗️"
                    title="Mở Van Châm Phân"
                    description={`Châm liên tục trong đúng ${injectionTime} phút cho đến khi cạn bồn. Không nên tăng tốc độ hút để đảm bảo phân bón hòa tan đều, tránh tình trạng phân lắng đọng.`}
                    duration={`${injectionTime} phút`}
                  />

                  <FertigationTimelineStep
                    stepNumber={3}
                    icon="🚿"
                    title="Xả Đường Ống"
                    description="Tưới nước trong để súc rửa toàn bộ phân trong đường ống, tránh rong rêu và nghẹt béc. Bước này quan trọng để kéo dài tuổi thọ hệ thống tưới."
                    duration="10-15 phút"
                    isLast
                  />
                </div>

                {/* Notes */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    📌 Lưu Ý Quan Trọng
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-[#F57C00] font-bold shrink-0">✓</span>
                      <span>Kiểm tra độ hòa tan của phân bón trước khi châm vào hệ thống.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F57C00] font-bold shrink-0">✓</span>
                      <span>Nên phân chia từng mẻ nhỏ nếu dung tích bồn không đủ.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F57C00] font-bold shrink-0">✓</span>
                      <span>Vệ sinh bồn phân sau mỗi lần sử dụng để tránh tích cặn.</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* O2O Upsell - Buy Fertilizer */}
            <Card className="overflow-hidden border-[#F57C00]/30 bg-gradient-to-r from-[#F57C00]/8 to-[#F57C00]/4 shadow-[0_18px_36px_-22px_rgba(245,124,0,0.3)] backdrop-blur-md">
              <CardContent className="p-5 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-1">
                      🌾 Hệ thống nhà rẫy đang thiếu phân bón hòa tan?
                    </h4>
                    <p className="text-sm text-slate-600">
                      Chúng tôi cung cấp phân bón chất lượng cao, được thiết kế riêng cho hệ thống tưới nhỏ giọt.
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate('/products?category=phan-bon')}
                    className="shrink-0 bg-[#F57C00] hover:bg-[#E56200] text-white gap-2 h-11 px-5 rounded-lg font-bold text-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Mua Phân Bón</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onReset}
                variant="outline"
                className="flex-1"
              >
                🔄 Tính Lại Công Thức
              </Button>
              <Button
                onClick={() => navigate('/cong-cu')}
                variant="ghost"
                className="flex-1"
              >
                ← Quay Lại Tất Cả Công Cụ
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
