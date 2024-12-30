import React from 'react';
import BrandingSettings from './BrandingSettings';
import AppearanceSettings from './AppearanceSettings';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import APISettings from './APISettings';

export default function SettingsView() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Customize your mavrika experience</p>
        </div>

        <div className="space-y-8">
          <APISettings />
          <BrandingSettings />
          <AppearanceSettings />
          <GeneralSettings />
          <SecuritySettings />
        </div>
      </div>
    </div>
  );
}