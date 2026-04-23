import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, UploadCloud, FileImage, ShieldCheck, Bug, Pill, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function AiDoctorPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fileInputMobileRef = useRef<HTMLInputElement>(null);
  const fileInputDesktopRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      startScan();
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setShowResult(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 py-12 px-4 relative overflow-hidden">
      {/* Background Decor (Cyberpunk/AI vibe) */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#2D5A27]/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm mb-4 backdrop-blur-md">
            Nhà Bè Agri AI Vision
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight mb-3">
            Bác Sĩ Cây Trồng AI
          </h1>
          <p className="text-slate-400 text-lg">Chẩn đoán bệnh lý nông nghiệp chính xác bằng Trí tuệ nhân tạo</p>
        </div>

        <AnimatePresence mode="wait">
          {!imagePreview ? (
            <motion.div
              key="input-layer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* MOBILE INPUT */}
              <div className="md:hidden space-y-4">
                <Button 
                  onClick={() => fileInputMobileRef.current?.click()}
                  className="w-full h-20 text-xl font-bold bg-[#2D5A27] hover:bg-[#1f421b] text-white rounded-2xl shadow-lg shadow-[#2D5A27]/20 flex items-center justify-center gap-3"
                >
                  <Camera className="w-8 h-8" /> 📸 Chụp Ảnh Cây Bệnh
                </Button>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  ref={fileInputMobileRef}
                  onChange={handleImageUpload}
                />
                <div className="text-center">
                  <span className="text-slate-500 text-sm">Hoặc tải từ thư viện</span>
                </div>
              </div>

              {/* DESKTOP INPUT (Drag & Drop Mock) */}
              <div 
                className="hidden md:flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-700 hover:border-[#2D5A27] bg-slate-900/50 backdrop-blur-sm rounded-3xl cursor-pointer transition-colors"
                onClick={() => fileInputDesktopRef.current?.click()}
              >
                <UploadCloud className="w-16 h-16 text-slate-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Kéo thả ảnh lá/rễ cây bệnh vào đây</h3>
                <p className="text-slate-500">hoặc click để duyệt file</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputDesktopRef}
                  onChange={handleImageUpload}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Scanning Area */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-2xl aspect-[4/3] md:aspect-video mx-auto max-w-2xl flex items-center justify-center">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-60" />
                
                {isScanning && (
                  <>
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-1 bg-[#2D5A27] shadow-[0_0_20px_5px_#2D5A27]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#2D5A27]/40 to-transparent"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <motion.p 
                        animate={{ opacity: [1, 0.5, 1] }} 
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-[#10B981] font-mono text-sm bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-md"
                      >
                        🤖 Hệ thống đang phân tích tế bào và đối chiếu cơ sở dữ liệu...
                      </motion.p>
                    </div>
                  </>
                )}

                {showResult && (
                  <div className="absolute top-4 right-4 bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 font-semibold">
                    <ShieldCheck className="w-5 h-5" /> Độ chuẩn xác: 94%
                  </div>
                )}
              </div>

              {/* Result Receipt */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                  >
                    <Card className="bg-white/10 border-white/10 backdrop-blur-xl text-white shadow-2xl">
                      <CardContent className="p-6 md:p-8 space-y-6">
                        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                            <Bug className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-semibold">Phát hiện bệnh</p>
                            <h2 className="text-2xl font-bold text-red-400">Nấm Hồng / Tuyến Trùng Rễ</h2>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                            <Pill className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-sm mb-1 uppercase tracking-widest font-semibold">Toa thuốc đặc trị</p>
                            <p className="text-slate-200 leading-relaxed text-lg">
                              Sử dụng thuốc diệt nấm chứa hoạt chất <span className="text-white font-bold bg-white/10 px-1 rounded">Hexaconazole</span>. Kết hợp tưới <span className="text-white font-bold bg-white/10 px-1 rounded">Trichoderma</span> vào gốc.
                            </p>
                          </div>
                        </div>

                        <div className="pt-6">
                          <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-3 border-0"
                          >
                            <MapPin className="w-6 h-6" /> 📍 Gửi Toa Này Cho Đại Lý Gần Nhất
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="text-center mt-6">
                      <button onClick={() => setImagePreview(null)} className="text-slate-500 hover:text-slate-300 transition-colors text-sm underline underline-offset-4">
                        Chụp/Tải ảnh khác
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Capture Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Tìm đại lý có sẵn thuốc</DialogTitle>
              <DialogDescription className="text-slate-400">
                Nhà Bè Agri sẽ kiểm tra tồn kho Hexaconazole/Trichoderma tại đại lý gần bạn và báo giá qua Zalo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Số điện thoại Zalo của bạn</label>
                <Input placeholder="Ví dụ: 0901234567" className="bg-slate-800 border-slate-700 text-white focus-visible:ring-[#2D5A27]" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsModalOpen(false)} className="w-full bg-[#2D5A27] hover:bg-[#1f421b] text-white">
                <Send className="w-4 h-4 mr-2" /> Gửi Yêu Cầu Tìm Đại Lý
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
