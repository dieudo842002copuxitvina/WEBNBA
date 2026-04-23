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
}

export const dealersData: Dealer[] = [
  { id: 'hq-hcm', name: 'NHÀ BÈ AGRI || HỒ CHÍ MINH HEAD OFFICE', type: 'head-office', region: 'Miền Nam', address: 'Số 25, Khu Biệt Thự Ngân Long, Đường Nguyễn Hữu Thọ, X. Phước Kiển', province: 'Hồ Chí Minh', district: 'Nhà Bè', phone: '0983230879', hours: '8h00-17h00', isHeadOffice: true },
  { id: 'vp-gialai', name: 'NHÀ BÈ AGRI || VP GIA LAI', type: 'branch', region: 'Tây Nguyên', address: '556 Trường Chinh, Phường Chi Lăng', province: 'Gia Lai', district: 'Pleiku', phone: '0969070077', hours: '08h00-17h00', services: ['Thiết kế bản vẽ tưới', 'Cung cấp vật tư sỉ', 'Tư vấn dự án lớn'] },
  { id: 'vp-daklak', name: 'NHÀ BÈ AGRI || VP ĐĂK LẮK', type: 'branch', region: 'Tây Nguyên', address: 'Ngã 3 KoretVina, Thôn 13, Xã PơngDrang', province: 'Đắk Lắk', district: 'Krông Búk', phone: '0348877939', hours: '8h00 - 17h00', services: ['Thiết kế bản vẽ tưới', 'Cung cấp vật tư sỉ', 'Tư vấn dự án lớn'] },
  { id: 'vp-lamdong', name: 'NHÀ BÈ AGRI || VP LÂM ĐỒNG', type: 'branch', region: 'Tây Nguyên', address: '21 Nguyễn Thị Định', province: 'Lâm Đồng', district: 'Đức Trọng', phone: '0355430003', hours: '8h00 - 17h00', services: ['Thiết kế bản vẽ tưới', 'Cung cấp vật tư sỉ', 'Tư vấn dự án lớn'] },
  { id: 'vp-hanoi', name: 'NHÀ BÈ AGRI || VP HÀ NỘI', type: 'branch', region: 'Miền Bắc', address: 'TT11-04, ngõ 22 Cửu Việt, Trâu Qùy', province: 'Hà Nội', district: 'Gia Lâm', phone: '0944961555', services: ['Thiết kế bản vẽ tưới', 'Cung cấp vật tư sỉ', 'Tư vấn dự án lớn'] },
  { id: 'vp-dongnai', name: 'NHÀ BÈ AGRI || VP ĐỒNG NAI', type: 'branch', region: 'Miền Nam', address: 'QL56, Duyên Lãng', province: 'Đồng Nai', district: 'Cẩm Mỹ', phone: '0345791468', services: ['Thiết kế bản vẽ tưới', 'Cung cấp vật tư sỉ', 'Tư vấn dự án lớn'] },
  { id: 'dl-theanh', name: 'DRIPTEC THẾ ANH', type: 'dealer', region: 'Miền Trung', address: 'Thôn Eamkeng , Xã Eabar', province: 'Phú Yên', district: 'Sông Hinh', phone: '0346888599', services: ['Thiết kế bản vẽ tưới', 'Cung cấp phụ kiện lẻ', 'Tư vấn kỹ thuật'] },
  { id: 'dl-huuthien', name: 'DRIPTEC HỮU THIỆN', type: 'dealer', region: 'Tây Nguyên', address: 'Km46, thị trấn Pơ Drang', province: 'Đắk Lắk', district: 'Krông Búk', phone: '0944764008', services: ['Thi công hệ thống tưới dốc', 'Bảo hành tại vườn', 'Tư vấn dinh dưỡng'] },
  { id: 'dl-nonghung', name: 'Đại lý Nông Hưng', type: 'dealer', region: 'Tây Nguyên', address: '7J46+X6F', province: 'Đắk Nông', district: 'Đắk Song', services: ['Thi công hệ thống tưới dốc', 'Bảo hành tại vườn', 'Tư vấn dinh dưỡng'] },
  { id: 'dl-ungdung', name: 'CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ ỨNG DỤNG', type: 'dealer', region: 'Miền Nam', address: '77-79 Nguyễn Đình Chiểu, Phường 1', province: 'Đồng Tháp', district: 'Cao Lãnh', phone: '0945810810', services: ['Lắp đặt tưới tự động', 'Tư vấn cải tạo đất', 'Giao hàng tận rẫy'] },
  { id: 'dl-thailoi', name: 'Cửa hàng Thái Lợi', type: 'dealer', region: 'Tây Nguyên', address: '386 Hùng Vương, Thị trấn Phú Thiện', province: 'Gia Lai', district: 'Phú Thiện', phone: '0963750153', services: ['Thi công hệ thống tưới dốc', 'Bảo hành tại vườn', 'Tư vấn dinh dưỡng'] },
  { id: 'dl-giabach', name: 'Cửa hàng Gia Bách', type: 'dealer', region: 'Miền Nam', address: 'Ấp 7, xã Xuân Tây', province: 'Đồng Nai', district: 'Cẩm Mỹ', phone: '0343954508', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-diennuocdaknong', name: 'Thế giới điện nước Đắk Nông', type: 'dealer', region: 'Tây Nguyên', address: '205 Quang Trung, Phường Nghĩa Tân', province: 'Đắk Nông', district: 'Gia Nghĩa', phone: '0358722799', services: ['Thi công hệ thống tưới dốc', 'Bảo hành tại vườn', 'Tư vấn dinh dưỡng'] },
  { id: 'dl-quoctu', name: 'Cửa hàng Quốc Tú', type: 'dealer', region: 'Miền Nam', address: 'Khu Đức Thọ, Thị trấn Đức Phong', province: 'Bình Phước', district: 'Bù Đăng', phone: '0834560958', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-thanhnhung', name: 'Đại lí Thành Nhung', type: 'dealer', region: 'Miền Nam', address: 'Số 16 Ấp Hội Phú, Tân Châu', province: 'Tây Ninh', district: 'Tân Châu', phone: '0909764059', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-lamtuan', name: 'Cửa hàng điện nước Lâm Tuấn', type: 'dealer', region: 'Miền Nam', address: '113 ĐT713, Đức Hạnh', province: 'Bình Thuận', district: 'Đức Linh', phone: '0787558332', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-quoctho', name: 'HKD Điện Nước Quốc Thọ', type: 'dealer', region: 'Miền Nam', address: 'Tổ 04, Ấp 07, Xã Tân Thành', province: 'Tây Ninh', district: 'Tân Thành', phone: '0389655652', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-autotutuoi', name: 'CÔNG TY TNHH GIẢI PHÁP AUTOTUTUOI', type: 'dealer', region: 'Miền Nam', address: '160 Hương lộ 15, Ấp 5, Xã Thạnh Phú', province: 'Đồng Nai', district: 'Vĩnh Cửu', phone: '0355863232', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-thaiviet', name: 'CÔNG TY THƯƠNG MẠI DỊCH VỤ THÁI VIỆT', type: 'dealer', region: 'Miền Nam', address: 'Số 62 Đường số 6, Phường An Lạc', province: 'Hồ Chí Minh', district: 'Bình Tân', phone: '0908881880', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-lehatgiong', name: 'CH NPP LỄ HẠT GIỐNG', type: 'dealer', region: 'Miền Trung', address: '213 QL1A, TT. Phú Long', province: 'Bình Thuận', district: 'Hàm Thuận Bắc', phone: '0917872111', services: ['Thiết kế bản vẽ tưới', 'Cung cấp phụ kiện lẻ', 'Tư vấn kỹ thuật'] },
  { id: 'dl-congro', name: 'CÔNG TY TM XÂY DỰNG & MÔI TRƯỜNG CÔNG RÔ', type: 'dealer', region: 'Miền Trung', address: 'Đường Nguyễn Văn Nhu, Khu phố 5, Phường Mỹ Bình', province: 'Ninh Thuận', district: 'Phan Rang-Tháp Chàm', phone: '0931223334', services: ['Thiết kế bản vẽ tưới', 'Cung cấp phụ kiện lẻ', 'Tư vấn kỹ thuật'] },
  { id: 'dl-ngaquy', name: 'CH Điện Nước Nga Quý', type: 'dealer', region: 'Miền Nam', address: 'Tổ 6, Ấp 6, Xuân Tây', province: 'Đồng Nai', district: 'Cẩm Mỹ', phone: '0988290624', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-hoathanh', name: 'Cửa hàng điện nước Hoà Thành', type: 'dealer', region: 'Miền Nam', address: 'TT. Định Quán', province: 'Đồng Nai', district: 'Định Quán', phone: '0928895724', services: ['Khảo sát địa hình miễn phí', 'Cung cấp phụ kiện lẻ', 'Hỗ trợ kỹ thuật 24/7'] },
  { id: 'dl-truonggiang', name: 'Cửa hàng vật tư nông nghiệp Trường Giang', type: 'dealer', region: 'Miền Trung', address: '103 DT720, Thôn 8, Gia An, Tánh Linh', province: 'Bình Thuận', district: 'Tánh Linh', phone: '0868091762', services: ['Thiết kế bản vẽ tưới', 'Cung cấp phụ kiện lẻ', 'Tư vấn kỹ thuật'] },
  { id: 'dl-haphuong2', name: 'Cửa Hàng Hà Phường 2', type: 'dealer', region: 'Miền Trung', address: '492 Lê Duẩn, Khu phố 7, Xã Ninh Sơn', province: 'Khánh Hòa', district: 'Ninh Hòa', services: ['Thiết kế bản vẽ tưới', 'Cung cấp phụ kiện lẻ', 'Tư vấn kỹ thuật'] }
];
