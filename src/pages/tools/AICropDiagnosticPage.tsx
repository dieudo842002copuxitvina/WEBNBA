import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoMeta from '@/components/SeoMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AICropDiagnosticInput } from '@/components/aiDoctor/AICropDiagnosticInput';
import { AIScanningAnimation } from '@/components/aiDoctor/AIScanningAnimation';
import { DiagnosticResultCard } from '@/components/aiDoctor/DiagnosticResultCard';
import { useAICropDiagnostic } from '@/hooks/useAICropDiagnostic';

export default function AICropDiagnosticPage() {
  const {
    imageFile,
    imagePreviewUrl,
    isScanning,
    result,
    error,
    handleImageSelect,
    analyzeDiagnosis,
    resetDiagnosis,
  } = useAICropDiagnostic();

  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);

  const handleImageSelectWrapper = (file: File) => {
    handleImageSelect(file);
    setShowAnalyzeButton(true);
  };

  const handleAnalyze = async () => {
    await analyzeDiagnosis();
  };

  const handleReset = () => {
    resetDiagnosis();
    setShowAnalyzeButton(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2D5A27]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl" />
      </div>

      <SeoMeta
        title="Bác Sĩ Cây Trồng AI - Chẩn Đoán Bệnh Từ Ảnh | Nhà Bè Agri"
        description="Sử dụng AI để chẩn đoán bệnh cây trồng từ ảnh chụp. Nhận toa thuốc đặc trị và liên hệ đại lý gần nhất trong vòng 24h."
        canonical="/cong-cu/bac-si-ai"
      />

      <div className="container max-w-4xl py-6 md:py-10 relative z-10">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 gap-1.5 text-white hover:text-white/80">
          <Link to="/cong-cu">
            <ArrowLeft className="h-4 w-4" />
            Tất cả công cụ
          </Link>
        </Button>

        <div className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2D5A27]/50 bg-[#2D5A27]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2D5A27]">
            <Bot className="h-3.5 w-3.5" />
            Bác Sĩ Cây Trồng AI
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-white mb-3">
            Chẩn đoán bệnh cây từ ảnh lá.
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Chụp ảnh lá/rễ cây bệnh và để AI phân tích. Hệ thống sẽ đề xuất toa thuốc chính xác và kết nối bạn với đại lý gần nhất.
          </p>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait" initial={false}>
            {!isScanning && !result ? (
              <motion.div
                key="ai-input"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18, scale: 0.985 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <Card className="overflow-hidden border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
                  <CardHeader className="border-b border-white/5 bg-gradient-to-r from-[#2D5A27]/10 to-transparent pb-6">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2D5A27]/30 bg-[#2D5A27]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2D5A27] mb-4">
                      <Bot className="h-3.5 w-3.5" />
                      Đầu Vào
                    </div>
                    <CardTitle className="font-display text-2xl md:text-3xl text-white">
                      Tải Ảnh Cây Bệnh
                    </CardTitle>
                    <CardDescription className="mt-2 text-slate-300">
                      Chụp ảnh lá hoặc rễ cây bệnh với ánh sáng tốt để hệ thống phân tích chính xác nhất.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    <AICropDiagnosticInput
                      onImageSelect={handleImageSelectWrapper}
                      isLoading={false}
                      hasImage={!!imagePreviewUrl}
                      imagePreviewUrl={imagePreviewUrl}
                      onReset={handleReset}
                    />

                    {/* Analyze Button */}
                    {showAnalyzeButton && imagePreviewUrl && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6"
                      >
                        <Button
                          onClick={handleAnalyze}
                          className="w-full h-14 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#1a3716] text-white font-bold hover:opacity-90 gap-2 text-base"
                        >
                          🤖 Phân Tích Bệnh Học Bằng AI
                        </Button>
                      </motion.div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : isScanning && imagePreviewUrl ? (
              <motion.div
                key="ai-scanning"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
                  <CardContent className="p-6 md:p-8">
                    <AIScanningAnimation imageUrl={imagePreviewUrl} isScanning={isScanning} />
                  </CardContent>
                </Card>
              </motion.div>
            ) : result ? (
              <motion.div
                key="ai-result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <DiagnosticResultCard result={result} onReset={handleReset} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="border-white/10 bg-slate-900/40 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">📸</div>
              <p className="text-sm font-semibold text-white mb-1">Chụp Rõ Ràng</p>
              <p className="text-xs text-slate-400">
                Chụp lá/rễ bệnh với ánh sáng tự nhiên, tránh bóng quá tối.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/40 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-sm font-semibold text-white mb-1">Gần Gọi</p>
              <p className="text-xs text-slate-400">
                Chụp gần để thấy chi tiết triệu chứng bệnh trên lá.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-900/40 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-sm font-semibold text-white mb-1">Xác Thực</p>
              <p className="text-xs text-slate-400">
                Tư vấn chuyên gia trước khi xử lý để chắc chắn 100%.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
