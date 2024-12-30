import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-brand-accent/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-brand-accent/40 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-lg bg-brand-primary/20 p-3">
            <Icon className="h-6 w-6 text-brand-primary" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        <p className="mt-2 text-sm text-brand-primary">{trend}</p>
      </div>
    </div>
  );
}