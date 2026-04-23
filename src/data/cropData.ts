export type CropRegion = 'TayNguyen' | 'DongNamBo' | 'DBSCL' | 'MienBac';

export interface Crop {
  id: string;
  name: string;
  slug: string;
  icon: string;
  region: CropRegion;
  average_price_range: number;
  description_snippet: string;
}

/**
 * Nhà Bè Agri crop master data.
 * Hiện mới seed 6 cây tiêu biểu để làm mẫu cấu trúc cho bộ 28 cây công nghiệp.
 */
export const cropsData: Crop[] = [
  {
    id: 'sau-rieng-ri6',
    name: 'Sầu riêng Ri6',
    slug: 'sau-rieng-ri6',
    icon: 'Trees',
    region: 'DBSCL',
    average_price_range: 95000,
    description_snippet:
      'Giống sầu riêng chủ lực tại Đồng bằng sông Cửu Long, giá trị kinh tế cao. Phù hợp hệ thống tưới bù áp ổn định và quản lý nước chính xác theo từng giai đoạn trái.',
  },
  {
    id: 'ca-phe-robusta',
    name: 'Cà phê Robusta',
    slug: 'ca-phe-robusta',
    icon: 'Coffee',
    region: 'TayNguyen',
    average_price_range: 128500,
    description_snippet:
      'Cây công nghiệp lâu năm chủ lực của Tây Nguyên, cần tưới đều để giữ năng suất ổn định. Gợi ý placeholder khoảng cách trồng tiêu chuẩn: 3x3m.',
  },
  {
    id: 'ho-tieu-den',
    name: 'Hồ tiêu đen',
    slug: 'ho-tieu-den',
    icon: 'Leaf',
    region: 'DongNamBo',
    average_price_range: 178000,
    description_snippet:
      'Cây gia vị giá trị cao, nhạy với thiếu nước và úng cục bộ. Hệ thống tưới nên ưu tiên kiểm soát lưu lượng theo từng trụ để giảm sốc rễ.',
  },
  {
    id: 'cao-su-rriv',
    name: 'Cao su RRIV',
    slug: 'cao-su-rriv',
    icon: 'Shield',
    region: 'TayNguyen',
    average_price_range: 42500,
    description_snippet:
      'Cây công nghiệp dài hạn, trồng quy mô lớn và cần giải pháp tưới tối ưu chi phí đầu tư. Phù hợp các cấu hình ống chính rõ tuyến và vận hành bền ngoài đồng.',
  },
  {
    id: 'dieu-ghep',
    name: 'Điều ghép',
    slug: 'dieu-ghep',
    icon: 'Nut',
    region: 'DongNamBo',
    average_price_range: 32000,
    description_snippet:
      'Nhóm cây công nghiệp phù hợp vùng đất cao, chịu hạn khá nhưng vẫn cần cấp nước đúng thời điểm ra hoa và nuôi trái. Hệ thống tưới cơ bản nên ưu tiên độ bền và dễ bảo trì.',
  },
  {
    id: 'che-shan-tuyet',
    name: 'Chè Shan tuyết',
    slug: 'che-shan-tuyet',
    icon: 'BadgeLeaf',
    region: 'MienBac',
    average_price_range: 18500,
    description_snippet:
      'Cây công nghiệp vùng cao, cần độ ẩm nền ổn định để duy trì chất lượng búp. Thiết kế tưới nên lưu ý địa hình dốc và biến động áp suất theo cao độ.',
  },
];

