import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, UploadCloud, MapPin, CheckCircle2, FileText, ArrowLeft, Bot, ScanLine, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SeoMeta from '@/components/SeoMeta';

export default function AiDoctorPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  
  const handleImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
    setIsScanning(true);
    setResult(null);
    
    // Giả lập quét AI mất 3 giây
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        disease: 'Nấm Hồng (Erythricium salmonicolor)',
        accuracy: 94,
        prescription: 'Sử dụng thuốc gốc Đồng (Copper) hoặc Validamycin. Phun ướt đều tán lá, đặc biệt là các vết nứt trên thân, cành.'
      });
    }, 3000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImage(e.target.files[0]);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-6 md:pt-12">
      <SeoMeta title="Bác Sĩ Cây Trồng AI - Nhà Bè Agri" description="Chụp ảnh cây bị bệnh để nhận chẩn đoán và toa thuốc tự động từ AI." />
      <div className="container max-w-2xl mx-auto relative px-4 md:px-0">
        
        <div className="mb-8 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
            <Bot className="w-7 h-7" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Bác Sĩ Cây Trồng AI</h1>
          <p className="text-sm text-muted-foreground mt-2">Chẩn đoán hình ảnh - Kê toa tức thì</p>
        </div>

        {!image ? (
          <Card className="bg-white border-accent/20 shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
            {/* Mobile Adaptive UI */}
            <div className="p-8 md:hidden flex flex-col items-center justify-center min-h-[300px] text-center">
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileInput}
              />
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-lg font-bold mb-2">Chụp ảnh cây bị bệnh</h2>
              <p className="text-sm text-muted-foreground mb-8">Hệ thống AI sẽ phân tích và đưa ra giải pháp ngay lập tức.</p>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-16 bg-[#2D5A27] hover:bg-[#1A3A18] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#2D5A27]/30 transition-transform active:scale-95"
              >
                📸 Mở Camera Chụp Lá Bệnh
              </Button>
            </div>

            {/* Desktop Adaptive UI */}
            <div 
              className="hidden md:flex flex-col items-center justify-center p-12 min-h-[400px] border-2 border-dashed border-accent/40 bg-accent/5 m-6 rounded-2xl hover:bg-accent/10 transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => desktopInputRef.current?.click()}
            >
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={desktopInputRef}
                onChange={handleFileInput}
              />
              <UploadCloud className="w-16 h-16 text-accent mb-6" />
              <h2 className="text-xl font-bold mb-2">Kéo thả ảnh chụp cây bệnh vào đây</h2>
              <p className="text-muted-foreground mb-6">hoặc Click để chọn file</p>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-xl h-12 px-8">
                Duyệt tệp tin
              </Button>
            </div>
          </Card>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto"
          >
            <Card className="overflow-hidden rounded-3xl shadow-2xl bg-white border-accent/20">
              {/* Image Preview Area */}
              <div className="relative aspect-[4/3] bg-black/5 flex items-center justify-center overflow-hidden">
                <img src={image} alt="Crop" className="w-full h-full object-cover" />
                
                {/* Scanning Animation overlay */}
                {isScanning && (
                  <>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    <motion.div 
                      className="absolute left-0 w-full h-1 bg-[#2D5A27] shadow-[0_0_15px_5px_rgba(45,90,39,0.5)] z-10"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                      <ScanLine className="w-12 h-12 text-[#2D5A27] animate-pulse mb-3" />
                      <p className="text-white font-bold tracking-wider text-center px-4">🤖 Hệ thống đang phân tích tế bào bệnh học...</p>
                    </div>
                  </>
                )}
                
                {!isScanning && (
                  <button 
                    onClick={reset}
                    className="absolute top-4 left-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 backdrop-blur-md"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Results Area */}
              <AnimatePresence>
                {!isScanning && result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">Kết Quả Chẩn Đoán</h3>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 94% Chính xác
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Bệnh lý phát hiện
                      </p>
                      <p className="text-lg font-bold text-red-900">{result.disease}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Toa thuốc & Xử lý
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {result.prescription}
                      </p>
                    </div>

                    <Button 
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-xl shadow-primary/30 transition-transform active:scale-95"
                    >
                      <MapPin className="w-5 h-5 mr-2" /> Gửi Toa Thuốc Cho Đại Lý Xử Lý
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}

      </div>
    </div>
  );
}
