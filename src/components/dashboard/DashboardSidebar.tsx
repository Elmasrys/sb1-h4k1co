import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ChevronLeft, ChevronRight, LayoutGrid, Users, BrainCircuit, Network, FileSpreadsheet, Settings, RefreshCw, BarChart, UserCircle, LineChart, ListTodo, FileText } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutGrid },
  { name: 'EVEs™', href: '/dashboard/agents', icon: BrainCircuit },
  { name: 'Humans', href: '/dashboard/humans', icon: UserCircle },
  { name: 'Teams', href: '/dashboard/teams', icon: Users },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Tasks', href: '/dashboard/tasks', icon: ListTodo },
  { name: 'API Integration', href: '/dashboard/api', icon: Network },
  { name: 'Feedback Loop', href: '/dashboard/feedback', icon: RefreshCw },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart },
  { name: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const { signOut } = useAuthStore();
  const { settings } = useSettingsStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`hidden md:flex md:flex-shrink-0 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col h-0 flex-1 bg-brand-accent/95 backdrop-blur-lg">
          {/* Logo Section */}
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-brand-accent">
            <div className="flex items-center gap-2">
              {settings.logo ? (
                <img src={settings.logo} alt="Logo" className="h-8 w-8 object-contain" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-brand-primary" />
              )}
              {!isCollapsed && (
                <span className="text-xl font-bold text-white">{settings.name}</span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && item.name}
                </NavLink>
              ))}
            </nav>

            {/* Sign Out Button */}
            <div className="flex-shrink-0 flex border-t border-white/10 p-4">
              <button
                onClick={signOut}
                className="flex-shrink-0 w-full group block text-gray-300 hover:text-white"
              >
                {!isCollapsed && (
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm font-medium">Sign out</p>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-20 -right-3 bg-brand-accent rounded-full p-1 text-gray-400 hover:text-white transition-colors border border-white/10"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}