import { ArrowLeft, Calculator } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import SeoMeta from '@/components/SeoMeta';
import SmartBOMForm from '@/components/bom/SmartBOMForm';
import { Button } from '@/components/ui/button';

export default function BomEstimatorPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(45,90,39,0.06),rgba(248,250,252,0.96)_22%,rgba(245,124,0,0.05)_100%)]">
      <SeoMeta
        title="Smart BOM Calculator - Dự toán vật tư tưới | Nhà Bè Agri"
        description="Nhập nhanh cây trồng, diện tích và khoảng cách để nhận dự toán vật tư tưới sơ bộ với SmartBOMForm của Nhà Bè Agri."
        canonical="/cong-cu/du-toan-tuoi"
      />

      <div className="container max-w-5xl py-6 md:py-10">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 gap-1.5">
          <Link to="/cong-cu">
            <ArrowLeft className="h-4 w-4" />
            Tất cả công cụ
          </Link>
        </Button>

        <div className="mb-6 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2D5A27]/15 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2D5A27] shadow-sm">
            <Calculator className="h-3.5 w-3.5" />
            Smart BOM Calculator
          </div>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Dự toán vật tư tưới, gọn thao tác và nhớ dữ liệu cũ.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            SmartBOMForm là lớp lắp ráp hoàn chỉnh cho công cụ dự toán: chọn cây, gợi ý khoảng cách, nhớ nháp cục bộ và chuyển sang phiếu kết quả thật mượt.
          </p>
        </div>

        <SmartBOMForm
          initialCropId={searchParams.get('crop')}
          initialAreaM2={searchParams.get('area')}
        />
      </div>
    </div>
  );
}
