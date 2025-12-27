import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InvoiceCard from './components/InvoiceCard';
import InvoiceFilters from './components/InvoiceFilters';
import InvoiceStats from './components/InvoiceStats';
import CreateInvoiceModal from './components/CreateInvoiceModal';
import PaymentHistoryPanel from './components/PaymentHistoryPanel';

const InvoiceManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const mockInvoices = [
  {
    id: 'INV-2025-001',
    invoiceNumber: '2025-001',
    clientName: 'TechCorp Solutions',
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a79b8e72-1763295320816.png",
    clientAvatarAlt: 'Professional headshot of middle-aged businessman with gray hair wearing navy blue suit and red tie in modern office setting',
    amount: 5250.00,
    status: 'paid',
    issueDate: '2025-01-15',
    dueDate: '2025-02-15',
    description: 'Website redesign and development services for Q1 2025 including responsive design implementation and CMS integration'
  },
  {
    id: 'INV-2025-002',
    invoiceNumber: '2025-002',
    clientName: 'Design Studio Pro',
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b41b3e1b-1763301484596.png",
    clientAvatarAlt: 'Professional portrait of young woman with long brown hair wearing white blouse smiling confidently in bright office environment',
    amount: 3800.00,
    status: 'pending',
    issueDate: '2025-01-20',
    dueDate: '2025-02-20',
    description: 'Brand identity package including logo design, color palette development, and comprehensive brand guidelines documentation'
  },
  {
    id: 'INV-2025-003',
    invoiceNumber: '2025-003',
    clientName: 'Startup Ventures Inc',
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_188bcda15-1763296347213.png",
    clientAvatarAlt: 'Casual portrait of young entrepreneur with beard wearing black t-shirt in modern startup office with exposed brick walls',
    amount: 2100.00,
    status: 'overdue',
    issueDate: '2024-12-10',
    dueDate: '2025-01-10',
    description: 'Mobile app UI/UX design consultation and prototype development for iOS and Android platforms with user testing'
  },
  {
    id: 'INV-2025-004',
    invoiceNumber: '2025-004',
    clientName: 'Enterprise Global Ltd',
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17f10e2ec-1763294257798.png",
    clientAvatarAlt: 'Executive portrait of professional woman with short blonde hair wearing gray business suit in corporate boardroom setting',
    amount: 8900.00,
    status: 'pending',
    issueDate: '2025-01-25',
    dueDate: '2025-02-25',
    description: 'Enterprise software integration and custom API development with comprehensive documentation and training materials'
  },
  {
    id: 'INV-2025-005',
    invoiceNumber: '2025-005',
    clientName: 'Creative Agency Co',
    clientAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_198bd0bfa-1763298528140.png",
    clientAvatarAlt: 'Artistic portrait of creative director with glasses and casual attire in colorful design studio with artwork displays',
    amount: 1500.00,
    status: 'draft',
    issueDate: '2025-01-26',
    dueDate: '2025-02-26',
    description: 'Social media marketing campaign design and content creation for Q1 product launch across multiple platforms'
  }];


  const mockStats = {
    totalRevenue: 125800,
    pendingAmount: 14800,
    overdueAmount: 3200,
    totalInvoices: 48
  };

  const mockPaymentHistory = [
  {
    id: 'PAY-001',
    description: 'Payment for Invoice #2025-001',
    amount: 5250.00,
    date: '2025-02-10T14:30:00',
    method: 'stripe',
    transactionId: 'ch_3MtwBwLkdIwHu7ix0B3tqPAa'
  },
  {
    id: 'PAY-002',
    description: 'Payment for Invoice #2024-098',
    amount: 3200.00,
    date: '2025-02-08T10:15:00',
    method: 'paypal',
    transactionId: '8XY12345ABC67890'
  },
  {
    id: 'PAY-003',
    description: 'Payment for Invoice #2024-095',
    amount: 4500.00,
    date: '2025-02-05T16:45:00',
    method: 'bank',
    transactionId: 'WIRE-2025-0205-001'
  }];


  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);

  const handleFilterChange = (filters) => {
    let filtered = [...mockInvoices];

    if (filters?.search) {
      filtered = filtered?.filter(
        (inv) =>
        inv?.invoiceNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        inv?.clientName?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((inv) => inv?.status === filters?.status);
    }

    if (filters?.client !== 'all') {
      filtered = filtered?.filter((inv) =>
      inv?.clientName?.toLowerCase()?.includes(filters?.client)
      );
    }

    if (filters?.minAmount) {
      filtered = filtered?.filter((inv) => inv?.amount >= parseFloat(filters?.minAmount));
    }

    if (filters?.maxAmount) {
      filtered = filtered?.filter((inv) => inv?.amount <= parseFloat(filters?.maxAmount));
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter((inv) => new Date(inv.issueDate) >= new Date(filters.dateFrom));
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter((inv) => new Date(inv.issueDate) <= new Date(filters.dateTo));
    }

    setFilteredInvoices(filtered);
  };

  const handleExport = () => {
    console.log('Exporting invoices to CSV/PDF...');
    alert('Export functionality would generate a downloadable report of filtered invoices');
  };

  const handleViewInvoice = (invoice) => {
    console.log('Viewing invoice:', invoice);
    alert(`Viewing invoice ${invoice?.invoiceNumber} for ${invoice?.clientName}`);
  };

  const handleEditInvoice = (invoice) => {
    console.log('Editing invoice:', invoice);
    alert(`Editing invoice ${invoice?.invoiceNumber}`);
  };

  const handleSendInvoice = (invoice) => {
    console.log('Sending invoice:', invoice);
    alert(`Sending invoice ${invoice?.invoiceNumber} to ${invoice?.clientName}`);
  };

  const handleDownloadInvoice = (invoice) => {
    console.log('Downloading invoice:', invoice);
    alert(`Downloading PDF for invoice ${invoice?.invoiceNumber}`);
  };

  const handleCreateInvoice = (invoiceData) => {
    console.log('Creating new invoice:', invoiceData);
    alert('New invoice created successfully!');
  };

  const tabs = [
  { id: 'all', label: 'All Invoices', count: mockInvoices?.length },
  { id: 'paid', label: 'Paid', count: mockInvoices?.filter((i) => i?.status === 'paid')?.length },
  { id: 'pending', label: 'Pending', count: mockInvoices?.filter((i) => i?.status === 'pending')?.length },
  { id: 'overdue', label: 'Overdue', count: mockInvoices?.filter((i) => i?.status === 'overdue')?.length }];


  return (
    <>
      <Helmet>
        <title>Invoice Management - Fruitynet</title>
        <meta
          name="description"
          content="Manage invoices, track payments, and automate billing workflows with professional invoice generation and payment processing" />

      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />


        <div
          className={`transition-smooth ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`
          }>

          <header className="sticky top-0 z-30 bg-card border-b border-border shadow-elevation-sm">
            <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <div className="lg:hidden w-12" />
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
                    Invoice Management
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground font-caption mt-1">
                    Professional billing and payment tracking
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <Button
                  variant="default"
                  size="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="hidden md:flex">

                  Create Invoice
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  iconName="Plus"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="md:hidden" />


                <UserProfileDropdown />
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8">
            <BreadcrumbNavigation />

            <div className="space-y-6 md:space-y-8">
              <InvoiceStats stats={mockStats} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <InvoiceFilters
                    onFilterChange={handleFilterChange}
                    onExport={handleExport} />


                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="border-b border-border overflow-x-auto">
                      <div className="flex gap-1 p-2 min-w-max">
                        {tabs?.map((tab) =>
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`
                              flex items-center gap-2 px-4 py-2 rounded-md transition-smooth
                              ${
                          activeTab === tab?.id ?
                          'bg-primary text-primary-foreground' :
                          'text-muted-foreground hover:bg-muted'}
                            `
                          }>

                            <span className="text-sm font-medium font-caption whitespace-nowrap">
                              {tab?.label}
                            </span>
                            <span
                            className={`
                                text-xs px-2 py-0.5 rounded-full font-caption
                                ${
                            activeTab === tab?.id ?
                            'bg-primary-foreground/20 text-primary-foreground' :
                            'bg-muted text-muted-foreground'}
                              `
                            }>

                              {tab?.count}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-4 md:p-6 space-y-4">
                      {filteredInvoices?.length > 0 ?
                      filteredInvoices?.map((invoice) =>
                      <InvoiceCard
                        key={invoice?.id}
                        invoice={invoice}
                        onView={handleViewInvoice}
                        onEdit={handleEditInvoice}
                        onSend={handleSendInvoice}
                        onDownload={handleDownloadInvoice} />

                      ) :

                      <div className="text-center py-12 md:py-16">
                          <Icon
                          name="FileText"
                          size={64}
                          className="mx-auto text-muted-foreground mb-4" />

                          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                            No invoices found
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground mb-6">
                            Try adjusting your filters or create a new invoice
                          </p>
                          <Button
                          variant="default"
                          iconName="Plus"
                          iconPosition="left"
                          onClick={() => setIsCreateModalOpen(true)}>

                            Create Invoice
                          </Button>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <PaymentHistoryPanel payments={mockPaymentHistory} />

                  <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Send"
                        iconPosition="left">

                        Send Payment Reminder
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Settings"
                        iconPosition="left">

                        Configure Automation
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="BarChart3"
                        iconPosition="left">

                        View Reports
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="border-t border-border bg-card mt-12">
            <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground font-caption text-center md:text-left">
                  © {new Date()?.getFullYear()} Fruitynet. All rights reserved.
                </p>
                <div className="flex items-center gap-4 md:gap-6">
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth">

                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth">

                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth">

                    Support
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInvoice} />

    </>);

};

export default InvoiceManagement;