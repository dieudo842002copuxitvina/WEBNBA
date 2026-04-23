import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Dealer } from '@/data/dealersData';
import { cn } from '@/lib/utils';

interface DealerBottomSheetProps {
  dealers: Dealer[];
  renderDealerItem: (dealer: Dealer) => React.ReactNode;
  isExpanded?: boolean;
  onExpand?: (expanded: boolean) => void;
}

export function DealerBottomSheet({
  dealers,
  renderDealerItem,
  isExpanded = false,
  onExpand,
}: DealerBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
      startHeightRef.current = sheetRef.current?.clientHeight ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sheetRef.current || !onExpand) return;

      const deltaY = e.touches[0].clientY - startYRef.current;

      // Swipe down to collapse
      if (deltaY > 30 && isExpanded) {
        onExpand(false);
      }
      // Swipe up to expand
      else if (deltaY < -30 && !isExpanded) {
        onExpand(true);
      }
    };

    const sheet = sheetRef.current;
    if (sheet) {
      sheet.addEventListener('touchstart', handleTouchStart, { passive: true });
      sheet.addEventListener('touchmove', handleTouchMove, { passive: true });

      return () => {
        sheet.removeEventListener('touchstart', handleTouchStart);
        sheet.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isExpanded, onExpand]);

  return (
    <motion.div
      ref={sheetRef}
      animate={{
        height: isExpanded ? '85vh' : '40vh',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className={cn(
        'fixed bottom-0 left-0 right-0 rounded-t-3xl bg-white shadow-2xl z-40',
        'md:hidden flex flex-col',
        'border-t border-white/40'
      )}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px -12px 48px 0px',
      }}
    >
      {/* Handle Bar */}
      <motion.div
        onClick={() => onExpand?.(!isExpanded)}
        className="flex justify-center pt-3 pb-2 cursor-pointer active:opacity-50 transition-opacity"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
          <ChevronUp
            className={cn(
              'w-4 h-4 text-slate-400 transition-transform duration-300',
              isExpanded && 'transform rotate-180'
            )}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        {dealers.length > 0 ? (
          dealers.map((dealer) => (
            <motion.div
              key={dealer.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderDealerItem(dealer)}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-slate-500 text-sm">Không tìm thấy đại lý gần bạn.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
