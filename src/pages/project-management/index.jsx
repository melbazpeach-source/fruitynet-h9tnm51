import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectOverviewCard from './components/ProjectOverviewCard';
import KanbanBoard from './components/KanbanBoard';
import TaskListView from './components/TaskListView';
import TimeTrackingWidget from './components/TimeTrackingWidget';
import ProjectCommunicationPanel from './components/ProjectCommunicationPanel';
import MilestoneTimeline from './components/MilestoneTimeline';

const ProjectManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('kanban');
  const [selectedProject, setSelectedProject] = useState('project-1');

  const projectData = {
    id: 'project-1',
    name: "E-Commerce Website Redesign",
    description: "Complete redesign and development of the client's e-commerce platform with modern UI/UX, improved performance, and enhanced mobile experience.",
    status: "In Progress",
    priority: "High",
    progress: 67,
    dueDate: "Jan 15, 2026",
    totalTasks: 48,
    completedTasks: 32,
    hoursLogged: 156,
    totalMilestones: 5,
    completedMilestones: 3,
    client: {
      name: "TechStyle Boutique",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13677ef73-1763293657301.png",
      avatarAlt: "Professional headshot of Asian woman with long black hair wearing elegant navy blazer and pearl necklace"
    },
    teamMembers: [
    {
      name: "Sarah Mitchell",
      role: "Project Manager",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1158c42da-1763295926268.png",
      avatarAlt: "Professional headshot of Caucasian woman with shoulder-length blonde hair in gray business suit"
    },
    {
      name: "Marcus Johnson",
      role: "Lead Developer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19e63152b-1763296064836.png",
      avatarAlt: "Professional headshot of African American man with short black hair wearing navy blue shirt"
    },
    {
      name: "Emily Chen",
      role: "UI/UX Designer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2c344ce-1763299429241.png",
      avatarAlt: "Professional headshot of Asian woman with short black hair wearing white blouse and glasses"
    },
    {
      name: "David Rodriguez",
      role: "Frontend Developer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116742dea-1763296857162.png",
      avatarAlt: "Professional headshot of Hispanic man with dark hair and beard wearing casual blue shirt"
    },
    {
      name: "Lisa Anderson",
      role: "QA Engineer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf57749d-1763298588302.png",
      avatarAlt: "Professional headshot of Caucasian woman with red hair wearing green sweater"
    }]

  };

  const tasksData = [
  {
    id: 'task-1',
    title: "Design homepage mockups",
    description: "Create high-fidelity mockups for the new homepage design including hero section, featured products, and promotional banners.",
    status: "Completed",
    priority: "High",
    dueDate: "Dec 20, 2025",
    timeLogged: 12,
    attachments: 5,
    comments: 8,
    assignedTo: [
    {
      name: "Emily Chen",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2c344ce-1763299429241.png",
      avatarAlt: "Professional headshot of Asian woman with short black hair wearing white blouse and glasses"
    }],

    subtasks: [
    { title: "Research competitor designs", completed: true },
    { title: "Create wireframes", completed: true },
    { title: "Design hero section", completed: true },
    { title: "Client review and feedback", completed: true }]

  },
  {
    id: 'task-2',
    title: "Implement product filtering system",
    description: "Develop advanced filtering functionality with multiple criteria including price range, categories, brands, and ratings.",
    status: "In Progress",
    priority: "High",
    dueDate: "Jan 5, 2026",
    timeLogged: 18,
    attachments: 2,
    comments: 12,
    assignedTo: [
    {
      name: "Marcus Johnson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19e63152b-1763296064836.png",
      avatarAlt: "Professional headshot of African American man with short black hair wearing navy blue shirt"
    },
    {
      name: "David Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116742dea-1763296857162.png",
      avatarAlt: "Professional headshot of Hispanic man with dark hair and beard wearing casual blue shirt"
    }],

    subtasks: [
    { title: "Design filter UI components", completed: true },
    { title: "Implement backend API", completed: true },
    { title: "Connect frontend to API", completed: false },
    { title: "Add loading states", completed: false },
    { title: "Test filter combinations", completed: false }]

  },
  {
    id: 'task-3',
    title: "Mobile responsive testing",
    description: "Comprehensive testing of all pages and features across various mobile devices and screen sizes to ensure optimal user experience.",
    status: "Review",
    priority: "Medium",
    dueDate: "Jan 8, 2026",
    timeLogged: 8,
    attachments: 3,
    comments: 5,
    assignedTo: [
    {
      name: "Lisa Anderson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf57749d-1763298588302.png",
      avatarAlt: "Professional headshot of Caucasian woman with red hair wearing green sweater"
    }],

    subtasks: [
    { title: "Test on iOS devices", completed: true },
    { title: "Test on Android devices", completed: true },
    { title: "Document issues", completed: false },
    { title: "Verify fixes", completed: false }]

  },
  {
    id: 'task-4',
    title: "Setup payment gateway integration",
    description: "Integrate Stripe payment processing with support for credit cards, digital wallets, and buy now pay later options.",
    status: "To Do",
    priority: "High",
    dueDate: "Jan 12, 2026",
    timeLogged: 0,
    attachments: 1,
    comments: 3,
    assignedTo: [
    {
      name: "Marcus Johnson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19e63152b-1763296064836.png",
      avatarAlt: "Professional headshot of African American man with short black hair wearing navy blue shirt"
    }],

    subtasks: [
    { title: "Review Stripe documentation", completed: false },
    { title: "Setup test environment", completed: false },
    { title: "Implement checkout flow", completed: false },
    { title: "Add payment methods", completed: false },
    { title: "Security testing", completed: false }]

  },
  {
    id: 'task-5',
    title: "Create product detail page template",
    description: "Design and develop reusable template for product detail pages with image galleries, specifications, reviews, and related products.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "Jan 3, 2026",
    timeLogged: 14,
    attachments: 4,
    comments: 9,
    assignedTo: [
    {
      name: "Emily Chen",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2c344ce-1763299429241.png",
      avatarAlt: "Professional headshot of Asian woman with short black hair wearing white blouse and glasses"
    },
    {
      name: "David Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116742dea-1763296857162.png",
      avatarAlt: "Professional headshot of Hispanic man with dark hair and beard wearing casual blue shirt"
    }],

    subtasks: [
    { title: "Design layout", completed: true },
    { title: "Implement image gallery", completed: true },
    { title: "Add product specifications", completed: false },
    { title: "Integrate reviews section", completed: false }]

  },
  {
    id: 'task-6',
    title: "Optimize site performance",
    description: "Improve page load times, implement lazy loading, optimize images, and enhance overall site performance metrics.",
    status: "To Do",
    priority: "Low",
    dueDate: "Jan 10, 2026",
    timeLogged: 0,
    attachments: 0,
    comments: 2,
    assignedTo: [
    {
      name: "David Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116742dea-1763296857162.png",
      avatarAlt: "Professional headshot of Hispanic man with dark hair and beard wearing casual blue shirt"
    }],

    subtasks: [
    { title: "Run performance audit", completed: false },
    { title: "Optimize images", completed: false },
    { title: "Implement lazy loading", completed: false },
    { title: "Minify assets", completed: false }]

  }];


  const milestonesData = [
  {
    id: 'milestone-1',
    title: "Project Kickoff & Planning",
    description: "Initial project setup, requirements gathering, and team alignment on project goals and deliverables.",
    status: "Completed",
    dueDate: "Nov 15, 2025",
    completedDate: "Nov 14, 2025",
    tasksCompleted: 8,
    totalTasks: 8,
    deliverables: [
    { name: "Project charter document", completed: true },
    { name: "Technical requirements specification", completed: true },
    { name: "Design system guidelines", completed: true }]

  },
  {
    id: 'milestone-2',
    title: "Design Phase Completion",
    description: "All design mockups, prototypes, and style guides completed and approved by client.",
    status: "Completed",
    dueDate: "Dec 10, 2025",
    completedDate: "Dec 8, 2025",
    tasksCompleted: 12,
    totalTasks: 12,
    deliverables: [
    { name: "Homepage design mockups", completed: true },
    { name: "Product page templates", completed: true },
    { name: "Mobile responsive designs", completed: true },
    { name: "Component library", completed: true }]

  },
  {
    id: 'milestone-3',
    title: "Frontend Development Phase 1",
    description: "Core frontend components and pages implemented with responsive design and basic functionality.",
    status: "Completed",
    dueDate: "Dec 28, 2025",
    completedDate: "Dec 26, 2025",
    tasksCompleted: 15,
    totalTasks: 15,
    deliverables: [
    { name: "Homepage implementation", completed: true },
    { name: "Product listing pages", completed: true },
    { name: "Navigation system", completed: true }]

  },
  {
    id: 'milestone-4',
    title: "Backend Integration & Features",
    description: "Integration of all backend services, payment processing, and advanced features implementation.",
    status: "In Progress",
    dueDate: "Jan 15, 2026",
    tasksCompleted: 8,
    totalTasks: 18,
    deliverables: [
    { name: "Payment gateway integration", completed: false },
    { name: "User authentication system", completed: true },
    { name: "Product filtering and search", completed: false },
    { name: "Shopping cart functionality", completed: true }]

  },
  {
    id: 'milestone-5',
    title: "Testing, Launch & Handoff",
    description: "Comprehensive testing, bug fixes, client training, and successful project launch.",
    status: "Upcoming",
    dueDate: "Feb 1, 2026",
    tasksCompleted: 0,
    totalTasks: 12,
    deliverables: [
    { name: "QA testing report", completed: false },
    { name: "Performance optimization", completed: false },
    { name: "Client training documentation", completed: false },
    { name: "Production deployment", completed: false }]

  }];


  const messagesData = [
  {
    id: 'msg-1',
    sender: {
      name: "Sarah Mitchell",
      role: "Project Manager",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1158c42da-1763295926268.png",
      avatarAlt: "Professional headshot of Caucasian woman with shoulder-length blonde hair in gray business suit"
    },
    content: "Team, great progress this week! We're on track to complete the frontend development phase by the deadline. Let's focus on the payment integration next.",
    timestamp: new Date(Date.now() - 3600000),
    mentions: []
  },
  {
    id: 'msg-2',
    sender: {
      name: "Marcus Johnson",
      role: "Lead Developer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19e63152b-1763296064836.png",
      avatarAlt: "Professional headshot of African American man with short black hair wearing navy blue shirt"
    },
    content: "I\'ve completed the initial setup for Stripe integration. @David Rodriguez can you review the checkout flow implementation?",
    timestamp: new Date(Date.now() - 7200000),
    mentions: ["David Rodriguez"],
    attachments: [
    { name: "stripe-integration-docs.pdf", size: "2.4 MB" }]

  },
  {
    id: 'msg-3',
    sender: {
      name: "Emily Chen",
      role: "UI/UX Designer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2c344ce-1763299429241.png",
      avatarAlt: "Professional headshot of Asian woman with short black hair wearing white blouse and glasses"
    },
    content: "The client loved the new product detail page design! I\'ve uploaded the final mockups to the shared drive. Ready for development.",
    timestamp: new Date(Date.now() - 10800000),
    mentions: []
  },
  {
    id: 'msg-4',
    sender: {
      name: "David Rodriguez",
      role: "Frontend Developer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116742dea-1763296857162.png",
      avatarAlt: "Professional headshot of Hispanic man with dark hair and beard wearing casual blue shirt"
    },
    content: "@Marcus Johnson Will review the checkout flow today. Also, I've noticed some performance issues on mobile that we should address before launch.",
    timestamp: new Date(Date.now() - 14400000),
    mentions: ["Marcus Johnson"]
  },
  {
    id: 'msg-5',
    sender: {
      name: "Lisa Anderson",
      role: "QA Engineer",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf57749d-1763298588302.png",
      avatarAlt: "Professional headshot of Caucasian woman with red hair wearing green sweater"
    },
    content: "I've completed mobile testing on iOS devices. Found a few minor UI issues that I've documented in the bug tracker. Overall looking good!",
    timestamp: new Date(Date.now() - 18000000),
    mentions: [],
    attachments: [
    { name: "mobile-testing-report.xlsx", size: "1.8 MB" }]

  }];


  const handleStatusChange = (taskId, currentStatus) => {
    console.log(`Changing status for task ${taskId} from ${currentStatus}`);
  };

  const handleEditTask = (taskId) => {
    console.log(`Editing task ${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    console.log(`Deleting task ${taskId}`);
  };

  const handleAddTask = (status) => {
    console.log(`Adding new task with status ${status}`);
  };

  const handleTimeLog = (taskId, hours, note) => {
    console.log(`Logging ${hours} hours for task ${taskId}. Note: ${note}`);
  };

  return (
    <>
      <Helmet>
        <title>Project Management - Fruitynet</title>
        <meta name="description" content="Manage your projects with comprehensive task coordination, team collaboration, and timeline tracking tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />


        <div className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
          <header className="sticky top-0 z-30 bg-card border-b border-border shadow-elevation-sm">
            <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <h1 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                  Project Management
                </h1>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Share2"
                  iconPosition="left"
                  className="hidden md:inline-flex">

                  Share
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left">

                  New Task
                </Button>
                <UserProfileDropdown />
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8">
            <BreadcrumbNavigation />

            <div className="space-y-6 md:space-y-8">
              <ProjectOverviewCard project={projectData} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                        Tasks & Activities
                      </h2>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewMode('kanban')}
                          className={`px-3 py-2 rounded-lg transition-smooth ${viewMode === 'kanban' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                          title="Kanban view">

                          <Icon name="LayoutGrid" size={18} />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-3 py-2 rounded-lg transition-smooth ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                          title="List view">

                          <Icon name="List" size={18} />
                        </button>
                      </div>
                    </div>

                    {viewMode === 'kanban' ?
                    <KanbanBoard
                      tasks={tasksData}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onAddTask={handleAddTask} /> :


                    <TaskListView
                      tasks={tasksData}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask} />

                    }
                  </div>

                  <MilestoneTimeline milestones={milestonesData} />
                </div>

                <div className="space-y-6">
                  <TimeTrackingWidget
                    taskId="task-2"
                    currentTime={18}
                    onTimeLog={handleTimeLog} />


                  <ProjectCommunicationPanel
                    projectId={selectedProject}
                    messages={messagesData} />

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>);

};

export default ProjectManagement;