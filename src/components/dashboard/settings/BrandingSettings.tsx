import React, { useState } from 'react';
import { Upload, Check, RotateCcw } from 'lucide-react';
import { useSettingsStore } from '../../../store/settingsStore';

export default function BrandingSettings() {
  const { settings, updateSettings, resetToDefault } = useSettingsStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [companyName, setCompanyName] = useState(settings.name);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSettings({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    updateSettings({ name: companyName });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRevert = async () => {
    setIsSaving(true);
    resetToDefault();
    setCompanyName('mavrika');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-neutral-dark/30 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Branding</h2>
        <button
          onClick={handleRevert}
          className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Revert to mavrika Branding
        </button>
      </div>

      <div className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Company Logo</label>
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
              {settings.logo ? (
                <img src={settings.logo} alt="Company logo" className="w-full h-full object-contain" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <label className="block">
                <span className="sr-only">Choose logo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-[#72f68e] file:text-[#040707]
                    hover:file:bg-[#72f68e]/90
                    file:cursor-pointer"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                Recommended size: 512x512px. Max file size: 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
          />
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
            className="bg-[#72f68e] text-[#040707] px-4 py-2 rounded-lg hover:bg-[#72f68e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}