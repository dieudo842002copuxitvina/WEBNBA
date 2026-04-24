# Nhà Bè Agri - Hệ sinh thái Nông nghiệp Toàn diện
Dự án Agri-platform hỗ trợ nông dân tối ưu hóa hệ thống tưới và quản lý nông vụ. Hiện dự án đã được nâng cấp từ Vite sang **Next.js 14 (App Router)** để tối ưu SEO và hiệu năng.
## 🚀 Công nghệ sử dụng
- **Framework:** Next.js 14 (App Router)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **State Management:** TanStack Query (React Query)
- **Backend Service:** Supabase (Auth, Database, Storage)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🛠 Hướng dẫn cài đặt cho Developer
### 1. Cài đặt môi trường
Đảm bảo bạn đã cài đặt Node.js (phiên bản 18.17 trở lên).
```bash
# Cài đặt dependencies
npm install

### 2. Cấu hình biến môi trường (.env)
Tạo file .env.local (đã được cấu hình trong .gitignore) và thêm các thông tin sau:

env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id (giữ lại cho các logic cũ nếu cần)
3. Chạy dự án ở chế độ Development
bash
npm run dev
Truy cập: http://localhost:3000

📂 Cấu trúc thư mục (Next.js App Router)
app/: Thư mục chính chứa Routes và Layouts.
layout.tsx: Root Layout (Header, Footer, Providers).
page.tsx: Trang chủ dự án.
tri-thuc/: Trang Kiến thức nông nghiệp.
src/components/: Chứa các Shared Components (UI, Blocks).
ui/: Các component từ Shadcn/UI.
src/contexts/: Chứa các React Context (Auth, App State).
src/hooks/: Các Custom Hooks sử dụng trong dự án.
src/lib/: Chứa các tiện ích, cấu hình Supabase, Analytics.
⚠️ Lưu ý quan trọng khi phát triển (Migration Notes)
Client Components: Do sử dụng App Router, mặc định các component là Server Components. Các file sử dụng Hooks (useState, useEffect) hoặc Event Handlers (onClick) BẮT BUỘC phải có dòng "use client"; ở đầu file.
Navigation: Sử dụng next/link và next/navigation (useRouter, usePathname) thay thế cho react-router-dom.
Images: Ưu tiên sử dụng Component <Image /> của Next.js để tối ưu hóa hình ảnh và Cumulative Layout Shift (CLS).
SEO: Cấu hình Metadata trong layout.tsx hoặc export metadata object trong từng page.tsx.
📦 Deployment
Dự án được tối ưu hóa để triển khai trên Vercel. Để build dự án:

bash
npm run build
© 2026 Nhà Bè Agri. Mọi quyền được bảo lưu.
