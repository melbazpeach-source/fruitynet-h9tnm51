import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import CategoryFilter from './components/CategoryFilter';
import ServiceFilters from './components/ServiceFilters';
import CreateServiceModal from './components/CreateServiceModal';
import BulkActionsBar from './components/BulkActionsBar';
import EmptyState from './components/EmptyState';

const ServiceCatalog = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedServices, setSelectedServices] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '',
    sortBy: 'newest',
    pricingType: 'all',
    showVisibleOnly: false,
    showFeaturedOnly: false,
    hasUpsells: false,
    showNewOnly: false
  });

  const categories = [
  { id: 'design', name: 'Design Services', icon: 'Palette', count: 8 },
  { id: 'development', name: 'Development', icon: 'Code', count: 12 },
  { id: 'marketing', name: 'Marketing', icon: 'TrendingUp', count: 6 },
  { id: 'consulting', name: 'Consulting', icon: 'Users', count: 4 },
  { id: 'content', name: 'Content Creation', icon: 'FileText', count: 5 },
  { id: 'ai-agents', name: 'AI Agents', icon: 'Bot', count: 3 },
  { id: 'ai-automation', name: 'AI Automation', icon: 'Zap', count: 4 }];


  const mockServices = [
  {
    id: 1,
    title: 'Website Design Package',
    description: 'Complete website design with modern UI/UX, responsive layouts, and brand integration for professional online presence.',
    category: 'design',
    image: "https://images.unsplash.com/photo-1504608245011-62d9758c1bb9",
    imageAlt: 'Modern laptop displaying colorful website design mockup with vibrant gradient backgrounds and clean typography on wooden desk',
    pricingType: 'one-time',
    price: 2999,
    pricingTiers: 3,
    deliveryTime: '10-14 days',
    customFields: 8,
    orders: 24,
    isVisible: true,
    featured: true,
    isNew: false,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Discovery & Research', description: 'Understand brand, goals, and target audience' },
    { step: 2, title: 'Wireframing', description: 'Create layout structure and user flow' },
    { step: 3, title: 'Visual Design', description: 'Design high-fidelity mockups and assets' },
    { step: 4, title: 'Review & Revisions', description: 'Client feedback and design refinements' },
    { step: 5, title: 'Final Delivery', description: 'Deliver design files and documentation' }]

  },
  {
    id: 2,
    title: 'Monthly SEO Management',
    description: 'Comprehensive SEO strategy including keyword research, on-page optimization, link building, and monthly performance reports.',
    category: 'marketing',
    image: "https://images.unsplash.com/photo-1657727534442-d436ab275ce2",
    imageAlt: 'Business analytics dashboard showing colorful graphs and charts with SEO metrics and performance data on computer screen',
    pricingType: 'recurring',
    price: 799,
    billingCycle: 'month',
    pricingTiers: 2,
    deliveryTime: 'Ongoing',
    customFields: 5,
    orders: 18,
    isVisible: true,
    featured: true,
    isNew: false,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'SEO Audit', description: 'Analyze current site performance and issues' },
    { step: 2, title: 'Keyword Research', description: 'Identify target keywords and opportunities' },
    { step: 3, title: 'On-Page Optimization', description: 'Optimize content, meta tags, and structure' },
    { step: 4, title: 'Link Building', description: 'Build quality backlinks and authority' },
    { step: 5, title: 'Reporting & Analysis', description: 'Monthly performance reports and strategy updates' }]

  },
  {
    id: 3,
    title: 'Custom Web Application',
    description: 'Full-stack web application development with React, Node.js, database integration, and deployment to production servers.',
    category: 'development',
    image: "https://images.unsplash.com/photo-1659074218448-9660cb5e80a7",
    imageAlt: 'Close-up of programming code on dark screen showing colorful syntax highlighting with HTML and JavaScript snippets',
    pricingType: 'one-time',
    price: 8999,
    pricingTiers: 4,
    deliveryTime: '30-45 days',
    customFields: 12,
    orders: 9,
    isVisible: true,
    featured: false,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Requirements Gathering', description: 'Define features, tech stack, and specifications' },
    { step: 2, title: 'Architecture Design', description: 'Design database schema and system architecture' },
    { step: 3, title: 'Development', description: 'Build frontend, backend, and integrations' },
    { step: 4, title: 'Testing & QA', description: 'Comprehensive testing and bug fixes' },
    { step: 5, title: 'Deployment & Training', description: 'Deploy to production and provide documentation' }]

  },
  {
    id: 4,
    title: 'Brand Strategy Consultation',
    description: 'Strategic brand positioning, market analysis, competitor research, and comprehensive brand guidelines development.',
    category: 'consulting',
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd",
    imageAlt: 'Professional business meeting with diverse team members discussing brand strategy around conference table with laptops and documents',
    pricingType: 'hourly',
    price: 150,
    deliveryTime: 'Flexible',
    customFields: 6,
    orders: 31,
    isVisible: true,
    featured: false,
    isNew: false,
    hasUpsells: false,
    workflow: [
    { step: 1, title: 'Brand Discovery', description: 'Understand business, values, and vision' },
    { step: 2, title: 'Market Research', description: 'Analyze market, competitors, and audience' },
    { step: 3, title: 'Strategy Development', description: 'Create positioning and messaging strategy' },
    { step: 4, title: 'Brand Guidelines', description: 'Develop comprehensive brand standards' },
    { step: 5, title: 'Implementation Plan', description: 'Roadmap for brand rollout and activation' }]

  },
  {
    id: 5,
    title: 'Social Media Content Pack',
    description: 'Monthly content creation including graphics, captions, hashtag research, and posting schedule for all major platforms.',
    category: 'content',
    image: "https://images.unsplash.com/photo-1708447134743-6fba8b93ec6f",
    imageAlt: 'Flat lay of smartphone displaying colorful social media apps with creative workspace including notebook and coffee cup',
    pricingType: 'credit',
    credits: 50,
    pricingTiers: 3,
    deliveryTime: '5-7 days',
    customFields: 7,
    orders: 42,
    isVisible: true,
    featured: false,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Content Planning', description: 'Define themes, topics, and posting calendar' },
    { step: 2, title: 'Content Creation', description: 'Design graphics and write captions' },
    { step: 3, title: 'Hashtag Research', description: 'Identify relevant and trending hashtags' },
    { step: 4, title: 'Review & Approval', description: 'Client review and content refinements' },
    { step: 5, title: 'Scheduling & Delivery', description: 'Schedule posts or deliver content pack' }]

  },
  {
    id: 6,
    title: 'E-commerce Store Setup',
    description: 'Complete online store setup with product listings, payment gateway integration, shipping configuration, and admin training.',
    category: 'development',
    image: "https://images.unsplash.com/photo-1649424221016-58857288854e",
    imageAlt: 'Person using tablet to browse online shopping website with product images and shopping cart interface visible on screen',
    pricingType: 'one-time',
    price: 4999,
    pricingTiers: 3,
    deliveryTime: '15-20 days',
    customFields: 10,
    orders: 15,
    isVisible: true,
    featured: false,
    isNew: false,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Platform Setup', description: 'Install and configure e-commerce platform' },
    { step: 2, title: 'Product Import', description: 'Add products, images, and descriptions' },
    { step: 3, title: 'Payment & Shipping', description: 'Configure payment gateways and shipping' },
    { step: 4, title: 'Design Customization', description: 'Customize theme and branding' },
    { step: 5, title: 'Testing & Training', description: 'Test checkout flow and train admin' }]

  },
  {
    id: 7,
    title: 'Logo Design & Branding',
    description: 'Professional logo design with multiple concepts, revisions, brand color palette, typography selection, and usage guidelines.',
    category: 'design',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15d0b73e0-1764764623950.png",
    imageAlt: 'Designer working on creative logo concepts with colorful sketches and digital design tools on modern workspace desk',
    pricingType: 'one-time',
    price: 1499,
    pricingTiers: 2,
    deliveryTime: '7-10 days',
    customFields: 6,
    orders: 37,
    isVisible: false,
    featured: false,
    isNew: false,
    hasUpsells: false,
    workflow: [
    { step: 1, title: 'Brand Brief', description: 'Gather requirements and brand preferences' },
    { step: 2, title: 'Concept Development', description: 'Create initial logo concepts' },
    { step: 3, title: 'Refinement', description: 'Revise selected concept based on feedback' },
    { step: 4, title: 'Finalization', description: 'Finalize logo in all formats and variations' },
    { step: 5, title: 'Brand Assets', description: 'Deliver logo files and usage guidelines' }]

  },
  {
    id: 8,
    title: 'Email Marketing Campaign',
    description: 'Strategic email campaign design, copywriting, list segmentation, A/B testing, and performance analytics reporting.',
    category: 'marketing',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15fbd14c4-1766488541955.png",
    imageAlt: 'Laptop screen showing email marketing dashboard with colorful charts, subscriber lists, and campaign performance metrics',
    pricingType: 'recurring',
    price: 599,
    billingCycle: 'month',
    pricingTiers: 2,
    deliveryTime: 'Ongoing',
    customFields: 5,
    orders: 28,
    isVisible: true,
    featured: false,
    isNew: false,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Campaign Strategy', description: 'Define goals, audience, and messaging' },
    { step: 2, title: 'Content Creation', description: 'Design templates and write copy' },
    { step: 3, title: 'List Setup', description: 'Segment audience and configure automation' },
    { step: 4, title: 'Testing & Launch', description: 'A/B test and deploy campaign' },
    { step: 5, title: 'Analytics & Optimization', description: 'Monitor performance and optimize' }]

  },
  {
    id: 9,
    title: 'Custom AI Agent Development',
    description: 'Build intelligent AI agents for customer support, sales automation, data analysis, or custom business workflows with natural language processing.',
    category: 'ai-agents',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18cebb360-1764644024423.png",
    imageAlt: 'Futuristic AI robot interface with glowing neural network connections and digital data streams on dark background',
    pricingType: 'one-time',
    price: 5999,
    pricingTiers: 3,
    deliveryTime: '20-30 days',
    customFields: 10,
    orders: 12,
    isVisible: true,
    featured: true,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Requirements Analysis', description: 'Define agent capabilities and use cases' },
    { step: 2, title: 'AI Model Selection', description: 'Choose and configure appropriate AI models' },
    { step: 3, title: 'Agent Development', description: 'Build agent logic and integrations' },
    { step: 4, title: 'Training & Testing', description: 'Train on data and conduct quality testing' },
    { step: 5, title: 'Deployment & Monitoring', description: 'Deploy agent and setup monitoring' }]

  },
  {
    id: 10,
    title: 'AI Chatbot for Customer Support',
    description: 'Intelligent chatbot with 24/7 availability, multi-language support, knowledge base integration, and seamless human handoff capabilities.',
    category: 'ai-agents',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b71551de-1766565517422.png",
    imageAlt: 'Modern smartphone displaying AI chatbot conversation interface with message bubbles and smart reply suggestions',
    pricingType: 'recurring',
    price: 899,
    billingCycle: 'month',
    pricingTiers: 3,
    deliveryTime: '10-15 days',
    customFields: 8,
    orders: 23,
    isVisible: true,
    featured: true,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Knowledge Base Setup', description: 'Import FAQs and documentation' },
    { step: 2, title: 'Conversation Design', description: 'Create dialog flows and responses' },
    { step: 3, title: 'Integration Setup', description: 'Connect to website and support tools' },
    { step: 4, title: 'Training & Refinement', description: 'Train bot and optimize responses' },
    { step: 5, title: 'Launch & Support', description: 'Go live with ongoing optimization' }]

  },
  {
    id: 11,
    title: 'AI Sales Assistant Agent',
    description: 'Automated sales agent for lead qualification, product recommendations, meeting scheduling, and follow-up communications with CRM integration.',
    category: 'ai-agents',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_143a21815-1764651949320.png",
    imageAlt: 'Business dashboard showing sales analytics with AI-powered insights, charts, and predictive data visualizations',
    pricingType: 'recurring',
    price: 1299,
    billingCycle: 'month',
    pricingTiers: 2,
    deliveryTime: '15-20 days',
    customFields: 9,
    orders: 8,
    isVisible: true,
    featured: false,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Sales Process Mapping', description: 'Define qualification criteria and workflows' },
    { step: 2, title: 'CRM Integration', description: 'Connect to existing sales tools' },
    { step: 3, title: 'Agent Configuration', description: 'Setup lead scoring and automation rules' },
    { step: 4, title: 'Testing & Calibration', description: 'Test with sample leads and refine' },
    { step: 5, title: 'Deployment & Training', description: 'Launch and train team on usage' }]

  },
  {
    id: 12,
    title: 'Document Processing Automation',
    description: 'AI-powered document extraction, classification, data entry automation, and intelligent routing with OCR and natural language understanding.',
    category: 'ai-automation',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d84a2ca-1764838793468.png",
    imageAlt: 'Digital documents being scanned and processed with AI highlighting text and data extraction points on screen',
    pricingType: 'one-time',
    price: 4499,
    pricingTiers: 3,
    deliveryTime: '15-25 days',
    customFields: 11,
    orders: 14,
    isVisible: true,
    featured: true,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Document Analysis', description: 'Analyze document types and data fields' },
    { step: 2, title: 'AI Model Training', description: 'Train extraction models on sample docs' },
    { step: 3, title: 'Workflow Automation', description: 'Build processing and routing logic' },
    { step: 4, title: 'Integration & Testing', description: 'Connect systems and validate accuracy' },
    { step: 5, title: 'Deployment & Monitoring', description: 'Launch with performance tracking' }]

  },
  {
    id: 13,
    title: 'Email Automation & Response System',
    description: 'Intelligent email processing with auto-categorization, priority detection, smart replies, and automated workflow triggers based on content.',
    category: 'ai-automation',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1322af5e0-1766774974762.png",
    imageAlt: 'Email inbox interface with AI-powered smart categorization, automated responses, and priority indicators',
    pricingType: 'recurring',
    price: 699,
    billingCycle: 'month',
    pricingTiers: 2,
    deliveryTime: '7-10 days',
    customFields: 6,
    orders: 19,
    isVisible: true,
    featured: false,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Email Pattern Analysis', description: 'Analyze email types and responses' },
    { step: 2, title: 'Rule Configuration', description: 'Setup categorization and routing rules' },
    { step: 3, title: 'Response Templates', description: 'Create AI-powered reply templates' },
    { step: 4, title: 'Integration Setup', description: 'Connect to email and business systems' },
    { step: 5, title: 'Testing & Optimization', description: 'Test automation and refine accuracy' }]

  },
  {
    id: 14,
    title: 'Data Analysis & Reporting Automation',
    description: 'Automated data collection, analysis, insight generation, and scheduled reporting with AI-powered anomaly detection and predictions.',
    category: 'ai-automation',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdd8eb0a-1766774971726.png",
    imageAlt: 'Automated analytics dashboard with AI-generated insights, charts, graphs, and predictive data trends',
    pricingType: 'recurring',
    price: 1099,
    billingCycle: 'month',
    pricingTiers: 3,
    deliveryTime: '12-18 days',
    customFields: 9,
    orders: 11,
    isVisible: true,
    featured: false,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Data Source Integration', description: 'Connect to databases and APIs' },
    { step: 2, title: 'Analysis Framework', description: 'Define metrics and KPIs to track' },
    { step: 3, title: 'AI Model Setup', description: 'Configure prediction and anomaly detection' },
    { step: 4, title: 'Report Design', description: 'Create automated report templates' },
    { step: 5, title: 'Scheduling & Delivery', description: 'Setup automated report distribution' }]

  },
  {
    id: 15,
    title: 'Workflow Automation Suite',
    description: 'End-to-end business process automation with AI decision-making, multi-system integration, and intelligent task orchestration.',
    category: 'ai-automation',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d172ea06-1764846861495.png",
    imageAlt: 'Flowchart diagram showing automated business workflow with connected nodes, decision points, and system integrations',
    pricingType: 'one-time',
    price: 7999,
    pricingTiers: 4,
    deliveryTime: '30-45 days',
    customFields: 14,
    orders: 6,
    isVisible: true,
    featured: true,
    isNew: true,
    hasUpsells: true,
    workflow: [
    { step: 1, title: 'Process Mapping', description: 'Document current workflows and pain points' },
    { step: 2, title: 'Automation Design', description: 'Design optimized automated workflows' },
    { step: 3, title: 'System Integration', description: 'Connect all required business systems' },
    { step: 4, title: 'AI Logic Implementation', description: 'Build intelligent decision-making rules' },
    { step: 5, title: 'Testing & Deployment', description: 'Comprehensive testing and rollout' }]

  }];


  const [services, setServices] = useState(mockServices);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleFilterChange = (field, value) => {
    if (field === 'reset') {
      setFilters({
        searchQuery: '',
        sortBy: 'newest',
        pricingType: 'all',
        showVisibleOnly: false,
        showFeaturedOnly: false,
        hasUpsells: false,
        showNewOnly: false
      });
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleToggleVisibility = (serviceId) => {
    setServices((prev) => prev?.map((service) =>
    service?.id === serviceId ?
    { ...service, isVisible: !service?.isVisible } :
    service
    ));
  };

  const handleEditService = (serviceId) => {
    console.log('Edit service:', serviceId);
  };

  const handleDuplicateService = (serviceId) => {
    const serviceToDuplicate = services?.find((s) => s?.id === serviceId);
    if (serviceToDuplicate) {
      const newService = {
        ...serviceToDuplicate,
        id: Math.max(...services?.map((s) => s?.id)) + 1,
        title: `${serviceToDuplicate?.title} (Copy)`,
        orders: 0
      };
      setServices((prev) => [...prev, newService]);
    }
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices((prev) => prev?.filter((service) => service?.id !== serviceId));
    }
  };

  const handleCreateService = (formData) => {
    const newService = {
      id: Math.max(...services?.map((s) => s?.id)) + 1,
      ...formData,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_110a1c7f7-1765295566265.png",
      imageAlt: 'Professional service offering placeholder image with modern design elements and brand colors',
      customFields: 0,
      orders: 0,
      isNew: true,
      hasUpsells: false,
      pricingTiers: 1
    };
    setServices((prev) => [newService, ...prev]);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'show':
        setServices((prev) => prev?.map((service) =>
        selectedServices?.includes(service?.id) ?
        { ...service, isVisible: true } :
        service
        ));
        break;
      case 'hide':
        setServices((prev) => prev?.map((service) =>
        selectedServices?.includes(service?.id) ?
        { ...service, isVisible: false } :
        service
        ));
        break;
      case 'duplicate':
        const servicesToDuplicate = services?.filter((s) => selectedServices?.includes(s?.id));
        const duplicatedServices = servicesToDuplicate?.map((service, index) => ({
          ...service,
          id: Math.max(...services?.map((s) => s?.id)) + index + 1,
          title: `${service?.title} (Copy)`,
          orders: 0
        }));
        setServices((prev) => [...prev, ...duplicatedServices]);
        break;
      case 'delete':
        if (window.confirm(`Delete ${selectedServices?.length} selected services?`)) {
          setServices((prev) => prev?.filter((service) => !selectedServices?.includes(service?.id)));
        }
        break;
      default:
        break;
    }
    setSelectedServices([]);
  };

  const getFilteredServices = () => {
    let filtered = [...services];

    if (activeCategory !== 'all') {
      filtered = filtered?.filter((service) => service?.category === activeCategory);
    }

    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      filtered = filtered?.filter((service) =>
      service?.title?.toLowerCase()?.includes(query) ||
      service?.description?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.pricingType !== 'all') {
      filtered = filtered?.filter((service) => service?.pricingType === filters?.pricingType);
    }

    if (filters?.showVisibleOnly) {
      filtered = filtered?.filter((service) => service?.isVisible);
    }

    if (filters?.showFeaturedOnly) {
      filtered = filtered?.filter((service) => service?.featured);
    }

    if (filters?.hasUpsells) {
      filtered = filtered?.filter((service) => service?.hasUpsells);
    }

    if (filters?.showNewOnly) {
      filtered = filtered?.filter((service) => service?.isNew);
    }

    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'newest':
          return b?.id - a?.id;
        case 'oldest':
          return a?.id - b?.id;
        case 'price-low':
          return (a?.price || a?.credits || 0) - (b?.price || b?.credits || 0);
        case 'price-high':
          return (b?.price || b?.credits || 0) - (a?.price || a?.credits || 0);
        case 'popular':
          return b?.orders - a?.orders;
        case 'name-az':
          return a?.title?.localeCompare(b?.title);
        case 'name-za':
          return b?.title?.localeCompare(a?.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredServices = getFilteredServices();

  return (
    <>
      <Helmet>
        <title>Service Catalog - Fruitynet</title>
        <meta name="description" content="Manage and showcase your service offerings with comprehensive pricing and customization options" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={handleToggleSidebar} />


        <div className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
          <header className="sticky top-0 z-30 bg-card border-b border-border shadow-elevation-sm">
            <div className="px-4 md:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                    Service Catalog
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Manage your service offerings and pricing
                  </p>
                </div>
                <UserProfileDropdown />
              </div>
            </div>
          </header>

          <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <BreadcrumbNavigation />

            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Services</p>
                  <p className="text-2xl font-bold text-foreground data-text">{services?.length}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="default"
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1 sm:flex-initial">

                  Export
                </Button>
                <Button
                  variant="default"
                  size="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex-1 sm:flex-initial">

                  Add Service
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory} />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <ServiceFilters
                  filters={filters}
                  onFilterChange={handleFilterChange} />

              </div>

              <div className="lg:col-span-3">
                {filteredServices?.length === 0 ?
                <EmptyState onCreateService={() => setIsCreateModalOpen(true)} /> :

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                    {filteredServices?.map((service) =>
                  <ServiceCard
                    key={service?.id}
                    service={service}
                    onEdit={handleEditService}
                    onToggleVisibility={handleToggleVisibility}
                    onDuplicate={handleDuplicateService}
                    onDelete={handleDeleteService} />

                  )}
                  </div>
                }
              </div>
            </div>
          </main>
        </div>

        <CreateServiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateService} />


        <BulkActionsBar
          selectedCount={selectedServices?.length}
          onClearSelection={() => setSelectedServices([])}
          onBulkAction={handleBulkAction} />

      </div>
    </>);

};

export default ServiceCatalog;