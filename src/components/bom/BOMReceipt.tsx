import { Button } from '@/components/ui/button';
import type { BOMCalculatorResult } from '@/hooks/useBOMCalculator';

interface BOMReceiptProps {
  cropName: string;
  locationLabel?: string;
  areaLabel: string;
  spacingLabel: string;
  calculation: BOMCalculatorResult;
  onSendQuote: () => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

const RECEIPT_ITEMS = [
  {
    key: 'sprinklerCount',
    icon: '🟢',
    label: 'Béc tưới bù áp',
    unit: 'bộ',
  },
  {
    key: 'branchPipeLength',
    icon: '🟤',
    label: 'Ống nhánh LDPE 20mm',
    unit: 'm',
  },
  {
    key: 'mainPipeLength',
    icon: '⚪',
    label: 'Ống chính PVC 60mm',
    unit: 'm',
  },
] as const;

export default function BOMReceipt({
  cropName,
  locationLabel,
  areaLabel,
  spacingLabel,
  calculation,
  onSendQuote,
}: BOMReceiptProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-[#2D5A27]/15 bg-[linear-gradient(180deg,#fffef8_0%,#fffdf6_100%)] p-5 shadow-[0_24px_60px_-32px_rgba(45,90,39,0.35)] md:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 26px)',
        }}
      />

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-slate-300/80 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2D5A27]">
              Kết Quả Phân Tích Sơ Bộ
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-slate-950">
              Phiếu dự toán thông minh
            </h3>
          </div>
          <div className="rounded-full border border-[#2D5A27]/20 bg-[#2D5A27]/8 px-3 py-1 text-[11px] font-bold text-[#2D5A27]">
            {cropName}
          </div>
        </div>

        <div className="grid gap-2 text-[12px] text-slate-600 sm:grid-cols-3">
          <MetaRow label="Diện tích" value={areaLabel} />
          <MetaRow label="Khoảng cách" value={spacingLabel} />
          <MetaRow label="Khu vực" value={locationLabel || 'Chưa chọn'} />
        </div>

        <div className="space-y-2 border-y border-dashed border-slate-300/80 py-4">
          {RECEIPT_ITEMS.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-3 rounded-2xl bg-white/75 px-3 py-3">
              <div className="flex items-center gap-3">
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="text-sm font-semibold text-slate-800">{item.label}</span>
              </div>

              <div className="text-right">
                <p className="font-mono text-base font-bold text-slate-950">
                  {calculation[item.key].toLocaleString('vi-VN')}
                </p>
                <p className="text-[11px] text-slate-500">{item.unit}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(245,124,0,0.12),rgba(220,38,38,0.08))] px-4 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Tổng chi phí ước tính
          </p>
          <p className="mt-2 text-2xl font-black leading-tight text-[#D9480F] md:text-3xl">
            ~ {formatCurrency(calculation.estimatedCost)}
          </p>
        </div>

        <p className="text-[12px] leading-relaxed text-slate-500">
          Lưu ý: Đây là dự toán cơ bản. Chi phí thực tế có thể thay đổi theo địa hình thực tế.
        </p>

        <Button
          type="button"
          onClick={onSendQuote}
          className="h-12 w-full rounded-[1.1rem] bg-[#2D5A27] text-sm font-bold text-white hover:bg-[#24491f]"
        >
          Gửi Dự Toán Cho Đại Lý Báo Giá
        </Button>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/75 px-3 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
