import { motion } from 'framer-motion';
import { Phone, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dealer } from '@/data/dealersData';
import { cn } from '@/lib/utils';

interface DealerCardProps {
  dealer: Dealer;
  isFallback?: boolean;
  onCall?: () => void;
  onShare?: () => void;
}

export function DealerCard({ dealer, isFallback = false, onCall, onShare }: DealerCardProps) {
  const getBorderColor = () => {
    if (dealer.type === 'head-office') return 'border-yellow-400';
    if (dealer.type === 'branch') return 'border-blue-300';
    return 'border-slate-200';
  };

  const getBadge = () => {
    if (dealer.type === 'head-office') return '👑 Tổng Kho Trung Tâm';
    if (dealer.type === 'branch') return '🏢 Văn Phòng Đại Diện';
    return '🤝 Đại Lý Ủy Quyền';
  };

  const getBgColor = () => {
    if (dealer.type === 'head-office') return 'bg-yellow-50';
    if (dealer.type === 'branch') return 'bg-blue-50';
    return 'bg-white';
  };

  const hours = dealer.hours || '8h00 - 17h00';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="block"
    >
      <div
        className={cn(
          'rounded-2xl border-2 p-4 shadow-sm hover:shadow-md transition-all duration-200',
          getBorderColor(),
          getBgColor(),
          isFallback && 'ring-2 ring-orange-300 ring-offset-1'
        )}
      >
        {/* Header Row: Name + Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-sm md:text-base line-clamp-2">
              {dealer.name}
            </h3>
            <p className="text-xs md:text-[13px] text-slate-600 line-clamp-1 mt-0.5">
              {dealer.address}
            </p>
          </div>

          {/* Type Badge */}
          <div className="shrink-0 rounded-full px-2.5 py-1 bg-white/80 backdrop-blur-sm border border-white/40 min-w-fit">
            <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
              {getBadge()}
            </span>
          </div>
        </div>

        {/* Info Row: Hours + Location */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/50">
          {/* Hours */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Mở cửa: {hours}</span>
          </div>

          {/* Location */}
          <div className="shrink-0 text-xs font-semibold text-slate-700 whitespace-nowrap">
            {dealer.district}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-4 space-y-1.5">
          {dealer.phone && (
            <div className="text-xs md:text-[13px] text-slate-700 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#2D5A27]" />
              <span className="font-semibold">{dealer.phone}</span>
            </div>
          )}
          <div className="text-[11px] text-slate-500 flex items-start gap-2">
            <span className="mt-0.5">📍</span>
            <span>{dealer.region}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Call Button */}
          <Button
            onClick={onCall}
            variant="outline"
            className={cn(
              'flex-1 h-10 rounded-lg text-[13px] font-semibold gap-1.5 transition-all',
              dealer.type === 'head-office'
                ? 'border-yellow-500 text-yellow-700 hover:bg-yellow-50'
                : 'border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27]/5'
            )}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Gọi</span>
          </Button>

          {/* Share/Send Quote Button */}
          <Button
            onClick={onShare}
            className="flex-1 h-10 rounded-lg text-[13px] font-semibold bg-gradient-to-r from-[#F57C00] to-[#E56200] text-white hover:opacity-90 gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Dự Toán</span>
          </Button>
        </div>

        {/* Fallback Message */}
        {isFallback && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2.5 rounded-lg bg-orange-100/60 border border-orange-300/50"
          >
            <p className="text-[11px] font-medium text-orange-800 leading-relaxed">
              ⚠️ Khu vực của bạn chưa có đại lý ủy quyền. Tổng kho Hồ Chí Minh sẽ trực tiếp xử lý và giao hàng tận rẫy cho bạn!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
