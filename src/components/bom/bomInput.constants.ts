import { cropsData } from '@/data/cropData';

export type BomCropKey = string;
export type BomAreaUnit = 'm2' | 'ha';

export interface BomCropOption {
  key: BomCropKey;
  name: string;
  emoji: string;
  accent: string;
  place: string;
  spacing: {
    row: string;
    tree: string;
  };
}

export const BOM_CROP_OPTIONS: BomCropOption[] = [
  {
    key: 'sau-rieng-ri6',
    name: 'Sầu riêng Ri6',
    emoji: '🌳',
    accent: 'from-emerald-100 via-lime-50 to-white',
    place: 'Đồng Tháp · Tiền Giang',
    spacing: { row: '8', tree: '8' },
  },
  {
    key: 'ca-phe-robusta',
    name: 'Cà phê Robusta',
    emoji: '☕',
    accent: 'from-amber-100 via-orange-50 to-white',
    place: 'Đắk Lắk · Lâm Đồng',
    spacing: { row: '3', tree: '3' },
  },
  {
    key: 'ho-tieu-den',
    name: 'Hồ tiêu đen',
    emoji: '🌶️',
    accent: 'from-rose-100 via-orange-50 to-white',
    place: 'Gia Lai · Đắk Nông',
    spacing: { row: '3', tree: '3' },
  },
  {
    key: 'dieu-ghep',
    name: 'Điều ghép',
    emoji: '🌰',
    accent: 'from-yellow-100 via-amber-50 to-white',
    place: 'Bình Phước · Đồng Nai',
    spacing: { row: '8', tree: '8' },
  },
  {
    key: 'cao-su-rriv',
    name: 'Cao su RRIV',
    emoji: '🛡️',
    accent: 'from-slate-100 via-zinc-50 to-white',
    place: 'Gia Lai · Kon Tum',
    spacing: { row: '7', tree: '3' },
  },
  {
    key: 'che-shan-tuyet',
    name: 'Chè Shan tuyết',
    emoji: '🍃',
    accent: 'from-lime-100 via-emerald-50 to-white',
    place: 'Hà Giang · Yên Bái',
    spacing: { row: '1.5', tree: '0.8' },
  },
];

export function getBomCropOption(cropKey?: string | null) {
  return BOM_CROP_OPTIONS.find((crop) => crop.key === cropKey) ?? null;
}

export function normalizeBomCropKey(value?: string | null): BomCropKey | '' {
  if (!value) return '';

  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const cropMap: Record<string, BomCropKey> = {
    'sau-rieng': 'sau-rieng-ri6',
    'sau-rieng-ri6': 'sau-rieng-ri6',
    saurieng: 'sau-rieng-ri6',
    durian: 'sau-rieng-ri6',
    'ca-phe': 'ca-phe-robusta',
    'ca-phe-robusta': 'ca-phe-robusta',
    caphe: 'ca-phe-robusta',
    coffee: 'ca-phe-robusta',
    'ho-tieu': 'ho-tieu-den',
    'ho-tieu-den': 'ho-tieu-den',
    hotieu: 'ho-tieu-den',
    tieu: 'ho-tieu-den',
    pepper: 'ho-tieu-den',
    dieu: 'dieu-ghep',
    'dieu-ghep': 'dieu-ghep',
    cashew: 'dieu-ghep',
    'cao-su': 'cao-su-rriv',
    'cao-su-rriv': 'cao-su-rriv',
    caosu: 'cao-su-rriv',
    rubber: 'cao-su-rriv',
    che: 'che-shan-tuyet',
    tea: 'che-shan-tuyet',
    'che-shan-tuyet': 'che-shan-tuyet',
  };

  if (cropMap[normalized]) {
    return cropMap[normalized];
  }

  const directMatch = cropsData.find((crop) => crop.id === value || crop.slug === normalized);
  if (directMatch) {
    return directMatch.id;
  }

  return '';
}

export function areaToHectare(areaValue: string, areaUnit: BomAreaUnit): number | null {
  const parsed = Number(areaValue);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return areaUnit === 'ha' ? parsed : parsed / 10000;
}

export function hectareToDisplayValue(areaHa: number | null): string {
  if (!areaHa || areaHa <= 0) return '';
  return Number.isInteger(areaHa) ? String(areaHa) : String(Number(areaHa.toFixed(2)));
}

export function convertAreaDisplayValue(
  value: string,
  fromUnit: BomAreaUnit,
  toUnit: BomAreaUnit,
): string {
  if (!value || fromUnit === toUnit) return value;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return value;

  if (fromUnit === 'm2' && toUnit === 'ha') {
    return String(Number((parsed / 10000).toFixed(2)));
  }

  if (fromUnit === 'ha' && toUnit === 'm2') {
    return String(Math.round(parsed * 10000));
  }

  return value;
}
