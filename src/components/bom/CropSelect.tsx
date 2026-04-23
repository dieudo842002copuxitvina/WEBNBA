import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Coffee,
  Leaf,
  Search,
  Shield,
  Sprout,
  Trees,
  type LucideIcon,
} from 'lucide-react';
import { cropsData, type Crop, type CropRegion } from '@/data/cropData';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface CropSelectProps {
  value: string;
  onChange: (cropId: string) => void;
  disabled?: boolean;
  error?: string;
}

const REGION_ORDER: CropRegion[] = ['TayNguyen', 'DongNamBo', 'DBSCL', 'MienBac'];

const REGION_META: Record<CropRegion, { title: string }> = {
  TayNguyen: { title: '🌿 Cây vùng Tây Nguyên' },
  DongNamBo: { title: '☀️ Cây vùng Đông Nam Bộ' },
  DBSCL: { title: '🌊 Cây vùng Đồng bằng sông Cửu Long' },
  MienBac: { title: '🍃 Cây vùng Miền Bắc' },
};

const CROP_ICON_MAP: Record<string, LucideIcon> = {
  Trees,
  Coffee,
  Leaf,
  Shield,
  Sprout,
};

function normalizeSearchValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getCropIcon(iconName: string): LucideIcon {
  return CROP_ICON_MAP[iconName] ?? Sprout;
}

