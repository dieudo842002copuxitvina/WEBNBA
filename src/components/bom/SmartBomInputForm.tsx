import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Loader2, MapPinned, Ruler, Sparkles, Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SmartLocationPicker from '@/components/SmartLocationPicker';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';
import { cn } from '@/lib/utils';
import {
  areaToHectare,
  convertAreaDisplayValue,
  getBomCropOption,
  hectareToDisplayValue,
  normalizeBomCropKey,
  type BomAreaUnit,
  type BomCropKey,
} from '@/components/bom/bomInput.constants';
import CropSelect from '@/components/bom/CropSelect';
import { FloatingInputField } from '@/components/bom/FloatingInputField';
import { trackEvent } from '@/lib/tracking';
import { cropsData } from '@/data/cropData';

export interface SmartBomFormValues {
  cropKey: BomCropKey | '';
  areaValue: string;
  areaUnit: BomAreaUnit;
  spacingRow: string;
  spacingTree: string;
  provinceCode: string;
  provinceName: string;
  districtCode: string;
  districtName: string;
  wardCode: string;
  wardName: string;
  lat: number | null;
  lng: number | null;
}

export interface SmartBomInputPayload {
  cropKey: BomCropKey;
  cropName: string;
  areaUnit: BomAreaUnit;
  areaValue: number;
  areaM2: number;
  areaHa: number;
  spacingRow: number;
  spacingTree: number;
  provinceCode: string;
  provinceName: string;
  districtCode: string;
  districtName: string;
  lat: number | null;
  lng: number | null;
}

interface SmartBomInputFormProps {
  initialCropKey?: string | null;
  initialAreaM2?: string | null;
  onAnalyze: (payload: SmartBomInputPayload) => Promise<void> | void;
  disabled?: boolean;
}

