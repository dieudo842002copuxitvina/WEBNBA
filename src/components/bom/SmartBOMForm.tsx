import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calculator, Edit3, Loader2, Ruler, Sprout } from 'lucide-react';
import { toast } from 'sonner';
import CropSelect from '@/components/bom/CropSelect';
import BOMReceipt from '@/components/bom/BOMReceipt';
import { FloatingInputField } from '@/components/bom/FloatingInputField';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cropsData } from '@/data/cropData';
import { useBOMCalculator } from '@/hooks/useBOMCalculator';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';
import { cn } from '@/lib/utils';

interface SmartBOMFormProps {
  initialCropId?: string | null;
  initialAreaM2?: string | null;
}

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getSuggestedSpacing(cropId: string) {
  const normalized = cropId.toLowerCase();

  if (normalized.includes('ho-tieu') || normalized.includes('tieu')) {
    return { row: '2', plant: '2' };
  }

  if (normalized.includes('ca-phe') || normalized.includes('coffee')) {
    return { row: '3', plant: '3' };
  }

  if (
    normalized.includes('dieu') ||
    normalized.includes('cao-su') ||
    normalized.includes('rubber')
  ) {
    return { row: '8', plant: '8' };
  }

  if (normalized.includes('sau-rieng') || normalized.includes('durian')) {
    return { row: '8', plant: '8' };
  }

  return { row: '', plant: '' };
}

function formatAreaLabel(area: number) {
  const areaHa = area / 10000;
  return `${area.toLocaleString('vi-VN')} m² · ${areaHa.toLocaleString('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ha`;
}

