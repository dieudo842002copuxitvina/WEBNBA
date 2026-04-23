import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoMeta from '@/components/SeoMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FertigationInputForm } from '@/components/fertigation/FertigationInputForm';
import { FertigationReceipt } from '@/components/fertigation/FertigationReceipt';
import { useFertigation } from '@/hooks/useFertigation';
import { cn } from '@/lib/utils';

export default function FertigationPage() {
  const [tankVolume, setTankVolume] = useState('');
  const [fertilizerWeight, setFertilizerWeight] = useState('');
  const [venturiFlow, setVenturiFlow] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const didHydrate = useRef(false);

  const parseNumber = (value: string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  const tankVolumeValue = parseNumber(tankVolume);
  const fertilizerWeightValue = parseNumber(fertilizerWeight);
  const venturiFlowValue = parseNumber(venturiFlow);

  const { isCalculated: hasValidInput, injectionTime, warningMessage, isSafe, minRequiredVolume } = useFertigation({
    tankVolume: tankVolumeValue,
    fertilizerWeight: fertilizerWeightValue,
    venturiFlow: venturiFlowValue,
  });

  const hasValidFormInput = Boolean(
    tankVolumeValue &&
    fertilizerWeightValue &&
    venturiFlowValue
  );

  const handleCalculate = async () => {
    if (!hasValidFormInput) {
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 420));
      setIsCalculated(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsCalculated(false);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(245,124,0,0.06),rgba(248,250,252,0.96)_22%,rgba(45,90,39,0.05)_100%)]">
      <SeoMeta
        title="Kỹ Sư Dinh Dưỡng - Tính Toán Châm Phân | Nhà Bè Agri"
        description="Công cụ thông minh giúp bạn tính toán chính xác thời gian châm phân, đảm bảo phân bón hòa tan đều đặn và tránh nghẹt béc cho hệ thống tưới nhỏ giọt."
        canonical="/cong-cu/cham-phan"
      />

      <div className="container max-w-5xl py-6 md:py-10">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 gap-1.5">
          <Link to="/cong-cu">
            <ArrowLeft className="h-4 w-4" />
            Tất cả công cụ
          </Link>
        </Button>

        <div className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F57C00]/25 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F57C00] shadow-sm">
            <Beaker className="h-3.5 w-3.5" />
            Kỹ Sư Dinh Dưỡng
          </div>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Công thức châm phân tối ưu cho tưới nhỏ giọt.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Nhập dung tích bồn phân, lượng phân bón, và lưu lượng van hút để tính toán thời gian châm chính xác. Hệ thống tự động cảnh báo nếu pha quá đặc, đảm bảo an toàn cho hệ thống.
          </p>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait" initial={false}>
            {!isCalculated ? (
              <motion.div
                key="fertigation-form"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18, scale: 0.985 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_24px_80px_-48px_rgba(245,124,0,0.45)] backdrop-blur-md">
                  <CardHeader className="space-y-3 border-b border-white/60 bg-[linear-gradient(135deg,rgba(245,124,0,0.10),rgba(255,255,255,0.65),rgba(45,90,39,0.08))] pb-5">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F57C00] shadow-sm backdrop-blur-md">
                      <Beaker className="h-3.5 w-3.5" />
                      Phân Tích Công Thức
                    </div>
                    <div>
                      <CardTitle className="font-display text-2xl text-slate-950 md:text-[2rem]">
                        Nhập Thông Số Hệ Thống
                      </CardTitle>
                      <CardDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                        Cung cấp các thông số của bồn phân và van châm để tính toán công thức châm chính xác. Hệ thống sẽ kiểm tra độ hòa tan tự động.
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 md:p-6">
                    <FertigationInputForm
                      tankVolume={tankVolume}
                      onTankVolumeChange={setTankVolume}
                      fertilizerWeight={fertilizerWeight}
                      onFertilizerWeightChange={setFertilizerWeight}
                      venturiFlow={venturiFlow}
                      onVenturiFlowChange={setVenturiFlow}
                      isLoading={isSubmitting}
                      isValid={hasValidFormInput}
                      onSubmit={handleCalculate}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="fertigation-result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {tankVolumeValue && fertilizerWeightValue && venturiFlowValue ? (
                  <FertigationReceipt
                    injectionTime={injectionTime}
                    warningMessage={warningMessage}
                    isSafe={isSafe}
                    tankVolume={tankVolumeValue}
                    fertilizerWeight={fertilizerWeightValue}
                    venturiFlow={venturiFlowValue}
                    onReset={handleReset}
                  />
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
