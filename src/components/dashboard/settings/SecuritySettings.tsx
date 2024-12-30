import React, { useState } from 'react';
import { Check, Key, Shield, Lock, AlertTriangle, FileText, Bell } from 'lucide-react';

export default function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState({
    twoFactor: true,
    sessionTimeout: '30',
    loginNotifications: true,
    securityAlerts: true,
    dataEncryption: true,
    auditLogs: true
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Security & Privacy</h2>

      <div className="space-y-8">
        {/* Authentication */}
        <div>
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-[#72f68e] mr-2" />
            <h3 className="text-sm font-medium text-gray-200">Authentication</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactor}
                  onChange={(e) => setSettings({ ...settings, twoFactor: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72f68e]"></div>
              </label>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">Session Timeout</h4>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              <p className="text-sm text-gray-400">
                Automatically log out after period of inactivity
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-[#72f68e] mr-2" />
            <h3 className="text-sm font-medium text-gray-200">Security Alerts</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Login Notifications</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Get notified of new sign-ins to your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.loginNotifications}
                  onChange={(e) => setSettings({ ...settings, loginNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72f68e]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Security Alerts</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Receive alerts about suspicious activities
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.securityAlerts}
                  onChange={(e) => setSettings({ ...settings, securityAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72f68e]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div>
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-[#72f68e] mr-2" />
            <h3 className="text-sm font-medium text-gray-200">Data Protection</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">End-to-End Encryption</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Enable encryption for all data
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dataEncryption}
                  onChange={(e) => setSettings({ ...settings, dataEncryption: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72f68e]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">Audit Logging</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Track all security-related events
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.auditLogs}
                  onChange={(e) => setSettings({ ...settings, auditLogs: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72f68e]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-[#72f68e]" />
            <h3 className="text-white font-medium">Security Status</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Security Score</span>
              <span className="text-[#72f68e] font-medium">92/100</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-[#72f68e] rounded-full" />
            </div>
            <div className="text-sm text-gray-400">
              Your account security is good, but could be improved by enabling two-factor authentication.
            </div>
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