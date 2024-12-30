import React, { useState } from 'react';
import { X, UserCircle, Mail, Building2, Shield, BrainCircuit } from 'lucide-react';

interface NewHumanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewHumanModal({ isOpen, onClose }: NewHumanModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    permissions: 'member',
    assignedEves: [] as string[]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-2xl p-6 m-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add Team Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <UserCircle className="h-4 w-4 mr-2 text-[#72f68e]" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <Mail className="h-4 w-4 mr-2 text-[#72f68e]" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <Building2 className="h-4 w-4 mr-2 text-[#72f68e]" />
                Role & Department
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                  placeholder="Role"
                />
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                  placeholder="Department"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <Shield className="h-4 w-4 mr-2 text-[#72f68e]" />
                Permissions
              </label>
              <select
                value={formData.permissions}
                onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
              >
                <option value="member">Member</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-200 mb-2">
                <BrainCircuit className="h-4 w-4 mr-2 text-[#72f68e]" />
                Assign EVEs™
              </label>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {['Atlas', 'Nova', 'Echo', 'Quantum', 'Aurora'].map((eve) => (
                    <label key={eve} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.assignedEves.includes(eve)}
                        onChange={(e) => {
                          const newEves = e.target.checked
                            ? [...formData.assignedEves, eve]
                            : formData.assignedEves.filter(e => e !== eve);
                          setFormData({ ...formData, assignedEves: newEves });
                        }}
                        className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
                      />
                      <span className="text-gray-300">{eve}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}