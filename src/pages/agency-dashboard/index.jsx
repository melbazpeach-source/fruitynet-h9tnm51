import React, { useState } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import ProjectCard from './components/ProjectCard';
import ActivityItem from './components/ActivityItem';
import RevenueChart from './components/RevenueChart';
import QuickActionButton from './components/QuickActionButton';
import TeamPerformanceWidget from './components/TeamPerformanceWidget';

const AgencyDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [chartType, setChartType] = useState('line');

  const metricsData = [
  {
    title: "Active Projects",
    value: "24",
    change: "+12%",
    changeType: "positive",
    icon: "FolderKanban",
    iconColor: "bg-primary/10 text-primary",
    trend: "vs last month"
  },
  {
    title: "Pending Payments",
    value: "$48,250",
    change: "-8%",
    changeType: "negative",
    icon: "DollarSign",
    iconColor: "bg-success/10 text-success",
    trend: "vs last month"
  },
  {
    title: "Team Utilization",
    value: "87%",
    change: "+5%",
    changeType: "positive",
    icon: "Users",
    iconColor: "bg-accent/10 text-accent",
    trend: "vs last week"
  },
  {
    title: "Client Satisfaction",
    value: "4.8/5.0",
    change: "+0.3",
    changeType: "positive",
    icon: "Star",
    iconColor: "bg-warning/10 text-warning",
    trend: "average rating"
  }];


  const projectsData = [
  {
    id: 1,
    name: "Brand Redesign Project",
    client: "TechCorp Solutions",
    status: "On Track",
    progress: 75,
    dueDate: "Jan 15, 2025",
    team: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d92ac120-1763293804988.png",
      avatarAlt: "Professional headshot of Asian woman with long black hair in white blouse smiling at camera"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13c26a1b0-1763293616952.png",
      avatarAlt: "Professional headshot of Hispanic man with short black hair in navy suit and tie"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17faa8e7a-1763295754680.png",
      avatarAlt: "Professional headshot of African American woman with curly hair in red blazer"
    }]

  },
  {
    id: 2,
    name: "E-commerce Platform Development",
    client: "Fashion Boutique Inc",
    status: "At Risk",
    progress: 45,
    dueDate: "Jan 22, 2025",
    team: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11bb52de7-1763299509621.png",
      avatarAlt: "Professional headshot of Caucasian man with blonde hair in gray suit smiling"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12e75c161-1763300665850.png",
      avatarAlt: "Professional headshot of Middle Eastern woman with brown hair in blue dress"
    }]

  },
  {
    id: 3,
    name: "Mobile App UI/UX Design",
    client: "HealthTech Innovations",
    status: "On Track",
    progress: 92,
    dueDate: "Jan 8, 2025",
    team: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1828af367-1763296048776.png",
      avatarAlt: "Professional headshot of Asian woman with short black hair in green blouse"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab13fe30-1763292719033.png",
      avatarAlt: "Professional headshot of African American man with beard in black suit"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_152b99db8-1763293360035.png",
      avatarAlt: "Professional headshot of Hispanic man with glasses in blue shirt"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2d3f8ee-1763296078446.png",
      avatarAlt: "Professional headshot of Caucasian woman with red hair in purple top"
    }]

  },
  {
    id: 4,
    name: "Marketing Campaign Strategy",
    client: "Global Retail Group",
    status: "Delayed",
    progress: 30,
    dueDate: "Jan 18, 2025",
    team: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10dd8aaea-1763297610114.png",
      avatarAlt: "Professional headshot of Middle Eastern woman with long brown hair in white blazer"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
      avatarAlt: "Professional headshot of Asian man with short black hair in gray suit"
    }]

  }];


  const activitiesData = [
  {
    id: 1,
    type: "payment",
    title: "Payment Received",
    description: "TechCorp Solutions paid invoice #INV-2024-1247 for $12,500",
    timestamp: new Date(Date.now() - 900000),
    actionRequired: false
  },
  {
    id: 2,
    type: "message",
    title: "New Client Message",
    description: "Sarah from Fashion Boutique Inc sent a message regarding project timeline",
    timestamp: new Date(Date.now() - 1800000),
    actionRequired: true
  },
  {
    id: 3,
    type: "project",
    title: "Project Milestone Completed",
    description: "Mobile App UI/UX Design reached 90% completion milestone",
    timestamp: new Date(Date.now() - 3600000),
    actionRequired: false
  },
  {
    id: 4,
    type: "alert",
    title: "Deadline Approaching",
    description: "Marketing Campaign Strategy project due in 3 days - currently at 30% progress",
    timestamp: new Date(Date.now() - 7200000),
    actionRequired: true
  },
  {
    id: 5,
    type: "client",
    title: "New Client Onboarded",
    description: "HealthTech Innovations completed onboarding process and portal setup",
    timestamp: new Date(Date.now() - 10800000),
    actionRequired: false
  },
  {
    id: 6,
    type: "payment",
    title: "Invoice Sent",
    description: "Invoice #INV-2024-1248 sent to Global Retail Group for $8,750",
    timestamp: new Date(Date.now() - 14400000),
    actionRequired: false
  }];


  const revenueData = [
  { month: "Jul", revenue: 45000, projected: 48000 },
  { month: "Aug", revenue: 52000, projected: 55000 },
  { month: "Sep", revenue: 48000, projected: 51000 },
  { month: "Oct", revenue: 61000, projected: 58000 },
  { month: "Nov", revenue: 55000, projected: 60000 },
  { month: "Dec", revenue: 67000, projected: 65000 }];


  const teamMembersData = [
  {
    id: 1,
    name: "Emily Rodriguez",
    role: "Senior Designer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_119848aeb-1763295351165.png",
    avatarAlt: "Professional headshot of Hispanic woman with long brown hair in white blouse smiling warmly",
    performanceScore: 94,
    tasksCompleted: 28
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b96df5c7-1763298849215.png",
    avatarAlt: "Professional headshot of Asian man with short black hair in navy suit with confident expression",
    performanceScore: 88,
    tasksCompleted: 24
  },
  {
    id: 3,
    name: "Jessica Thompson",
    role: "Project Manager",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19614903f-1763295944351.png",
    avatarAlt: "Professional headshot of African American woman with curly hair in red blazer smiling professionally",
    performanceScore: 92,
    tasksCompleted: 31
  },
  {
    id: 4,
    name: "David Martinez",
    role: "Marketing Specialist",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3c66f04-1763301139274.png",
    avatarAlt: "Professional headshot of Caucasian man with blonde hair in gray suit with friendly smile",
    performanceScore: 76,
    tasksCompleted: 19
  }];


  const handleQuickAction = (action) => {
    console.log(`Quick action triggered: ${action}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <header className="sticky top-0 z-30 bg-card border-b border-border shadow-elevation-sm">
          <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                Agency Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-caption mt-1">
                Welcome back! Here's your business overview
              </p>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <button className="relative p-2 hover:bg-muted rounded-lg transition-smooth">
                <Icon name="Bell" size={20} className="md:w-6 md:h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
              </button>
              <UserProfileDropdown />
            </div>
          </div>
        </header>

        <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <BreadcrumbNavigation />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsData?.map((metric, index) =>
            <MetricCard key={index} {...metric} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} type={chartType} />
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}>

                  Line Chart
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}>

                  Bar Chart
                </Button>
              </div>
            </div>

            <div>
              <TeamPerformanceWidget teamMembers={teamMembersData} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">Active Projects</h3>
                    <p className="text-sm md:text-base text-muted-foreground font-caption">Current project status overview</p>
                  </div>
                  <Button variant="outline" iconName="Plus" iconPosition="left" size="sm">
                    New Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {projectsData?.map((project) =>
                  <ProjectCard key={project?.id} project={project} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">Recent Activity</h3>
                    <p className="text-sm md:text-base text-muted-foreground font-caption">Latest updates and notifications</p>
                  </div>
                  <Icon name="Activity" size={20} className="text-primary md:w-6 md:h-6" />
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-custom">
                  {activitiesData?.map((activity) =>
                  <ActivityItem key={activity?.id} activity={activity} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">Quick Actions</h3>
              <p className="text-sm md:text-base text-muted-foreground font-caption">Frequently used actions for faster workflow</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              <QuickActionButton
                label="Create Project"
                icon="FolderPlus"
                variant="default"
                onClick={() => handleQuickAction('create-project')} />

              <QuickActionButton
                label="Invite Client"
                icon="UserPlus"
                variant="outline"
                onClick={() => handleQuickAction('invite-client')} />

              <QuickActionButton
                label="Generate Invoice"
                icon="FileText"
                variant="outline"
                onClick={() => handleQuickAction('generate-invoice')} />

              <QuickActionButton
                label="View Reports"
                icon="BarChart3"
                variant="outline"
                onClick={() => handleQuickAction('view-reports')} />

            </div>
          </div>
        </main>

        <footer className="border-t border-border bg-card mt-8 md:mt-12">
          <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground font-caption">
                  © {new Date()?.getFullYear()} Fruitynet. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground font-caption mt-1">
                  Agency Management Platform v2.0
                </p>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth font-caption">
                  Help Center
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth font-caption">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth font-caption">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>);

};

export default AgencyDashboard;