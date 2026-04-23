import { useMemo } from 'react';
import { Dealer, DEALERS_DATA } from '@/data/dealersData';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';

export interface GeoRoutingResult {
  sortedDealers: Dealer[];
  headOffice: Dealer | null;
  currentProvince: string | null;
  currentDistrict: string | null;
  hasLocalDealers: boolean;
  needsFallback: boolean;
  fallbackMessage?: string;
}

export function useGeoRouting(): GeoRoutingResult {
  const { profile } = useFarmerProfile();

  const result = useMemo(() => {
    const headOffice = DEALERS_DATA.find((d) => d.type === 'head-office');
    const dealers = [...DEALERS_DATA];

    if (!profile.provinceName) {
      return {
        sortedDealers: dealers,
        headOffice: headOffice || null,
        currentProvince: null,
        currentDistrict: null,
        hasLocalDealers: false,
        needsFallback: false,
      };
    }

    // Check if province matches any dealer
    const sameProvince = dealers.filter((d) => d.province === profile.provinceName);
    const hasLocalDealers = sameProvince.length > 0;

    // If NO local dealers, add fallback with HQ at top
    if (!hasLocalDealers && headOffice) {
      return {
        sortedDealers: [headOffice, ...dealers.filter((d) => d.type !== 'head-office')],
        headOffice,
        currentProvince: profile.provinceName,
        currentDistrict: profile.districtName,
        hasLocalDealers: false,
        needsFallback: true,
        fallbackMessage: `Khu vực ${profile.provinceName} chưa có đại lý ủy quyền. Tổng kho Hồ Chí Minh sẽ trực tiếp xử lý và giao hàng tận rẫy cho bạn!`,
      };
    }

    // Otherwise, prioritize: HQ → same province → others
    const prioritized = [
      ...(headOffice ? [headOffice] : []),
      ...sameProvince,
      ...dealers.filter(
        (d) => d.type !== 'head-office' && d.province !== profile.provinceName
      ),
    ];

    return {
      sortedDealers: prioritized,
      headOffice: headOffice || null,
      currentProvince: profile.provinceName,
      currentDistrict: profile.districtName,
      hasLocalDealers: true,
      needsFallback: false,
    };
  }, [profile.provinceName, profile.districtName]);

  return result;
}
