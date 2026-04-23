import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOM_CROP_OPTIONS, type BomCropKey } from '@/components/bom/bomInput.constants';

interface BomCropSelectorProps {
  value: string;
  onChange: (cropKey: BomCropKey, cropName: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function BomCropSelector({ value, onChange, error, disabled = false }: BomCropSelectorProps) {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-3">
        {BOM_CROP_OPTIONS.map((crop) => {
          const active = crop.key === value;

          return (
            <button
              key={crop.key}
              type="button"
              disabled={disabled}
              onClick={() => onChange(crop.key, crop.name)}
              aria-pressed={active}
              className={cn(
                'relative aspect-square overflow-hidden rounded-[1.35rem] border bg-white p-4 text-left transition-all duration-200',
                'shadow-[0_2px_6px_-2px_hsl(205_30%_15%/0.06)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
                active
                  ? 'border-[3px] border-[#2D5A27] shadow-[0_0_0_4px_hsl(122_38%_25%/0.08)]'
                  : 'border-slate-200 hover:border-[#2D5A27]/35 hover:shadow-[0_10px_20px_-12px_hsl(122_38%_25%/0.35)]',
              )}
            >
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', crop.accent)} />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-3xl leading-none">{crop.emoji}</span>
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
                      active ? 'bg-[#2D5A27] text-white' : 'bg-white/80 text-transparent',
                    )}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>

                <div>
                  <p className={cn('text-sm font-bold', active ? 'text-[#1E3D1A]' : 'text-slate-900')}>
                    {crop.name}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">{crop.place}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-[11px] font-medium text-destructive">
          <span className="h-1 w-1 rounded-full bg-destructive" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
