import { Beaker, Droplet, Wind } from 'lucide-react';
import { FloatingInputField } from '@/components/bom/FloatingInputField';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FertigationInputFormProps {
  tankVolume: string;
  onTankVolumeChange: (value: string) => void;
  fertilizerWeight: string;
  onFertilizerWeightChange: (value: string) => void;
  venturiFlow: string;
  onVenturiFlowChange: (value: string) => void;
  isLoading?: boolean;
  isValid?: boolean;
  onSubmit: () => void;
}

export function FertigationInputForm({
  tankVolume,
  onTankVolumeChange,
  fertilizerWeight,
  onFertilizerWeightChange,
  venturiFlow,
  onVenturiFlowChange,
  isLoading = false,
  isValid = false,
  onSubmit,
}: FertigationInputFormProps) {
  return (
    <div className="space-y-6">
      {/* Tank Volume */}
      <div className="relative">
        <FloatingInputField
          id="fertigation-tank-volume"
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          label="Dung tích bồn phân"
          placeholder=" "
          value={tankVolume}
          onChange={(e) => onTankVolumeChange(e.target.value)}
          suffix="Lít"
          hint="Nhập dung tích bồn phân. Gợi ý: 100, 200, 500..."
          disabled={isLoading}
          className="bg-white/60 backdrop-blur-md"
        />
        <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 opacity-50 md:block hidden">
          <Droplet className="h-8 w-8 text-[#2D5A27]/40" />
        </div>
      </div>

      {/* Fertilizer Weight */}
      <div className="relative">
        <FloatingInputField
          id="fertigation-fertilizer-weight"
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          label="Lượng phân định bón"
          placeholder=" "
          value={fertilizerWeight}
          onChange={(e) => onFertilizerWeightChange(e.target.value)}
          suffix="Kg"
          hint="Nhập lượng phân bón cần pha vào bồn."
          disabled={isLoading}
          className="bg-white/60 backdrop-blur-md"
        />
        <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 opacity-50 md:block hidden">
          <Beaker className="h-8 w-8 text-[#F57C00]/40" />
        </div>
      </div>

      {/* Venturi Flow */}
      <div className="relative">
        <FloatingInputField
          id="fertigation-venturi-flow"
          type="number"
          inputMode="decimal"
          step="1"
          min="0"
          label="Lưu lượng hút Venturi"
          placeholder=" "
          value={venturiFlow}
          onChange={(e) => onVenturiFlowChange(e.target.value)}
          suffix="L/H"
          hint="Nhập lưu lượng van hút phân. Placeholder: 250 L/H"
          disabled={isLoading}
          className="bg-white/60 backdrop-blur-md"
        />
        <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 opacity-50 md:block hidden">
          <Wind className="h-8 w-8 text-[#F57C00]/40" />
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-[1.25rem] border border-[#F57C00]/15 bg-[#F57C00]/[0.04] px-4 py-3 text-[12px] text-slate-600">
        <p className="font-medium text-[#F57C00]/80 mb-1">💡 Mẹo sử dụng</p>
        Nhập đầy đủ các thông số để hệ thống phân tích công thức châm phân an toàn. Nếu phát hiện pha quá đặc, hệ thống sẽ cảnh báo để tránh nghẹt béc.
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !isValid}
        className={cn(
          'flex h-14 w-full items-center justify-center gap-2 rounded-[1.2rem] text-base font-bold text-white transition-all duration-200',
          'shadow-[0_18px_36px_-22px_rgba(245,124,0,0.65)]',
          isLoading || !isValid
            ? 'cursor-not-allowed bg-[#F57C00]/60'
            : 'bg-[#F57C00] hover:bg-[#E56200] active:scale-[0.99]',
        )}
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Đang phân tích công thức...
          </>
        ) : (
          <>⚗️ Phân Tích Công Thức</>
        )}
      </button>
    </div>
  );
}