const DEFAULT_VALUES: SmartBomFormValues = {
  cropKey: '',
  areaValue: '',
  areaUnit: 'm2',
  spacingRow: '',
  spacingTree: '',
  provinceCode: '',
  provinceName: '',
  districtCode: '',
  districtName: '',
  wardCode: '',
  wardName: '',
  lat: null,
  lng: null,
};

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function SmartBomInputForm({
  initialCropKey,
  initialAreaM2,
  onAnalyze,
  disabled = false,
}: SmartBomInputFormProps) {
  const { profile, updateProfile, isLoaded } = useFarmerProfile();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const didHydrate = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SmartBomFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isLoaded || didHydrate.current) return;

    const areaFromQuery = initialAreaM2 && Number(initialAreaM2) > 0 ? initialAreaM2 : '';
    const cropFromQuery = normalizeBomCropKey(initialCropKey);
    const cropFromProfile = normalizeBomCropKey(profile.cropKey);

    reset({
      cropKey: cropFromQuery || cropFromProfile,
      areaValue: areaFromQuery || hectareToDisplayValue(profile.areHa),
      areaUnit: areaFromQuery ? 'm2' : profile.areHa ? 'ha' : 'm2',
      spacingRow: '',
      spacingTree: '',
      provinceCode: profile.provinceCode,
      provinceName: profile.provinceName,
      districtCode: profile.districtCode,
      districtName: profile.districtName,
      wardCode: profile.wardCode,
      wardName: profile.wardName,
      lat: profile.lat,
      lng: profile.lng,
    });

    didHydrate.current = true;
  }, [initialAreaM2, initialCropKey, isLoaded, profile, reset]);

  const selectedCropKey = watch('cropKey');
  const areaUnit = watch('areaUnit');
  const selectedCrop = getBomCropOption(selectedCropKey);

  const persistArea = (nextAreaValue: string, nextAreaUnit: BomAreaUnit) => {
    updateProfile({
      areHa: areaToHectare(nextAreaValue, nextAreaUnit),
    });
  };

  const onSubmit = handleSubmit(async (values) => {
    const crop = getBomCropOption(values.cropKey);
    if (!crop) return;

    const areaValue = toNumber(values.areaValue);
    const spacingRow = toNumber(values.spacingRow);
    const spacingTree = toNumber(values.spacingTree);

    if (!areaValue || !spacingRow || !spacingTree) return;

    const areaHa = values.areaUnit === 'ha' ? areaValue : areaValue / 10000;
    const areaM2 = values.areaUnit === 'm2' ? areaValue : areaValue * 10000;

    setIsAnalyzing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 750));

      trackEvent('calculator_used', {
        source: `smart-bom-input-${crop.key}`,
        areaM2,
        provinceCode: values.provinceCode,
      });

      await onAnalyze({
        cropKey: crop.key,
        cropName: crop.name,
        areaUnit: values.areaUnit,
        areaValue,
        areaM2,
        areaHa,
        spacingRow,
        spacingTree,
        provinceCode: values.provinceCode,
        provinceName: values.provinceName,
        districtCode: values.districtCode,
        districtName: values.districtName,
        lat: values.lat,
        lng: values.lng,
      });
    } finally {
      setIsAnalyzing(false);
    }
  });

  return (
    <Card className="overflow-hidden border-white/80 bg-white/95">
      <CardHeader className="space-y-3 border-b border-slate-100 bg-[linear-gradient(135deg,rgba(45,90,39,0.08),rgba(245,124,0,0.04),rgba(255,255,255,0.92))] pb-5">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2D5A27] shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Zero-Friction Input Layer
        </div>
        <div>
          <CardTitle className="font-display text-2xl text-slate-950 md:text-[2rem]">
            Smart BOM Calculator
          </CardTitle>
          <CardDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Chạm vài nhịp là đủ: nhớ tỉnh, cây trồng, diện tích đã lưu trước đó và gom dữ liệu đầu vào sẵn cho tầng phân tích kỹ thuật.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D5A27]/10 text-[#2D5A27]">
                <Sprout className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Bước 1 · Chọn loại cây</p>
                <p className="text-[12px] text-slate-500">4 lựa chọn lớn, không cần mở dropdown.</p>
              </div>
            </div>

            <Controller
              name="cropKey"
              control={control}
              rules={{ required: 'Chọn loại cây để hệ thống gợi ý khoảng cách chuẩn.' }}
              render={({ field }) => (
                <CropSelect
                  value={field.value}
                  onChange={(cropId) => {
                    field.onChange(cropId);
                    const selectedCropData = cropsData.find((crop) => crop.id === cropId);
                    updateProfile({ cropKey: cropId, cropName: selectedCropData?.name ?? '' });
                  }}
                  error={errors.cropKey?.message}
                  disabled={disabled || isAnalyzing}
                />
              )}
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F57C00]/10 text-[#F57C00]">
                <Ruler className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Bước 2 · Diện tích</p>
                <p className="text-[12px] text-slate-500">Mặc định mét vuông, có thể đổi sang hectare ngay cạnh input.</p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-3">
              <FloatingInputField
                id="bom-area"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0"
                label="Diện tích canh tác"
                suffix={areaUnit === 'm2' ? 'm²' : 'ha'}
                error={errors.areaValue?.message}
                hint={areaUnit === 'm2' ? 'Mẹo nhanh: 10.000 m² = 1 ha.' : 'Chế độ đang hiển thị theo hectare.'}
                disabled={disabled || isAnalyzing}
                {...register('areaValue', {
                  required: 'Nhập diện tích để tiếp tục.',
                  validate: (value) => Number(value) > 0 || 'Diện tích phải lớn hơn 0.',
                  onChange: (event) => persistArea(event.target.value, watch('areaUnit')),
                })}
              />

              <Controller
                name="areaUnit"
                control={control}
                render={({ field }) => (
                  <div className="rounded-[1.15rem] border border-slate-200 bg-slate-50 p-1 shadow-sm">
                    <div className="grid grid-cols-2 gap-1">
                      {(['m2', 'ha'] as BomAreaUnit[]).map((unit) => {
                        const active = field.value === unit;

                        return (
                          <button
                            key={unit}
                            type="button"
                            disabled={disabled || isAnalyzing}
                            onClick={() => {
                              if (field.value === unit) return;
                              const convertedAreaValue = convertAreaDisplayValue(
                                watch('areaValue'),
                                field.value,
                                unit,
                              );
                              field.onChange(unit);
                              setValue('areaValue', convertedAreaValue, { shouldDirty: true });
                              persistArea(convertedAreaValue, unit);
                            }}
                            className={cn(
                              'min-w-[54px] rounded-[0.9rem] px-3 py-3 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
                              active
                                ? 'bg-white text-[#2D5A27] shadow-[0_6px_16px_-12px_hsl(122_38%_25%/0.8)]'
                                : 'text-slate-500 hover:text-slate-900',
                            )}
                          >
                            {unit === 'm2' ? 'm²' : 'ha'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              />
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <Ruler className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Bước 3 · Khoảng cách cây</p>
                <p className="text-[12px] text-slate-500">Placeholder đổi theo loại cây để thao tác nhanh hơn ngoài vườn.</p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
              <FloatingInputField
                id="bom-spacing-row"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0"
                label="Hàng cách hàng"
                suffix="m"
                placeholder={selectedCrop?.spacing.row ?? ' '}
                error={errors.spacingRow?.message}
                disabled={disabled || isAnalyzing}
                {...register('spacingRow', {
                  required: 'Nhập khoảng cách hàng.',
                  validate: (value) => Number(value) > 0 || 'Khoảng cách phải lớn hơn 0.',
                })}
              />

              <div className="flex h-14 items-center justify-center pt-1 text-xl font-black text-slate-300">
                ×
              </div>

              <FloatingInputField
                id="bom-spacing-tree"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0"
                label="Cây cách cây"
                suffix="m"
                placeholder={selectedCrop?.spacing.tree ?? ' '}
                error={errors.spacingTree?.message}
                disabled={disabled || isAnalyzing}
                {...register('spacingTree', {
                  required: 'Nhập khoảng cách cây.',
                  validate: (value) => Number(value) > 0 || 'Khoảng cách phải lớn hơn 0.',
                })}
              />
            </div>

            <div className="rounded-2xl bg-[#2D5A27]/5 px-4 py-3 text-[12px] text-slate-600">
              {selectedCrop ? (
                <>
                  Gợi ý cho <span className="font-bold text-[#2D5A27]">{selectedCrop.name}</span>:
                  {' '}
                  {selectedCrop.spacing.row}m × {selectedCrop.spacing.tree}m.
                </>
              ) : (
                <>Chọn loại cây trước để hệ thống hiện gợi ý khoảng cách phù hợp.</>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D5A27]/10 text-[#2D5A27]">
                <MapPinned className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Bước 4 · Vị trí</p>
                <p className="text-[12px] text-slate-500">Tái sử dụng picker GPS để điền tỉnh và huyện nhanh hơn.</p>
              </div>
            </div>

            <Controller
              name="provinceCode"
              control={control}
              rules={{ required: 'Chọn tỉnh hoặc dùng GPS để lấy vị trí.' }}
              render={({ field: provinceField }) => (
                <Controller
                  name="districtCode"
                  control={control}
                  rules={{ required: 'Chọn huyện để hoàn tất đầu vào.' }}
                  render={({ field: districtField }) => (
                    <Controller
                      name="wardCode"
                      control={control}
                      render={({ field: wardField }) => (
                        <SmartLocationPicker
                          floatingLabels
                          provinceCode={provinceField.value}
                          districtCode={districtField.value}
                          wardCode={wardField.value}
                          onProvinceChange={(code, name) => {
                            provinceField.onChange(code);
                            setValue('provinceName', name);
                            setValue('districtCode', '');
                            setValue('districtName', '');
                            setValue('wardCode', '');
                            setValue('wardName', '');
                            updateProfile({
                              provinceCode: code,
                              provinceName: name,
                              districtCode: '',
                              districtName: '',
                              wardCode: '',
                              wardName: '',
                            });
                          }}
                          onDistrictChange={(code, name) => {
                            districtField.onChange(code);
                            setValue('districtName', name);
                            setValue('wardCode', '');
                            setValue('wardName', '');
                            updateProfile({
                              districtCode: code,
                              districtName: name,
                              wardCode: '',
                              wardName: '',
                            });
                          }}
                          onWardChange={(code, name) => {
                            wardField.onChange(code);
                            setValue('wardName', name);
                            updateProfile({ wardCode: code, wardName: name });
                          }}
                          onGeoSuccess={(lat, lng) => {
                            setValue('lat', lat);
                            setValue('lng', lng);
                            updateProfile({ lat, lng });
                          }}
                          provinceError={errors.provinceCode?.message}
                          districtError={errors.districtCode?.message}
                          showWard={false}
                          disabled={disabled || isAnalyzing}
                        />
                      )}
                    />
                  )}
                />
              )}
            />
          </section>

          <button
            type="submit"
            disabled={isAnalyzing || disabled}
            className={cn(
              'flex h-14 w-full items-center justify-center gap-2 rounded-[1.2rem] text-base font-bold text-white transition-all duration-200',
              'shadow-[0_16px_24px_-18px_rgba(245,124,0,0.8)]',
              isAnalyzing || disabled
                ? 'cursor-not-allowed bg-[#F57C00]/75'
                : 'bg-[#F57C00] hover:bg-[#E36F00] active:scale-[0.99]',
            )}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Đang gom dữ liệu đầu vào...
              </>
            ) : disabled ? (
              <>Đang hiển thị kết quả phân tích</>
            ) : (
              <>Tiến Hành Phân Tích Kỹ Thuật</>
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
