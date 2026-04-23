export interface MockDealer {
  id: string;
  name: string;
  address: string;
  province: string;
  district: string;
  distance: number; // in km
  isReady: boolean;
  phone: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
}

export const MOCK_DEALERS: MockDealer[] = [
  {
    id: 'dealer-bu-dang',
    name: 'Vật Tư Nông Nghiệp Bù Đăng',
    address: '123 Đường Tôn Đức Thắng, Bù Đăng',
    province: 'Bình Phước',
    district: 'Bù Đăng',
    distance: 3.2,
    isReady: true,
    phone: '0901234567',
    rating: 4.8,
    reviewCount: 142,
    lat: 11.7634,
    lng: 107.2389,
  },
  {
    id: 'dealer-dong-xoai',
    name: 'Đại Lý Phân Bón Đồng Xoài',
    address: '456 Đường Độc Lập, Khu Phố 5',
    province: 'Bình Phước',
    district: 'Đồng Xoài',
    distance: 8.5,
    isReady: true,
    phone: '0902345678',
    rating: 4.6,
    reviewCount: 98,
    lat: 11.5452,
    lng: 107.0329,
  },
  {
    id: 'dealer-tan-phu',
    name: 'Trạm Cấp Vật Tư Tân Phú',
    address: '789 Quốc Lộ 1A, Thị Trấn Tân Phú',
    province: 'Đồng Nai',
    district: 'Tân Phú',
    distance: 5.1,
    isReady: true,
    phone: '0903456789',
    rating: 4.7,
    reviewCount: 165,
    lat: 10.8742,
    lng: 107.1451,
  },
  {
    id: 'dealer-ha-tien',
    name: 'Cửa Hàng Tưới Nhỏ Giọt Hà Tiên',
    address: '321 Tỉnh Lộ 8, Hà Tiên',
    province: 'Kiên Giang',
    district: 'Hà Tiên',
    distance: 15.3,
    isReady: false,
    phone: '0904567890',
    rating: 4.5,
    reviewCount: 76,
    lat: 10.3801,
    lng: 104.6722,
  },
  {
    id: 'dealer-bien-hoa',
    name: 'Kho Cung Cấp Nông Nghiệp Biên Hòa',
    address: '555 Đường Võ Nguyên Giáp, Biên Hòa',
    province: 'Đồng Nai',
    district: 'Biên Hòa',
    distance: 12.7,
    isReady: true,
    phone: '0905678901',
    rating: 4.9,
    reviewCount: 203,
    lat: 10.9388,
    lng: 106.8242,
  },
];
