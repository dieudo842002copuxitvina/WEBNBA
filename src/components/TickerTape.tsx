import { useMemo } from 'react';
import { commodityPrices } from '@/data/mock';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useHomepageConfig } from '@/contexts/HomepageConfigContext';

/**
 * Ticker Tape — dải băng chạy ngang. Đọc cấu hình từ HomepageConfig:
 * - Nếu block 'ticker' bị ẩn → không render
 * - Nếu mode 'manual' → hiển thị text Admin nhập
 * - Nếu mode 'auto' → hiển thị giá nông sản
 */
export default function TickerTape() {
  const { config, isBlockVisible } = useHomepageConfig();

  const items = useMemo(() => {
    const priority = ['Cà phê', 'Tiêu', 'Sầu riêng', 'Cao su', 'Lúa'];
    return [...commodityPrices].sort((a, b) => {
      const ai = priority.findIndex(p => a.name.includes(p));
      const bi = priority.findIndex(p => b.name.includes(p));
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, []);

  if (!isBlockVisible('ticker')) return null;

  const manualMode = config.ticker.mode === 'manual';
  const manualLoop = manualMode
    ? Array.from({ length: 4 }, (_, i) => `${config.ticker.manualText}`).join('   ·   ')
    : '';

  return (
    <div className="bg-foreground text-background overflow-hidden border-b border-foreground/10">
      <div className="flex items-center">
        <div className="shrink-0 bg-primary text-primary-foreground px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
          {manualMode ? 'Tin' : 'Live'}
        </div>
        <div className="relative flex-1 overflow-hidden">
          {manualMode ? (
            <div className="flex animate-ticker whitespace-nowrap py-1.5">
              <span className="px-5 text-xs font-semibold">{manualLoop}   ·   {manualLoop}</span>
            </div>
          ) : (
            <div className="flex animate-ticker whitespace-nowrap py-1.5">
              {[...items, ...items].map((c, i) => {
                const up = c.change >= 0;
                return (
                  <div key={`${c.name}-${i}`} className="flex items-center gap-2 px-5 text-xs">
                    <span className="font-semibold">{c.name}</span>
                    <span className="font-mono">{c.currentPrice.toLocaleString('vi-VN')} {c.unit}</span>
                    <span className={`flex items-center gap-0.5 font-semibold ${up ? 'text-success' : 'text-destructive'}`}>
                      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {up ? '+' : ''}{c.change}%
                    </span>
                    <span className="text-background/30">·</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
