import React from 'react';
import { Activity, CheckCircle, Clock, AlertCircle, FileText, Bank, Users } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'approval',
    human: 'Fady',
    action: 'approved the Q2 marketing campaign and provided bank details',
    time: '2 minutes ago',
    icon: CheckCircle,
    iconColor: 'text-[#72f68e]',
  },
  {
    id: 2,
    type: 'document',
    human: 'Sarah',
    action: 'submitted shareholder agreements for EVE™ review',
    time: '15 minutes ago',
    icon: FileText,
    iconColor: 'text-[#72f68e]',
  },
  {
    id: 3,
    type: 'completion',
    agent: 'Nova',
    action: 'generated monthly financial forecasts',
    time: '30 minutes ago',
    icon: CheckCircle,
    iconColor: 'text-[#72f68e]',
  },
  {
    id: 4,
    type: 'alert',
    agent: 'Sentinel',
    action: 'detected unusual social media sentiment pattern',
    time: '1 hour ago',
    icon: AlertCircle,
    iconColor: 'text-yellow-500',
  },
  {
    id: 5,
    type: 'document',
    human: 'Fady',
    action: 'uploaded legal documents for incorporation',
    time: '2 hours ago',
    icon: FileText,
    iconColor: 'text-[#72f68e]',
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <Activity className="h-5 w-5 text-[#72f68e] mr-2" />
        <h2 className="text-lg font-semibold text-white">Recent Activities</h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <activity.icon className={`h-5 w-5 ${activity.iconColor} mt-1`} />
            <div>
              <p className="text-sm text-white">
                {activity.human ? (
                  <span className="font-medium text-[#72f68e]">{activity.human}</span>
                ) : (
                  <span className="font-medium text-[#72f68e]">{activity.agent}</span>
                )}{' '}
                {activity.action}
              </p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}