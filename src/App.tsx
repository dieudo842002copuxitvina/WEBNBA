import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { HomepageConfigProvider } from "@/contexts/HomepageConfigContext";
import { ControlCenterProvider } from "@/contexts/ControlCenterContext";
import AdminHomepagePage from "@/pages/admin/AdminHomepagePage";
import AdminControlPage from "@/pages/admin/AdminControlPage";
import { captureAttribution } from "@/lib/tracking";
import { initGA4 } from "@/lib/ga4Client";
import GA4RouteTracker from "@/components/GA4RouteTracker";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import DealerLayout from "@/layouts/DealerLayout";
import PartnerLayout from "@/layouts/PartnerLayout";
import AuthPage from "@/pages/AuthPage";
import CustomerHomePage from "@/pages/customer/HomePage";
import ProductsPage from "@/pages/customer/ProductsPage";
import ProductCatalogPage from "@/pages/customer/ProductCatalogPage";
import ProductDetailPage from "@/pages/customer/ProductDetailPage";
import AiDoctorPage from "@/pages/customer/AiDoctorPage";
import FertigationPage from "@/pages/customer/FertigationPage";
import DealersPage from "@/pages/customer/DealersPage";
import CartPage from "@/pages/customer/CartPage";
import CustomerOrdersPage from "@/pages/customer/OrdersPage";
import DealerDashboard from "@/pages/dealer/DealerDashboard";
import DealerProductsPage from "@/pages/dealer/DealerProductsPage";
import DealerInventoryPage from "@/pages/dealer/DealerInventoryPage";
import DealerOrdersPage from "@/pages/dealer/DealerOrdersPage";
import DealerLeadsPage from "@/pages/dealer/DealerLeadsPage";
import PublicStorefrontPage from "@/pages/dealer/PublicStorefrontPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDealersPage from "@/pages/admin/AdminDealersPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminConfigPage from "@/pages/admin/AdminConfigPage";
import AdminLeadsPage from "@/pages/admin/AdminLeadsPage";
import AdminApprovalsPage from "@/pages/admin/AdminApprovalsPage";
import AdminCommissionPage from "@/pages/admin/AdminCommissionPage";
import AdminHeatmapPage from "@/pages/admin/AdminHeatmapPage";
import FieldSalesDashboard from "@/pages/fieldsales/FieldSalesDashboard";
import QuickOrderPage from "@/pages/fieldsales/QuickOrderPage";
import FieldSalesCustomersPage from "@/pages/fieldsales/FieldSalesCustomersPage";
import MarketPage from "@/pages/market/MarketPage";
import NewsPage from "@/pages/news/NewsPage";

