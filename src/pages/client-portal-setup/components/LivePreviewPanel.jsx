import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LivePreviewPanel = ({ brandingData }) => {
  const [viewportMode, setViewportMode] = useState('desktop');

  const viewportModes = [
    { id: 'desktop', icon: 'Monitor', label: 'Desktop' },
    { id: 'tablet', icon: 'Tablet', label: 'Tablet' },
    { id: 'mobile', icon: 'Smartphone', label: 'Mobile' }
  ];

  const getViewportClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-md overflow-hidden">
      <div className="border-b border-border p-3 md:p-4 bg-muted/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Live Preview
          </h3>
          <div className="flex gap-1 md:gap-2">
            {viewportModes?.map((mode) => (
              <button
                key={mode?.id}
                onClick={() => setViewportMode(mode?.id)}
                className={`px-3 py-2 rounded-md transition-smooth flex items-center gap-2 ${
                  viewportMode === mode?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground hover:bg-muted'
                }`}
                title={mode?.label}
              >
                <Icon name={mode?.icon} size={16} />
                <span className="text-xs md:text-sm font-caption hidden sm:inline">{mode?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 lg:p-8 bg-muted/20 min-h-[600px] flex items-start justify-center overflow-auto">
        <div className={`${getViewportClass()} transition-all duration-300 bg-background rounded-lg shadow-elevation-lg overflow-hidden`}>
          <div
            className="p-4 md:p-6 border-b border-border"
            style={{ backgroundColor: brandingData?.primaryColor }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {brandingData?.logo ? (
                  <Image
                    src={brandingData?.logo}
                    alt="Company logo displayed in portal header"
                    className="h-8 md:h-10 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Icon name="Grape" size={24} color="white" />
                  </div>
                )}
                <span
                  className="text-base md:text-lg font-heading font-semibold"
                  style={{ color: 'white', fontFamily: brandingData?.headingFont }}
                >
                  Client Portal
                </span>
              </div>
              <Button variant="ghost" size="sm" iconName="Menu">
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6 md:mb-8">
              <h1
                className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold mb-2 md:mb-3"
                style={{
                  color: brandingData?.primaryColor,
                  fontFamily: brandingData?.headingFont
                }}
              >
                Welcome Back, Sarah
              </h1>
              <p
                className="text-sm md:text-base text-muted-foreground"
                style={{ fontFamily: brandingData?.bodyFont }}
              >
                Here's what's happening with your projects today
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="border border-border rounded-lg p-4 md:p-5 bg-background">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${brandingData?.primaryColor}20` }}
                  >
                    <Icon name="FolderKanban" size={20} color={brandingData?.primaryColor} />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground font-caption">Active Projects</p>
                    <p className="text-lg md:text-xl font-heading font-semibold text-foreground">3</p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 md:p-5 bg-background">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${brandingData?.accentColor}20` }}
                  >
                    <Icon name="Clock" size={20} color={brandingData?.accentColor} />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground font-caption">Pending Tasks</p>
                    <p className="text-lg md:text-xl font-heading font-semibold text-foreground">7</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div
                className="p-3 md:p-4 border-b border-border"
                style={{ backgroundColor: `${brandingData?.primaryColor}10` }}
              >
                <h3
                  className="text-sm md:text-base font-heading font-semibold"
                  style={{ color: brandingData?.primaryColor }}
                >
                  Recent Activity
                </h3>
              </div>
              <div className="divide-y divide-border">
                {[1, 2, 3]?.map((item) => (
                  <div key={item} className="p-3 md:p-4 hover:bg-muted/30 transition-smooth">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${brandingData?.secondaryColor}20` }}
                      >
                        <Icon name="CheckCircle" size={16} color={brandingData?.secondaryColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs md:text-sm font-medium text-foreground mb-1"
                          style={{ fontFamily: brandingData?.bodyFont }}
                        >
                          Project milestone completed
                        </p>
                        <p className="text-xs text-muted-foreground font-caption">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                className="flex-1 px-4 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base transition-smooth hover:shadow-elevation-sm"
                style={{
                  backgroundColor: brandingData?.primaryColor,
                  color: 'white'
                }}
              >
                View All Projects
              </button>
              <button
                className="flex-1 px-4 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base border transition-smooth hover:shadow-elevation-sm"
                style={{
                  borderColor: brandingData?.primaryColor,
                  color: brandingData?.primaryColor
                }}
              >
                New Request
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border p-3 md:p-4 bg-muted/30">
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground font-caption">
          <Icon name="Info" size={16} />
          <span>Preview updates in real-time as you customize your portal</span>
        </div>
      </div>
    </div>
  );
};

export default LivePreviewPanel;