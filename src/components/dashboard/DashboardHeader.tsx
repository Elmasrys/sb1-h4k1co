import React, { useState } from 'react';
import { Bell, User, Settings, LogOut, Search, Plus, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Link } from 'react-router-dom';

export default function DashboardHeader() {
  const { user, signOut } = useAuthStore();
  const { settings } = useSettingsStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New EVE™ Deployed',
      description: 'Atlas has successfully deployed a new marketing EVE™.',
      time: '2 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Performance Alert',
      description: 'Customer response time has improved by 35%',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'System Update',
      description: 'New features have been added to your dashboard',
      time: '2 hours ago',
      unread: false,
    },
  ];

  const quickActions = [
    { name: 'Create New EVE™', icon: Plus, link: '/dashboard/agents' },
    { name: 'View Reports', icon: Search, link: '/dashboard/reports' },
    { name: 'System Settings', icon: Settings, link: '/dashboard/settings' },
  ];

  return (
    <header className="bg-brand-accent/30 backdrop-blur-sm border-b border-white/10 relative z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search */}
          <div className="flex-1 min-w-0 flex items-center">
            <div className="w-full max-w-lg">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="h-5 w-5" />
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              {showQuickActions && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-accent border border-white/10 rounded-lg shadow-lg py-1 z-50">
                  {quickActions.map((action) => (
                    <Link
                      key={action.name}
                      to={action.link}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
                      onClick={() => setShowQuickActions(false)}
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-400 hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-primary text-brand-accent text-xs flex items-center justify-center rounded-full">
                  2
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-brand-accent border border-white/10 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-white/10">
                    <h3 className="text-sm font-medium text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-brand-primary/10 transition-colors ${
                          notification.unread ? 'bg-brand-primary/5' : ''
                        }`}
                      >
                        <p className="text-sm font-medium text-white">{notification.title}</p>
                        <p className="text-sm text-gray-400 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-white/10">
                    <button className="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-brand-primary" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-accent border border-white/10 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-sm font-medium text-white">{user?.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{settings.name}</p>
                  </div>
                  
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}