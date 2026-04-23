export interface Dealer {
  id: string;
  name: string;
  type: 'head-office' | 'branch' | 'dealer';
  address: string;
  region: string;
  services?: string[];
  lat: number;
  lng: number;
  phone: string;
}

export const dealersData: Dealer[] = [
  {
    id: '1',
    name: 'Tổng kho Nhà Bè Agri (HCM)',
    type: 'head-office',
    address: 'Số 20 Khu Biệt Thự Ngân Long, Đường Nguyễn Hữu Thọ, Phước Kiển, Nhà Bè, TP. Hồ Chí Minh',
    region: 'Hồ Chí Minh',
    lat: 10.7107,
    lng: 106.7088,
    phone: '1900000001',
    // Tổng kho không có mảng services theo yêu cầu
  },
  {
    id: '2',
    name: 'VPĐD Gia Lai',
    type: 'branch',
    address: '123 Trường Chinh, Pleiku, Gia Lai',
    region: 'Gia Lai',
    services: ['Tư vấn kỹ thuật', 'Bảo hành chính hãng'],
    lat: 13.9833,
    lng: 108.0000,
    phone: '1900000002',
  },
  {
    id: '3',
    name: 'Đại lý Nông nghiệp Xanh Đồng Nai',
    type: 'dealer',
    address: '456 Võ Nguyên Giáp, Trảng Bom, Đồng Nai',
    region: 'Đồng Nai',
    services: ['Khảo sát địa hình', 'Thi công lắp đặt', 'Giao hàng tận nơi'],
    lat: 10.9333,
    lng: 107.0000,
    phone: '0901234567',
  },
  {
    id: '4',
    name: 'Đại lý Tưới Tiêu Đắk Lắk',
    type: 'dealer',
    address: '789 Nguyễn Tất Thành, Buôn Ma Thuột, Đắk Lắk',
    region: 'Đắk Lắk',
    services: ['Tư vấn thiết kế', 'Thi công', 'Bảo trì định kỳ'],
    lat: 12.6667,
    lng: 108.0333,
    phone: '0987654321',
  }
];
