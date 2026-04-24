import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "./providers";
import GA4RouteTracker from "@/components/GA4RouteTracker";
import AIRulePopup from "@/components/AIRulePopup";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nhà Bè Agri - Giải pháp Nông nghiệp Toàn diện",
  description: "Cung cấp giải pháp tưới tiêu, thiết bị nông nghiệp và hỗ trợ kỹ thuật chuyên sâu cho nhà nông Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={null}>
            <GA4RouteTracker />
          </Suspense>
          <AIRulePopup />
          <TopNav />
          <main>
            {children}
          </main>
          <SiteFooter />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
