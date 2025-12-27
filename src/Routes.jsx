import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ServiceCatalog from './pages/service-catalog';
import ProjectManagement from './pages/project-management';
import AgencyDashboard from './pages/agency-dashboard';
import ClientPortalSetup from './pages/client-portal-setup';
import InvoiceManagement from './pages/invoice-management';
import ClientCommunication from './pages/client-communication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AgencyDashboard />} />
        <Route path="/service-catalog" element={<ServiceCatalog />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/agency-dashboard" element={<AgencyDashboard />} />
        <Route path="/client-portal-setup" element={<ClientPortalSetup />} />
        <Route path="/invoice-management" element={<InvoiceManagement />} />
        <Route path="/client-communication" element={<ClientCommunication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
