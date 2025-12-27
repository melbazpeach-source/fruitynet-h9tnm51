import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';


const BrandingTab = ({ brandingData, onBrandingChange, onLogoUpload }) => {
  const [logoPreview, setLogoPreview] = useState(brandingData?.logo);

  const handleLogoChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader?.result);
        onLogoUpload(reader?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorType, value) => {
    onBrandingChange({ ...brandingData, [colorType]: value });
  };

  const colorPresets = [
    { name: 'Ocean Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#60A5FA' },
    { name: 'Forest Green', primary: '#065F46', secondary: '#059669', accent: '#34D399' },
    { name: 'Sunset Orange', primary: '#C2410C', secondary: '#F97316', accent: '#FB923C' },
    { name: 'Royal Purple', primary: '#6B21A8', secondary: '#9333EA', accent: '#C084FC' },
    { name: 'Cherry Red', primary: '#991B1B', secondary: '#DC2626', accent: '#F87171' }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Logo Upload
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3 md:mb-4">
              Upload Your Logo
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 lg:p-12 text-center hover:border-primary transition-smooth bg-muted/30">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Icon name="Upload" size={32} className="mx-auto mb-3 md:mb-4 text-muted-foreground" />
                <p className="text-sm md:text-base text-foreground font-medium mb-1 md:mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">
                  PNG, JPG, SVG up to 5MB
                </p>
              </label>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3 font-caption">
              Recommended size: 200x60px for optimal display
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3 md:mb-4">
              Logo Preview
            </label>
            <div className="border border-border rounded-lg p-6 md:p-8 lg:p-12 bg-background flex items-center justify-center min-h-[200px]">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Uploaded company logo preview showing brand identity"
                  className="max-w-full max-h-[120px] md:max-h-[150px] object-contain"
                />
              ) : (
                <div className="text-center">
                  <Icon name="Image" size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground font-caption">No logo uploaded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Color Scheme
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
                Primary Color
              </label>
              <div className="flex gap-2 md:gap-3">
                <input
                  type="color"
                  value={brandingData?.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e?.target?.value)}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-md cursor-pointer border border-border"
                />
                <Input
                  type="text"
                  value={brandingData?.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e?.target?.value)}
                  placeholder="#1E40AF"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
                Secondary Color
              </label>
              <div className="flex gap-2 md:gap-3">
                <input
                  type="color"
                  value={brandingData?.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e?.target?.value)}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-md cursor-pointer border border-border"
                />
                <Input
                  type="text"
                  value={brandingData?.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e?.target?.value)}
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
                Accent Color
              </label>
              <div className="flex gap-2 md:gap-3">
                <input
                  type="color"
                  value={brandingData?.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e?.target?.value)}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-md cursor-pointer border border-border"
                />
                <Input
                  type="text"
                  value={brandingData?.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e?.target?.value)}
                  placeholder="#F97316"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3 md:mb-4">
              Color Presets
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {colorPresets?.map((preset) => (
                <button
                  key={preset?.name}
                  onClick={() => {
                    onBrandingChange({
                      ...brandingData,
                      primaryColor: preset?.primary,
                      secondaryColor: preset?.secondary,
                      accentColor: preset?.accent
                    });
                  }}
                  className="border border-border rounded-lg p-3 md:p-4 hover:border-primary transition-smooth hover:shadow-elevation-sm"
                >
                  <div className="flex gap-1 md:gap-2 mb-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded" style={{ backgroundColor: preset?.primary }} />
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded" style={{ backgroundColor: preset?.secondary }} />
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded" style={{ backgroundColor: preset?.accent }} />
                  </div>
                  <p className="text-xs md:text-sm font-caption text-foreground">{preset?.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-sm">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Typography
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
              Heading Font
            </label>
            <select
              value={brandingData?.headingFont}
              onChange={(e) => handleColorChange('headingFont', e?.target?.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            >
              <option value="Outfit">Outfit</option>
              <option value="Inter">Inter</option>
              <option value="Source Sans 3">Source Sans 3</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
              Body Font
            </label>
            <select
              value={brandingData?.bodyFont}
              onChange={(e) => handleColorChange('bodyFont', e?.target?.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            >
              <option value="Source Sans 3">Source Sans 3</option>
              <option value="Inter">Inter</option>
              <option value="Outfit">Outfit</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingTab;