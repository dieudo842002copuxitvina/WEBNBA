import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Share2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import SeoMeta from '@/components/SeoMeta';
import { DealerCard } from '@/components/dealers/DealerCard';
import { DealerMapView } from '@/components/dealers/DealerMapView';
import { DealerBottomSheet } from '@/components/dealers/DealerBottomSheet';
import { useGeoRouting } from '@/hooks/useGeoRouting';
import { Dealer } from '@/data/dealersData';
import { cn } from '@/lib/utils';

export default function DealerDirectoryPage() {
  const {
    sortedDealers,
    currentProvince,
    needsFallback,
    fallbackMessage,
  } = useGeoRouting();

  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  const handleCall = (dealer: Dealer) => {
    if (dealer.phone) {
      toast.success(`Điện thoại: ${dealer.phone}`, {
        description: `Gọi ${dealer.name}`,
      });
      // Production: window.location.href = `tel:${dealer.phone}`;
    } else {
      toast.error('Không có số điện thoại');
    }
  };

  const handleShare = (dealer: Dealer) => {
    toast.info('Chuyển dự toán', {
      description: `Sẽ gửi dự toán tới ${dealer.name}`,
    });
    // Production: Redirect to BOM calculator with pre-selected dealer
  };

  const renderDealerItem = (dealer: Dealer) => (
    <div
      onClick={() => setSelectedDealer(dealer)}
      className="cursor-pointer transition-opacity hover:opacity-80"
    >
      <DealerCard
        dealer={dealer}
        isFallback={needsFallback && dealer.type === 'head-office'}
        onCall={() => handleCall(dealer)}
        onShare={() => handleShare(dealer)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <SeoMeta
        title="Danh bạ Đại Lý - Tìm Kiếm Đại Lý Gần Nhất | Nhà Bè Agri"
        description="Tìm kiếm đại lý vật tư nông nghiệp gần nhất, xem thông tin liên hệ, gọi hoặc gửi dự toán."
        canonical="/dai-ly"
      />

      {/* DESKTOP VIEW: Split-Screen */}
      <div className="hidden md:flex h-screen">
        {/* Map - 60% */}
        <div className="w-3/5 h-full bg-slate-100">
          <DealerMapView
            dealers={sortedDealers}
            selectedDealer={selectedDealer}
          />
        </div>

        {/* Dealer List - 40% */}
        <div className="w-2/5 h-full bg-white overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-gradient-to-r from-white via-white/90 to-slate-50 backdrop-blur-md p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#2D5A27] to-[#F57C00]" />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {currentProvince || 'Tất cả Tỉnh Thành'}
                </p>
                <p className="text-xs text-slate-500">
                  {sortedDealers.length} đại lý phân phối
                </p>
              </div>
            </div>

            {/* Fallback Alert */}
            {needsFallback && fallbackMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-orange-50 border border-orange-200 p-3 flex gap-2"
              >
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-800 font-medium leading-relaxed">
                  {fallbackMessage}
                </p>
              </motion.div>
            )}
          </div>

          {/* Dealer List */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
            {sortedDealers.length > 0 ? (
              sortedDealers.map((dealer, idx) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {renderDealerItem(dealer)}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm">Không tìm thấy đại lý nào.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Full Map + BottomSheet */}
      <div className="md:hidden h-screen flex flex-col relative">
        {/* Full Screen Map */}
        <div className="absolute inset-0 z-0">
          <DealerMapView
            dealers={sortedDealers}
            selectedDealer={selectedDealer}
          />
        </div>

        {/* Header - Floating */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="absolute top-0 left-0 right-0 z-30 pt-4 px-4"
        >
          <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#2D5A27] to-[#F57C00]" />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {currentProvince || 'Danh bạ Đại Lý'}
                </p>
                <p className="text-xs text-slate-500">
                  {sortedDealers.length} nơi phân phối
                </p>
              </div>
            </div>

            {/* Fallback Alert */}
            {needsFallback && fallbackMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg bg-orange-50 border border-orange-200 p-2.5 flex gap-2"
              >
                <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-orange-800 font-medium leading-relaxed">
                  {fallbackMessage}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom Sheet */}
        <DealerBottomSheet
          dealers={sortedDealers}
          renderDealerItem={renderDealerItem}
          isExpanded={isBottomSheetExpanded}
          onExpand={setIsBottomSheetExpanded}
        />
      </div>
    </div>
  );
}
