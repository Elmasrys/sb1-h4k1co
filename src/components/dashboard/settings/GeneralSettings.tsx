import React, { useState } from 'react';
import { Check, Globe2, Clock, Bell, Shield, Users, Zap } from 'lucide-react';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    timezone: 'UTC',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      updates: true,
      security: true
    },
    preferences: {
      autoSave: true,
      darkMode: true,
      compactView: false
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>

      <div className="space-y-8">
        {/* Language & Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
              <Globe2 className="h-4 w-4 mr-2 text-[#72f68e]" />
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
              <Clock className="h-4 w-4 mr-2 text-[#72f68e]" />
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">GMT</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-4">
            <Bell className="h-4 w-4 mr-2 text-[#72f68e]" />
            Notifications
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center p-4 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked }
                })}
                className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
              />
              <div className="ml-3">
                <span className="block text-white">Email Notifications</span>
                <span className="block text-sm text-gray-400">Receive updates via email</span>
              </div>
            </label>

            <label className="flex items-center p-4 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked }
                })}
                className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
              />
              <div className="ml-3">
                <span className="block text-white">Push Notifications</span>
                <span className="block text-sm text-gray-400">Browser notifications</span>
              </div>
            </label>

            <label className="flex items-center p-4 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={settings.notifications.security}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, security: e.target.checked }
                })}
                className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
              />
              <div className="ml-3">
                <span className="block text-white">Security Alerts</span>
                <span className="block text-sm text-gray-400">Important security updates</span>
              </div>
            </label>

            <label className="flex items-center p-4 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={settings.notifications.updates}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, updates: e.target.checked }
                })}
                className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
              />
              <div className="ml-3">
                <span className="block text-white">EVE™ Updates</span>
                <span className="block text-sm text-gray-400">New features and improvements</span>
              </div>
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-4">
            <Zap className="h-4 w-4 mr-2 text-[#72f68e]" />
            Interface Preferences
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center p-4 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={settings.preferences.autoSave}
                onChange={(e) => setSettings({
                  ...settings,
                  preferences: { ...settings.preferences, autoSave: e.target.checked }
                })}
                className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
              />
              <div className="ml-3">
                <span className="block text-white">Auto-save Changes</span>
                <span className="block text-sm text-gray-400">Save changes automatically</span>
              </div>
            </label>

            <label className="flex items-center p-4 bg-white/5 rounded-lg">
              <input
                type="checkbox"
                checked={settings.preferences.darkMode}
                onChange={(e) => setSettings({
                  ...settings,
                  preferences: { ...settings.preferences, darkMode: e.target.checked }
                })}
                className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
              />
              <div className="ml-3">
                <span className="block text-white">Dark Mode</span>
                <span className="block text-sm text-gray-400">Use dark theme</span>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end space-x-4">
          {showSuccess && (
            <div className="flex items-center text-[#72f68e]">
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