export interface Dealer {
  id: string;
  name: string;
  type: 'head-office' | 'branch' | 'dealer';
  region: string;
  address: string;
  province: string;
  district: string;
  phone?: string;
  hours?: string;
  isHeadOffice?: boolean;
  services?: string[];
  lat?: number;
  lng?: number;
}

export const dealersData: Dealer[] = [
  { id: 'hq-hcm', name: 'NHÀ BÈ AGRI || HỒ CHÍ MINH HEAD OFFICE', type: 'head-office', region: 'Miền Nam', address: 'Nhà Bè', province: 'Hồ Chí Minh', district: 'Nhà Bè', phone: '0983230879', isHeadOffice: true, lat: 10.6725, lng: 106.7329 },
  { id: 'vp-gialai', name: 'VP Gia Lai', type: 'branch', region: 'Tây Nguyên', address: 'Pleiku', province: 'Gia Lai', district: 'Pleiku', phone: '0969070077', services: ['Tư vấn dự án lớn'], lat: 13.9782, lng: 108.0069 },
  { id: 'vp-daklak', name: 'VP Đắk Lắk', type: 'branch', region: 'Tây Nguyên', address: 'Krông Búk', province: 'Đắk Lắk', district: 'Krông Búk', phone: '0348877939', services: ['Tư vấn dự án lớn'], lat: 12.9234, lng: 108.2045 },
  { id: 'vp-lamdong', name: 'VP Lâm Đồng', type: 'branch', region: 'Tây Nguyên', address: 'Đức Trọng', province: 'Lâm Đồng', district: 'Đức Trọng', phone: '0355430003', services: ['Tư vấn dự án lớn'], lat: 11.7283, lng: 108.2713 },
  { id: 'vp-hanoi', name: 'VP Hà Nội', type: 'branch', region: 'Miền Bắc', address: 'Gia Lâm', province: 'Hà Nội', district: 'Gia Lâm', phone: '0944961555', services: ['Tư vấn dự án lớn'], lat: 21.0182, lng: 105.9324 },
  { id: 'vp-dongnai', name: 'VP Đồng Nai', type: 'branch', region: 'Miền Nam', address: 'Cẩm Mỹ', province: 'Đồng Nai', district: 'Cẩm Mỹ', phone: '0345791468', services: ['Tư vấn dự án lớn'], lat: 10.7712, lng: 107.1953 },
  { id: 'dl-theanh', name: 'Driptec Thế Anh', type: 'dealer', region: 'Miền Trung', address: 'Sông Hinh', province: 'Phú Yên', district: 'Sông Hinh', lat: 12.9341, lng: 108.9712, services: ['Cung cấp phụ kiện lẻ'] },
  { id: 'dl-huuthien', name: 'Driptec Hữu Thiện', type: 'dealer', region: 'Tây Nguyên', address: 'Krông Búk', province: 'Đắk Lắk', district: 'Krông Búk', lat: 12.9100, lng: 108.2100, services: ['Thi công tận rẫy'] },
  { id: 'dl-nonghung', name: 'Nông Hưng', type: 'dealer', region: 'Tây Nguyên', address: 'Đắk Song', province: 'Đắk Nông', district: 'Đắk Song', lat: 12.2413, lng: 107.6042, services: ['Tư vấn kỹ thuật'] },
  { id: 'dl-ungdung', name: 'Giải pháp Công nghệ Ứng dụng', type: 'dealer', region: 'Miền Nam', address: 'Cao Lãnh', province: 'Đồng Tháp', district: 'Cao Lãnh', lat: 10.4578, lng: 105.6329, services: ['Lắp đặt tận rẫy'] },
  { id: 'dl-thailoi', name: 'Thái Lợi', type: 'dealer', region: 'Tây Nguyên', address: 'Phú Thiện', province: 'Gia Lai', district: 'Phú Thiện', lat: 13.5684, lng: 108.3195, services: ['Cung cấp phụ kiện lẻ'] },
  { id: 'dl-giabach', name: 'Gia Bách', type: 'dealer', region: 'Miền Nam', address: 'Xuân Tây', province: 'Đồng Nai', district: 'Cẩm Mỹ', lat: 10.7600, lng: 107.2000, services: ['Lắp đặt tận rẫy'] },
  { id: 'dl-diennuocdaknong', name: 'Thế giới điện nước Đắk Nông', type: 'dealer', region: 'Tây Nguyên', address: 'Gia Nghĩa', province: 'Đắk Nông', district: 'Gia Nghĩa', lat: 11.9965, lng: 107.6974, services: ['Cung cấp phụ kiện lẻ'] },
  { id: 'dl-quoctu', name: 'Quốc Tú', type: 'dealer', region: 'Miền Nam', address: 'Bù Đăng', province: 'Bình Phước', district: 'Bù Đăng', lat: 11.7589, lng: 107.1356, services: ['Tư vấn kỹ thuật'] },
  { id: 'dl-thanhnhung', name: 'Thành Nhung', type: 'dealer', region: 'Miền Nam', address: 'Tân Châu', province: 'Tây Ninh', district: 'Tân Châu', lat: 11.5794, lng: 106.1362, services: ['Lắp đặt tận rẫy'] },
  { id: 'dl-lamtuan', name: 'Lâm Tuấn', type: 'dealer', region: 'Miền Nam', address: 'Đức Linh', province: 'Bình Thuận', district: 'Đức Linh', lat: 11.1643, lng: 107.5756, services: ['Cung cấp phụ kiện lẻ'] },
  { id: 'dl-quoctho', name: 'Quốc Thọ', type: 'dealer', region: 'Miền Nam', address: 'Tân Thành', province: 'Tây Ninh', district: 'Tân Thành', lat: 11.3916, lng: 106.1152, services: ['Thi công tận rẫy'] },
  { id: 'dl-autotutuoi', name: 'Autotutuoi', type: 'dealer', region: 'Miền Nam', address: 'Vĩnh Cửu', province: 'Đồng Nai', district: 'Vĩnh Cửu', lat: 11.0264, lng: 106.9697, services: ['Tư vấn kỹ thuật'] },
  { id: 'dl-thaiviet', name: 'Thái Việt', type: 'dealer', region: 'Miền Nam', address: 'Bình Tân', province: 'Hồ Chí Minh', district: 'Bình Tân', lat: 10.7412, lng: 106.5937, services: ['Cung cấp phụ kiện lẻ'] },
  { id: 'dl-lehatgiong', name: 'Lễ Hạt Giống', type: 'dealer', region: 'Miền Trung', address: 'Hàm Thuận Bắc', province: 'Bình Thuận', district: 'Hàm Thuận Bắc', lat: 11.0963, lng: 108.0645, services: ['Thi công tận rẫy'] },
  { id: 'dl-congro', name: 'Công Rô', type: 'dealer', region: 'Miền Trung', address: 'Phan Rang', province: 'Ninh Thuận', district: 'Phan Rang-Tháp Chàm', lat: 11.5644, lng: 108.9950, services: ['Lắp đặt tận rẫy'] },
  { id: 'dl-ngaquy', name: 'Nga Quý', type: 'dealer', region: 'Miền Nam', address: 'Xuân Tây', province: 'Đồng Nai', district: 'Cẩm Mỹ', lat: 10.7500, lng: 107.1900, services: ['Tư vấn kỹ thuật'] },
  { id: 'dl-hoathanh', name: 'Hòa Thành', type: 'dealer', region: 'Miền Nam', address: 'Định Quán', province: 'Đồng Nai', district: 'Định Quán', lat: 11.1895, lng: 107.2882, services: ['Cung cấp phụ kiện lẻ'] },
  { id: 'dl-truonggiang', name: 'Trường Giang', type: 'dealer', region: 'Miền Trung', address: 'Tánh Linh', province: 'Bình Thuận', district: 'Tánh Linh', lat: 11.1687, lng: 107.6970, services: ['Lắp đặt tận rẫy'] },
  { id: 'dl-haphuong2', name: 'Hà Phường 2', type: 'dealer', region: 'Miền Trung', address: 'Ninh Hòa', province: 'Khánh Hòa', district: 'Ninh Hòa', lat: 12.4952, lng: 109.1235, services: ['Thi công tận rẫy'] }
];
