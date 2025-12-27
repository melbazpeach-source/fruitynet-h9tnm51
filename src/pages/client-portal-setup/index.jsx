import React, { useState } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BrandingTab from './components/BrandingTab';
import DomainTab from './components/DomainTab';
import ServiceCatalogTab from './components/ServiceCatalogTab';
import AdvancedSettingsTab from './components/AdvancedSettingsTab';
import LivePreviewPanel from './components/LivePreviewPanel';
import SetupProgressIndicator from './components/SetupProgressIndicator';

const ClientPortalSetup = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');
  const [showPreview, setShowPreview] = useState(true);

  const [brandingData, setBrandingData] = useState({
    logo: '',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6',
    accentColor: '#F97316',
    headingFont: 'Outfit',
    bodyFont: 'Source Sans 3'
  });

  const [domainData, setDomainData] = useState({
    customDomain: '',
    sslEnabled: true,
    httpsRedirect: true
  });

  const [services, setServices] = useState([
  {
    id: 1,
    title: 'Website Design & Development',
    description: 'Custom website design and development with responsive layouts, modern UI/UX, and optimized performance for all devices.',
    image: "https://images.unsplash.com/photo-1710959781834-11a12ff8d8af",
    imageAlt: 'Modern laptop displaying colorful website design interface with code editor and design tools on wooden desk',
    category: 'Web Development',
    deliveryTime: '4-6 weeks',
    recurring: false,
    visible: true,
    pricingTiers: [
    { name: 'Basic', price: '2500', features: ['5 pages', 'Responsive design', 'Basic SEO'], popular: false },
    { name: 'Professional', price: '5000', features: ['10 pages', 'Advanced features', 'Premium SEO'], popular: true },
    { name: 'Enterprise', price: '10000', features: ['Unlimited pages', 'Custom features', 'Full support'], popular: false }]

  },
  {
    id: 2,
    title: 'Brand Identity & Logo Design',
    description: 'Complete brand identity package including logo design, color palette, typography guidelines, and brand style guide documentation.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1654ebf47-1764773611909.png",
    imageAlt: 'Designer workspace with tablet showing colorful logo designs, color swatches, and brand identity materials spread on white desk',
    category: 'Branding',
    deliveryTime: '2-3 weeks',
    recurring: false,
    visible: true,
    pricingTiers: [
    { name: 'Starter', price: '1500', features: ['Logo design', '3 revisions', 'Basic guidelines'], popular: false },
    { name: 'Complete', price: '3500', features: ['Full identity', 'Unlimited revisions', 'Style guide'], popular: true },
    { name: 'Premium', price: '6000', features: ['Extended identity', 'Brand strategy', 'Marketing materials'], popular: false }]

  },
  {
    id: 3,
    title: 'Social Media Management',
    description: 'Monthly social media management including content creation, scheduling, community engagement, and performance analytics reporting.',
    image: "https://images.unsplash.com/photo-1724754608975-53859a805083",
    imageAlt: 'Smartphone displaying social media analytics dashboard with colorful graphs and engagement metrics on modern desk setup',
    category: 'Marketing',
    deliveryTime: 'Monthly',
    recurring: true,
    visible: true,
    pricingTiers: [
    { name: 'Basic', price: '800', features: ['2 platforms', '12 posts/month', 'Basic analytics'], popular: false },
    { name: 'Growth', price: '1500', features: ['4 platforms', '20 posts/month', 'Advanced analytics'], popular: true },
    { name: 'Enterprise', price: '3000', features: ['All platforms', 'Daily posts', 'Full management'], popular: false }]

  }]
  );

  const [advancedSettings, setAdvancedSettings] = useState({
    emailTemplates: {},
    workflowTriggers: {},
    paymentGateways: {
      stripe: { connected: true },
      paypal: { connected: false }
    }
  });

  const tabs = [
  { id: 'branding', label: 'Branding', icon: 'Palette' },
  { id: 'domain', label: 'Domain', icon: 'Globe' },
  { id: 'services', label: 'Service Catalog', icon: 'Package' },
  { id: 'advanced', label: 'Advanced Settings', icon: 'Settings' }];


  const handleLogoUpload = (logoUrl) => {
    setBrandingData({ ...brandingData, logo: logoUrl });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'branding':
        return (
          <BrandingTab
            brandingData={brandingData}
            onBrandingChange={setBrandingData}
            onLogoUpload={handleLogoUpload} />);


      case 'domain':
        return <DomainTab domainData={domainData} onDomainChange={setDomainData} />;
      case 'services':
        return <ServiceCatalogTab services={services} onServicesChange={setServices} />;
      case 'advanced':
        return (
          <AdvancedSettingsTab
            settings={advancedSettings}
            onSettingsChange={setAdvancedSettings} />);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div
        className={`transition-smooth ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`
        }>

        <header className="sticky top-0 z-30 bg-card border-b border-border shadow-elevation-sm">
          <div className="px-4 md:px-6 lg:px-8 py-4 md:py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-1">
                  Client Portal Setup
                </h1>
                <p className="text-sm md:text-base text-muted-foreground font-caption">
                  Customize your branded client portal experience
                </p>
              </div>
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <BreadcrumbNavigation />

          <SetupProgressIndicator
            currentStep={tabs?.findIndex((tab) => tab?.id === activeTab) + 1}
            totalSteps={tabs?.length}
            completedSteps={2} />


          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            <div className="xl:col-span-2">
              <div className="bg-card border border-border rounded-lg shadow-elevation-sm overflow-hidden mb-6 md:mb-8">
                <div className="border-b border-border overflow-x-auto">
                  <div className="flex min-w-max">
                    {tabs?.map((tab) =>
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium transition-smooth border-b-2 whitespace-nowrap ${
                      activeTab === tab?.id ?
                      'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'}`
                      }>

                        <Icon name={tab?.icon} size={18} />
                        <span>{tab?.label}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {renderTabContent()}

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
                <Button variant="default" iconName="Save" iconPosition="left" className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" iconName="Eye" iconPosition="left" className="flex-1">
                  Preview Portal
                </Button>
                <Button
                  variant="ghost"
                  iconName={showPreview ? 'EyeOff' : 'Eye'}
                  onClick={() => setShowPreview(!showPreview)}
                  className="sm:w-auto">

                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
              </div>
            </div>

            {showPreview &&
            <div className="xl:col-span-1">
                <div className="sticky top-24">
                  <LivePreviewPanel brandingData={brandingData} />
                </div>
              </div>
            }
          </div>
        </main>
      </div>
    </div>);

};

export default ClientPortalSetup;