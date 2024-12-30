import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useSettingsStore } from '../../../store/settingsStore';

export default function AppearanceSettings() {
  const { settings, updateColors } = useSettingsStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [localColors, setLocalColors] = useState(settings.colors);

  const handleColorChange = (key: keyof typeof settings.colors, value: string) => {
    setLocalColors(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    updateColors(localColors);
    
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', localColors.primary);
    root.style.setProperty('--color-secondary', localColors.secondary);
    root.style.setProperty('--color-accent', localColors.accent);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-neutral-dark/30 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Appearance</h2>

      <div className="space-y-6">
        {/* Color Scheme */}
        <div>
          <h3 className="text-sm font-medium text-gray-200 mb-4">Color Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={localColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={localColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm w-28"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={localColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={localColors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm w-28"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Accent Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={localColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={localColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm w-28"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-sm font-medium text-gray-200 mb-4">Preview</h3>
          <div className="bg-white/5 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Primary</span>
                <div className="h-12 w-32 rounded-lg" style={{ backgroundColor: localColors.primary }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Secondary</span>
                <div className="h-12 w-32 rounded-lg" style={{ backgroundColor: localColors.secondary }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Accent</span>
                <div className="h-12 w-32 rounded-lg" style={{ backgroundColor: localColors.accent }} />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end space-x-4">
          {showSuccess && (
            <div className="flex items-center text-green-500">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-sm">Changes saved</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}