import SolutionsPage from "@/pages/solutions/SolutionsPage";
import ContactPage from "@/pages/contact/ContactPage";
import CalculatorPage from "@/pages/tools/CalculatorPage";
import CalculatorWizardPage from "@/pages/tools/CalculatorWizardPage";
import HydraulicCalculatorPage from "@/pages/tools/HydraulicCalculatorPage";
import CalculatorHubPage from "@/pages/tools/CalculatorHubPage";
import HeadLossPage from "@/pages/tools/HeadLossPage";
import BomEstimatorPage from "@/pages/tools/BomEstimatorPage";
import ElectricalCalculatorPage from "@/pages/tools/ElectricalCalculatorPage";
import RoiCalculatorPage from "@/pages/tools/RoiCalculatorPage";
import AdminCalculatorParamsPage from "@/pages/admin/AdminCalculatorParamsPage";
import AdminCalculatorLeadsPage from "@/pages/admin/AdminCalculatorLeadsPage";
import PartnerDashboard from "@/pages/partner/PartnerDashboard";
import InstallerRegisterPage from "@/pages/installers/InstallerRegisterPage";
import InstallerPortalPage from "@/pages/installers/InstallerPortalPage";
import AdminInstallersPage from "@/pages/admin/AdminInstallersPage";
import AdminAIRulesPage from "@/pages/admin/AdminAIRulesPage";
import AdminMarketingBIPage from "@/pages/admin/AdminMarketingBIPage";
import AdminLookerPage from "@/pages/admin/AdminLookerPage";
import AdminIntegrationsPage from "@/pages/admin/AdminIntegrationsPage";
import AdminStaffPage from "@/pages/admin/AdminStaffPage";
import AdminTrackingLogsPage from "@/pages/admin/AdminTrackingLogsPage";
import AdminNervousSystemPage from "@/pages/admin/AdminNervousSystemPage";
import AIRulePopup from "@/components/AIRulePopup";
import SeoLandingPage from "@/pages/seo/SeoLandingPage";
import SeoLandingIndex from "@/pages/seo/SeoLandingIndex";
import AdminCmsPage from "@/pages/admin/AdminCmsPage";
import AdminCaseStudiesPage from "@/pages/admin/AdminCaseStudiesPage";
import LibraryPage from "@/pages/library/LibraryPage";
import ArticleDetailPage from "@/pages/library/ArticleDetailPage";
import CaseStudiesPage from "@/pages/casestudies/CaseStudiesPage";
import CaseStudyDetailPage from "@/pages/casestudies/CaseStudyDetailPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => { captureAttribution(); initGA4(); }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppProvider>
            <HomepageConfigProvider>
            <ControlCenterProvider>
            <BrowserRouter>
              <GA4RouteTracker />
              <AIRulePopup />
              <Routes>
                {/* Auth — standalone, no nav */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Public + Customer — TopNav layout */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<CustomerHomePage />} />
                  <Route path="/san-pham" element={<ProductCatalogPage />} />
                  <Route path="/san-pham/:id" element={<ProductDetailPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<CustomerOrdersPage />} />
                  <Route path="/thi-truong" element={<MarketPage />} />
                  <Route path="/tin-tuc" element={<NewsPage />} />
                  <Route path="/dai-ly" element={<DealersPage />} />
                  <Route path="/giai-phap" element={<SolutionsPage />} />
                  <Route path="/lien-he" element={<ContactPage />} />
                  <Route path="/cong-cu" element={<CalculatorHubPage />} />
                  <Route path="/cong-cu/tinh-toan" element={<CalculatorWizardPage />} />
                  <Route path="/cong-cu/cham-phan" element={<FertigationPage />} />
                  <Route path="/cong-cu/bac-si-ai" element={<AiDoctorPage />} />
                  <Route path="/cong-cu/tinh-toan-tuoi" element={<CalculatorPage />} />
                  <Route path="/cong-cu/tinh-toan-thuy-luc" element={<HydraulicCalculatorPage />} />
                  <Route path="/cong-cu/sut-ap" element={<HeadLossPage />} />
                  <Route path="/cong-cu/du-toan-1ha" element={<BomEstimatorPage />} />
                  <Route path="/cong-cu/dien-nang" element={<ElectricalCalculatorPage />} />
                  <Route path="/cong-cu/roi" element={<RoiCalculatorPage />} />
                  <Route path="/giai-phap-tuoi" element={<SeoLandingIndex />} />
                  <Route path="/giai-phap-tuoi/:crop/:province" element={<SeoLandingPage />} />
                  <Route path="/doi-tho/dang-ky" element={<InstallerRegisterPage />} />
                  <Route path="/doi-tho" element={<InstallerPortalPage />} />
                  <Route path="/diem-ban/:slug" element={<PublicStorefrontPage />} />
                  {/* Field Sales — keep on TopNav */}
                  <Route path="/fieldsales" element={<FieldSalesDashboard />} />
                  <Route path="/fieldsales/quick-order" element={<QuickOrderPage />} />
                  <Route path="/fieldsales/customers" element={<FieldSalesCustomersPage />} />
                  {/* CMS public surface */}
                  <Route path="/thu-vien" element={<LibraryPage />} />
                  <Route path="/thu-vien/:slug" element={<ArticleDetailPage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                </Route>

                {/* Admin — sidebar + RBAC */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/control" element={<AdminControlPage />} />
                  <Route path="/admin/dealers" element={<AdminDealersPage />} />
                  <Route path="/admin/products" element={<AdminProductsPage />} />
                  <Route path="/admin/config" element={<AdminConfigPage />} />
                  <Route path="/admin/leads" element={<AdminLeadsPage />} />
                  <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
                  <Route path="/admin/commission" element={<AdminCommissionPage />} />
                  <Route path="/admin/heatmap" element={<AdminHeatmapPage />} />
                  <Route path="/admin/installers" element={<AdminInstallersPage />} />
                  <Route path="/admin/ai-rules" element={<AdminAIRulesPage />} />
                  <Route path="/admin/marketing-bi" element={<AdminMarketingBIPage />} />
                  <Route path="/admin/marketing-bi/looker" element={<AdminLookerPage />} />
                  <Route path="/admin/homepage" element={<AdminHomepagePage />} />
                  <Route path="/admin/settings/calculator" element={<AdminCalculatorParamsPage />} />
                  <Route path="/admin/leads/calculator" element={<AdminCalculatorLeadsPage />} />
                  <Route path="/admin/integrations" element={<AdminIntegrationsPage />} />
                  <Route path="/admin/staff" element={<AdminStaffPage />} />
                  <Route path="/admin/tracking-logs" element={<AdminTrackingLogsPage />} />
                  <Route path="/admin/nervous-system" element={<AdminNervousSystemPage />} />
                  <Route path="/admin/cms" element={<AdminCmsPage />} />
                  <Route path="/admin/case-studies" element={<AdminCaseStudiesPage />} />
                </Route>

                {/* Dealer — sidebar + RBAC */}
                <Route element={<DealerLayout />}>
                  <Route path="/dealer" element={<DealerDashboard />} />
                  <Route path="/dealer/products" element={<DealerProductsPage />} />
                  <Route path="/dealer/inventory" element={<DealerInventoryPage />} />
                  <Route path="/dealer/orders" element={<DealerOrdersPage />} />
                  <Route path="/dealer/leads" element={<DealerLeadsPage />} />
                </Route>

                {/* Partner (Dealer + Technician) */}
                <Route element={<PartnerLayout />}>
                  <Route path="/partner/dashboard" element={<PartnerDashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </ControlCenterProvider>
            </HomepageConfigProvider>
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
