import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MapApp from "@/components/MapApp";
import AdminLogin from "@/admin/LoginPage";
import AdminDashboard from "@/admin/DashboardPage";
import ContributorLogin from "@/contributor/LoginPage";
import ContributorDashboard from "@/contributor/DashboardPage";

export { toUrlSlug } from "@/components/MapApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/contributor/login" element={<ContributorLogin />} />
          <Route path="/contributor/dashboard" element={<ContributorDashboard />} />
          <Route path="*" element={<MapApp />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
