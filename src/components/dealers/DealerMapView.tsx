import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Dealer } from '@/data/dealersData';
import { cn } from '@/lib/utils';

interface DealerMapViewProps {
  dealers: Dealer[];
  selectedDealer?: Dealer | null;
  currentLocation?: { lat: number; lng: number } | null;
}

export function DealerMapView({ dealers, selectedDealer, currentLocation }: DealerMapViewProps) {
  // Simplified map: Show dealer list instead of actual map
  // In production, integrate react-leaflet or mapbox

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-slate-50 to-green-50 overflow-hidden">
      {/* Decorative grid */}
      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D5A27" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Pseudo-map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A27]/5 via-transparent to-[#F57C00]/3" />

      {/* Content Area */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#2D5A27] to-[#1a3716] flex items-center justify-center shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Danh bạ Đại Lý Trực Tuyến
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nhà Bè Agri sở hữu mạng lưới{' '}
              <span className="font-semibold text-[#2D5A27]">{dealers.length} điểm phân phối</span>{' '}
              trên khắp Việt Nam, từ Hà Nội đến Kiên Giang.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="rounded-lg bg-white/70 backdrop-blur p-2 text-center">
              <p className="text-2xl font-bold text-[#2D5A27]">1</p>
              <p className="text-[10px] text-slate-600">Tổng Kho</p>
            </div>
            <div className="rounded-lg bg-white/70 backdrop-blur p-2 text-center">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-[10px] text-slate-600">Văn Phòng</p>
            </div>
            <div className="rounded-lg bg-white/70 backdrop-blur p-2 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {dealers.length - 6}
              </p>
              <p className="text-[10px] text-slate-600">Đại Lý</p>
            </div>
          </div>

          {selectedDealer && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-white/90 backdrop-blur border border-white/40 p-3 text-left"
            >
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Đã chọn
              </p>
              <p className="text-sm font-bold text-slate-900">{selectedDealer.name}</p>
              <p className="text-xs text-slate-600">
                {selectedDealer.district}, {selectedDealer.province}
              </p>
              {selectedDealer.phone && (
                <p className="text-xs text-[#2D5A27] font-semibold mt-1">
                  {selectedDealer.phone}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg shadow-md p-3 text-[12px] space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-slate-700 font-semibold">Tổng Kho</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-slate-700 font-semibold">Văn Phòng</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400" />
          <span className="text-slate-700 font-semibold">Đại Lý</span>
        </div>
      </div>
    </div>
  );
}
