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
import LocalNetworkHome from "@/localnetwork/HomePage";
import LocalNetworkAuth from "@/localnetwork/AuthPage";
import LocalNetworkJoin from "@/localnetwork/JoinPage";
import LocalNetworkRequest from "@/localnetwork/RequestPage";
import LocalNetworkDashboard from "@/localnetwork/DashboardPage";
import LocalNetworkRequester from "@/localnetwork/RequesterDashboardPage";
import LocalNetworkPublicMaker from "@/localnetwork/PublicMakerPage";

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
          <Route path="/localnetwork" element={<LocalNetworkHome />} />
          <Route path="/localnetwork/auth" element={<LocalNetworkAuth />} />
          <Route path="/localnetwork/join" element={<LocalNetworkJoin />} />
          <Route path="/localnetwork/request" element={<LocalNetworkRequest />} />
          <Route path="/localnetwork/dashboard" element={<LocalNetworkDashboard />} />
          <Route path="/localnetwork/requester" element={<LocalNetworkRequester />} />
          <Route path="/m/:alias" element={<LocalNetworkPublicMaker />} />
          <Route path="*" element={<MapApp />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