export default function CropSelect({
  value,
  onChange,
  disabled = false,
  error,
}: CropSelectProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectedCrop = useMemo(
    () => cropsData.find((crop) => crop.id === value) ?? null,
    [value],
  );

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [open]);

  const groupedCrops = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query);

    const filtered = cropsData.filter((crop) => {
      if (!normalizedQuery) return true;

      const haystack = [
        crop.name,
        crop.slug,
        crop.id,
        crop.description_snippet,
      ]
        .map((entry) => normalizeSearchValue(entry))
        .join(' ');

      return haystack.includes(normalizedQuery);
    });

    return REGION_ORDER.map((region) => ({
      region,
      title: REGION_META[region].title,
      items: filtered
        .filter((crop) => crop.region === region)
        .sort((left, right) => left.name.localeCompare(right.name, 'vi')),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  const trigger = (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex min-h-[60px] w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200',
        'disabled:cursor-not-allowed disabled:opacity-60',
        selectedCrop
          ? 'border-[#2D5A27] bg-white shadow-[0_0_0_4px_hsl(122_38%_25%/0.08)]'
          : 'border-slate-200 bg-white hover:border-[#2D5A27]/45',
        error && 'border-destructive/70 shadow-[0_0_0_4px_hsl(0_72%_51%/0.08)]',
      )}
      aria-expanded={open}
      aria-haspopup="dialog"
      role="combobox"
      onClick={() => {
        if (!disabled) setOpen(true);
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            selectedCrop ? 'bg-[#2D5A27]/10 text-[#2D5A27]' : 'bg-slate-100 text-slate-500',
          )}
        >
          {selectedCrop ? (
            <CropIcon crop={selectedCrop} className="h-5 w-5" />
          ) : (
            <Search className="h-4.5 w-4.5" />
          )}
        </span>

        <div className="min-w-0">
          {selectedCrop ? (
            <>
              <p className="truncate text-sm font-bold text-slate-900">{selectedCrop.name}</p>
              <p className="truncate text-[12px] text-slate-500">{REGION_META[selectedCrop.region].title.replace(/^[^\s]+\s/, '')}</p>
            </>
          ) : (
            <p className="text-sm font-medium text-slate-500">
              🔍 Chọn loại cây trồng (Ví dụ: Sầu riêng, Cà phê...)
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {selectedCrop ? <CheckCircle2 className="h-5 w-5 text-[#2D5A27]" /> : null}
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </div>
    </button>
  );

  return (
    <div className="space-y-2">
      {isMobile ? (
        <>
          {trigger}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="max-h-[88vh] rounded-t-[1.5rem] border-[#2D5A27]/10 bg-white px-0">
              <DrawerHeader className="pb-2">
                <DrawerTitle className="font-display text-xl text-slate-950">Chọn loại cây trồng</DrawerTitle>
                <DrawerDescription>
                  Tìm nhanh theo tên cây, rồi chạm vào thẻ để chọn.
                </DrawerDescription>
              </DrawerHeader>
              <CropSelectPanel
                query={query}
                onQueryChange={setQuery}
                groupedCrops={groupedCrops}
                selectedValue={value}
                inputRef={inputRef}
                onSelect={(cropId) => {
                  onChange(cropId);
                  setOpen(false);
                }}
                compact
              />
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={8}
            className="w-[min(46rem,calc(100vw-2rem))] rounded-2xl border border-[#2D5A27]/10 bg-white p-0 shadow-[0_24px_60px_-32px_rgba(45,90,39,0.35)]"
          >
            <CropSelectPanel
              query={query}
              onQueryChange={setQuery}
              groupedCrops={groupedCrops}
              selectedValue={value}
              inputRef={inputRef}
              onSelect={(cropId) => {
                onChange(cropId);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      )}

      {error ? (
        <p className="flex items-center gap-1 text-[11px] font-medium text-destructive">
          <span className="h-1 w-1 rounded-full bg-destructive" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CropSelectPanel({
  query,
  onQueryChange,
  groupedCrops,
  selectedValue,
  onSelect,
  inputRef,
  compact = false,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  groupedCrops: Array<{ region: CropRegion; title: string; items: Crop[] }>;
  selectedValue: string;
  onSelect: (cropId: string) => void;
  inputRef: RefObject<HTMLInputElement>;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <Command shouldFilter={false} className="bg-white">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur">
          <CommandInput
            ref={inputRef}
            value={query}
            onValueChange={onQueryChange}
            placeholder="Tìm cây trồng... ví dụ: Tiêu, Cà phê, Điều"
            className="h-12 text-sm"
          />
        </div>

        <CommandList className={cn('max-h-[min(68vh,34rem)] px-4 pb-4', compact && 'max-h-[60vh]')}>
          {groupedCrops.length === 0 ? (
            <CommandEmpty>Không tìm thấy loại cây phù hợp.</CommandEmpty>
          ) : (
            groupedCrops.map((group) => (
              <CommandGroup
                key={group.region}
                heading={group.title}
                className="px-0 py-3 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-0 [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-slate-500"
              >
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {group.items.map((crop) => (
                    <CropMiniCard
                      key={crop.id}
                      crop={crop}
                      selected={selectedValue === crop.id}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              </CommandGroup>
            ))
          )}
        </CommandList>
      </Command>
    </motion.div>
  );
}

function CropMiniCard({
  crop,
  selected,
  onSelect,
}: {
  crop: Crop;
  selected: boolean;
  onSelect: (cropId: string) => void;
}) {
  return (
    <CommandItem
      value={`${crop.name} ${crop.slug} ${crop.id}`}
      onSelect={() => onSelect(crop.id)}
      className={cn(
        'group relative min-h-[72px] rounded-xl border border-transparent bg-gray-50 px-3 py-3 text-left transition-all duration-200',
        'hover:bg-[#2D5A27]/10 data-[selected=true]:bg-[#2D5A27]/10 data-[selected=true]:text-[#1E3D1A]',
        selected && 'border-[#2D5A27]/25 bg-[#2D5A27]/10 text-[#1E3D1A]',
      )}
    >
      <div className="flex w-full items-start gap-2.5">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#2D5A27] shadow-sm">
          <CropIcon crop={crop} className="h-4.5 w-4.5" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold leading-snug">{crop.name}</p>
        </div>

        {selected ? (
          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2D5A27] text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        ) : null}
      </div>
    </CommandItem>
  );
}

function CropIcon({ crop, className }: { crop: Crop; className?: string }) {
  const Icon = getCropIcon(crop.icon);
  return <Icon className={className} />;
}
