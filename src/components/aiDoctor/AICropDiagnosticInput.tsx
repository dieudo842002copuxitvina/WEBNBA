import { useRef } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AICropDiagnosticInputProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
  hasImage?: boolean;
  imagePreviewUrl?: string | null;
  onReset?: () => void;
}

export function AICropDiagnosticInput({
  onImageSelect,
  isLoading = false,
  hasImage = false,
  imagePreviewUrl = null,
  onReset,
}: AICropDiagnosticInputProps) {
  const fileInputMobileRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputDesktopRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    onImageSelect(file);
  };

  const handleMobileCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDesktopFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('border-[#2D5A27]', 'bg-[#2D5A27]/5');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-[#2D5A27]', 'bg-[#2D5A27]/5');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-[#2D5A27]', 'bg-[#2D5A27]/5');
    }

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <>
      {/* MOBILE VERSION */}
      <div className="md:hidden space-y-4">
        {!hasImage ? (
          <>
            {/* Big Capture Button */}
            <label
              htmlFor="mobile-camera-input"
              className="block cursor-pointer"
            >
              <button
                type="button"
                className={cn(
                  'w-full h-64 rounded-3xl border-2 border-[#2D5A27]/20 bg-gradient-to-b from-[#2D5A27]/10 to-[#2D5A27]/5',
                  'flex flex-col items-center justify-center gap-4 transition-all duration-300',
                  'active:scale-95 hover:border-[#2D5A27]/40 hover:bg-[#2D5A27]/8',
                  isLoading && 'opacity-50 cursor-not-allowed'
                )}
                disabled={isLoading}
              >
                <Camera className="h-16 w-16 text-[#2D5A27]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">📸 Chụp Ảnh Cây Bệnh</p>
                  <p className="text-xs text-slate-500 mt-1">Sử dụng camera của điện thoại</p>
                </div>
              </button>
            </label>

            <input
              ref={fileInputMobileRef}
              id="mobile-camera-input"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleMobileCapture}
              disabled={isLoading}
              className="hidden"
            />

            {/* Alt: Upload from library */}
            <label
              htmlFor="mobile-gallery-input"
              className="block cursor-pointer"
            >
              <button
                type="button"
                className={cn(
                  'w-full h-14 rounded-2xl border border-slate-300 bg-white',
                  'flex items-center justify-center gap-2 font-semibold text-slate-700',
                  'transition-all duration-300 active:scale-95',
                  'hover:border-[#2D5A27]/50 hover:bg-[#2D5A27]/5',
                  isLoading && 'opacity-50 cursor-not-allowed'
                )}
                disabled={isLoading}
              >
                <ImageIcon className="h-5 w-5" />
                Hoặc tải từ thư viện
              </button>
            </label>

            <input
              id="mobile-gallery-input"
              type="file"
              accept="image/*"
              onChange={handleMobileCapture}
              disabled={isLoading}
              className="hidden"
            />
          </>
        ) : (
          /* Image Preview + Actions */
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
              <img
                src={imagePreviewUrl || ''}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <Button
              onClick={onReset}
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              🔄 Chọn Ảnh Khác
            </Button>
          </div>
        )}
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden md:block">
        {!hasImage ? (
          <>
            {/* Drag & Drop Zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputDesktopRef.current?.click()}
              className={cn(
                'relative w-full aspect-video rounded-3xl border-2 border-dashed border-slate-300',
                'bg-gradient-to-b from-slate-50/50 to-white',
                'flex flex-col items-center justify-center gap-4',
                'cursor-pointer transition-all duration-300',
                'hover:border-[#2D5A27]/50 hover:bg-[#2D5A27]/5',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="text-center">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <p className="text-lg font-bold text-slate-900 mb-1">
                  Kéo thả ảnh lá/rễ cây bệnh vào đây
                </p>
                <p className="text-sm text-slate-500">
                  hoặc <span className="font-semibold text-[#2D5A27]">click để duyệt file</span>
                </p>
              </div>

              <div className="text-xs text-slate-400 mt-2">
                Hỗ trợ: JPG, PNG, WebP (tối đa 5MB)
              </div>
            </div>

            <input
              ref={fileInputDesktopRef}
              type="file"
              accept="image/*"
              onChange={handleDesktopFileSelect}
              disabled={isLoading}
              className="hidden"
            />
          </>
        ) : (
          /* Image Preview + Actions */
          <div className="space-y-6">
            <div className="relative w-full aspect-video overflow-hidden rounded-3xl shadow-2xl border border-white/20">
              <img
                src={imagePreviewUrl || ''}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onReset}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                🔄 Chọn Ảnh Khác
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