export default function SmartBOMForm({
  initialCropId,
  initialAreaM2,
}: SmartBOMFormProps) {
  const { profile, updateProfile, isLoaded } = useFarmerProfile();
  const [cropId, setCropId] = useState('');
  const [area, setArea] = useState('');
  const [spacingRow, setSpacingRow] = useState('');
  const [spacingPlant, setSpacingPlant] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const didHydrate = useRef(false);
  const shouldSkipNextAutoSuggest = useRef(false);

  const areaValue = parseNumber(area);
  const spacingRowValue = parseNumber(spacingRow);
  const spacingPlantValue = parseNumber(spacingPlant);

  const { hasValidInput, calculation } = useBOMCalculator({
    area: areaValue,
    spacingRow: spacingRowValue,
    spacingPlant: spacingPlantValue,
  });

  const selectedCrop = useMemo(
    () => cropsData.find((crop) => crop.id === cropId) ?? null,
    [cropId],
  );

  useEffect(() => {
    if (!isLoaded || didHydrate.current) return;

    const areaFromQuery = initialAreaM2 && Number(initialAreaM2) > 0 ? String(Math.round(Number(initialAreaM2))) : '';
    const cropFromQuery = initialCropId && cropsData.some((crop) => crop.id === initialCropId) ? initialCropId : '';

    const savedArea = profile.bomAreaM2 ? String(Math.round(profile.bomAreaM2)) : profile.areHa ? String(Math.round(profile.areHa * 10000)) : '';
    const savedSpacingRow = profile.bomSpacingRow ? String(profile.bomSpacingRow) : '';
    const savedSpacingPlant = profile.bomSpacingPlant ? String(profile.bomSpacingPlant) : '';

    setCropId(cropFromQuery || profile.cropKey || '');
    setArea(areaFromQuery || savedArea);
    setSpacingRow(savedSpacingRow);
    setSpacingPlant(savedSpacingPlant);

    shouldSkipNextAutoSuggest.current = Boolean(savedSpacingRow || savedSpacingPlant);
    didHydrate.current = true;
  }, [initialAreaM2, initialCropId, isLoaded, profile]);

  useEffect(() => {
    if (!cropId) return;

    if (shouldSkipNextAutoSuggest.current) {
      shouldSkipNextAutoSuggest.current = false;
      return;
    }

    const suggested = getSuggestedSpacing(cropId);
    setSpacingRow(suggested.row);
    setSpacingPlant(suggested.plant);
  }, [cropId]);

  useEffect(() => {
    if (!isLoaded || !didHydrate.current) return;

    const crop = cropsData.find((item) => item.id === cropId);

    updateProfile({
      cropKey: cropId,
      cropName: crop?.name ?? '',
      areHa: areaValue ? areaValue / 10000 : null,
      bomAreaM2: areaValue,
      bomSpacingRow: spacingRowValue,
      bomSpacingPlant: spacingPlantValue,
    });
  }, [areaValue, cropId, isLoaded, spacingPlantValue, spacingRowValue, updateProfile]);

  const handleCalculate = async () => {
    if (!hasValidInput || !calculation || !selectedCrop || !areaValue || !spacingRowValue || !spacingPlantValue) {
      toast.error('Điền đủ loại cây, diện tích và khoảng cách trước khi phân tích.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 420));
      setIsCalculated(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetView = () => {
    setIsCalculated(false);
  };

  const handleSendQuote = () => {
    toast.success('Dự toán đã sẵn sàng để chuyển đại lý báo giá.', {
      description: 'Mình đã giữ nguyên số liệu form để bạn tiếp tục nối luồng bán hàng sau.',
    });
  };

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait" initial={false}>
        {!isCalculated ? (
          <motion.div
            key="smart-bom-form"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18, scale: 0.985 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_24px_80px_-48px_rgba(45,90,39,0.45)] backdrop-blur-md">
              <CardHeader className="space-y-3 border-b border-white/60 bg-[linear-gradient(135deg,rgba(45,90,39,0.10),rgba(255,255,255,0.65),rgba(245,124,0,0.08))] pb-5">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2D5A27] shadow-sm backdrop-blur-md">
                  <Calculator className="h-3.5 w-3.5" />
                  SmartBOMForm
                </div>
                <div>
                  <CardTitle className="font-display text-2xl text-slate-950 md:text-[2rem]">
                    Dự Toán Vật Tư Tưới
                  </CardTitle>
                  <CardDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                    Chọn cây trồng, nhập diện tích, hệ thống sẽ tự gợi ý khoảng cách chuẩn và giữ nháp cục bộ ngay cả khi bạn tải lại trang.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                <div className="space-y-6">
                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D5A27]/10 text-[#2D5A27]">
                        <Sprout className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Loại cây trồng</p>
                        <p className="text-[12px] text-slate-500">Combobox tối ưu cho danh sách cây lớn trên mobile.</p>
                      </div>
                    </div>

                    <CropSelect value={cropId} onChange={setCropId} disabled={isSubmitting} />
                  </section>

                  <section className="grid gap-4 md:grid-cols-3">
                    <GlassField
                      id="smart-bom-area"
                      label="Diện tích canh tác"
                      value={area}
                      onChange={setArea}
                      suffix="m²"
                      hint="Nhập diện tích theo mét vuông để tính nhanh BOM."
                      disabled={isSubmitting}
                    />

                    <GlassField
                      id="smart-bom-spacing-row"
                      label="Hàng cách hàng"
                      value={spacingRow}
                      onChange={setSpacingRow}
                      suffix="m"
                      hint="Bạn có thể sửa lại gợi ý nếu thực tế khác."
                      disabled={isSubmitting}
                    />

                    <GlassField
                      id="smart-bom-spacing-plant"
                      label="Cây cách cây"
                      value={spacingPlant}
                      onChange={setSpacingPlant}
                      suffix="m"
                      hint={selectedCrop ? `Gợi ý tự động theo ${selectedCrop.name}.` : 'Chọn cây để hệ thống tự điền khoảng cách.'}
                      disabled={isSubmitting}
                    />
                  </section>

                  <div className="rounded-[1.25rem] border border-[#2D5A27]/10 bg-[#2D5A27]/[0.04] px-4 py-3 text-[12px] text-slate-600">
                    {selectedCrop ? (
                      <>
                        Gợi ý thông minh đang áp dụng cho <span className="font-bold text-[#2D5A27]">{selectedCrop.name}</span>.
                        Bạn vẫn có thể chỉnh tay khoảng cách để bám sát thực địa.
                      </>
                    ) : (
                      <>Chọn cây trồng trước để hệ thống tự gợi ý khoảng cách tiêu chuẩn.</>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={isSubmitting || !hasValidInput}
                    className={cn(
                      'flex h-14 w-full items-center justify-center gap-2 rounded-[1.2rem] text-base font-bold text-white transition-all duration-200',
                      'shadow-[0_18px_36px_-22px_rgba(45,90,39,0.65)]',
                      isSubmitting || !hasValidInput
                        ? 'cursor-not-allowed bg-[#2D5A27]/60'
                        : 'bg-[#2D5A27] hover:bg-[#24491f] active:scale-[0.99]',
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Đang phân tích sơ bộ...
                      </>
                    ) : (
                      <>🧮 Tiến Hành Phân Tích Kỹ Thuật</>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="smart-bom-result"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Phiếu dự toán đã sẵn sàng.</p>
                <p className="text-[13px]">Bạn có thể quay lại chỉnh thông số mà không mất dữ liệu đã nhập.</p>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="shrink-0 text-[#2D5A27] hover:text-[#24491f]"
                onClick={handleResetView}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Tương tác lại Form
              </Button>
            </div>

            {selectedCrop && calculation && areaValue && spacingRowValue && spacingPlantValue ? (
              <BOMReceipt
                cropName={selectedCrop.name}
                locationLabel={profile.provinceName || undefined}
                areaLabel={formatAreaLabel(areaValue)}
                spacingLabel={`${spacingRowValue}m × ${spacingPlantValue}m`}
                calculation={calculation}
                onSendQuote={handleSendQuote}
              />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GlassField({
  id,
  label,
  value,
  onChange,
  suffix,
  hint,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
  hint: string;
  disabled?: boolean;
}) {
  return (
    <FloatingInputField
      id={id}
      type="number"
      inputMode="decimal"
      step="0.1"
      min="0"
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      suffix={suffix}
      hint={hint}
      disabled={disabled}
      className="bg-white/60 backdrop-blur-md"
    />
  );
}
