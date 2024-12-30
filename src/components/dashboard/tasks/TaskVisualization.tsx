import React, { useState, useEffect } from 'react';
import { useTaskQueue } from '../../../hooks/useTaskQueue';
import { Task, TaskStatus } from '../../../types/task';
import { Clock, CheckCircle, AlertTriangle, ArrowRight, Brain, Calendar, Target } from 'lucide-react';
import { format } from 'date-fns';

interface TaskVisualizationProps {
  eveId: string;
  className?: string;
}

export default function TaskVisualization({ eveId, className = '' }: TaskVisualizationProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { getTaskQueue, loading, error } = useTaskQueue(eveId);

  useEffect(() => {
    const fetchTasks = async () => {
      const queue = await getTaskQueue();
      setTasks(queue);
    };
    fetchTasks();
    // Poll for updates
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, [getTaskQueue]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-[#72f68e]" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (task: Task) => {
    switch (task.priority) {
      case 'urgent':
        return 'bg-red-500/10 text-red-500';
      case 'high':
        return 'bg-orange-500/10 text-orange-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#72f68e]/20 border-t-[#72f68e] animate-spin"></div>
          <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-[#72f68e]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Task Timeline */}
      <div className="bg-white/5 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Task Timeline</h3>
        <div className="relative">
          {tasks.map((task, index) => (
            <div key={task.id} className="mb-4 last:mb-0">
              <div className="flex items-start">
                {/* Status Line */}
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-white/10" />
                
                {/* Task Status */}
                <div className="relative z-10 mr-4">
                  {getStatusIcon(task.status)}
                </div>

                {/* Task Details */}
                <div className="flex-1 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-400">{task.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {task.scheduledFor ? (
                        format(task.scheduledFor, 'PPp')
                      ) : (
                        'Not scheduled'
                      )}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Target className="h-4 w-4 mr-2" />
                      {task.deadline ? (
                        format(task.deadline, 'PPp')
                      ) : (
                        'No deadline'
                      )}
                    </div>
                  </div>

                  {/* Dependencies */}
                  {task.dependencies && task.dependencies.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-400 mb-2">Dependencies:</div>
                      <div className="flex flex-wrap gap-2">
                        {task.dependencies.map((depId) => {
                          const depTask = tasks.find(t => t.id === depId);
                          return (
                            <div
                              key={depId}
                              className="flex items-center text-xs bg-white/5 rounded-full px-3 py-1"
                            >
                              {getStatusIcon(depTask?.status || 'pending')}
                              <span className="ml-2 text-gray-300">
                                {depTask?.title || 'Unknown Task'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  {task.metadata && (
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      {task.metadata.category && (
                        <div className="text-gray-400">
                          Category: <span className="text-white">{task.metadata.category}</span>
                        </div>
                      )}
                      {task.metadata.estimatedDuration && (
                        <div className="text-gray-400">
                          Est. Duration: <span className="text-white">{task.metadata.estimatedDuration}m</span>
                        </div>
                      )}
                      {task.metadata.tags && task.metadata.tags.length > 0 && (
                        <div className="col-span-2">
                          <div className="flex flex-wrap gap-2 mt-2">
                            {task.metadata.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="bg-[#72f68e]/10 text-[#72f68e] rounded-full px-2 py-0.5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">
              {tasks.filter(t => t.status === 'pending').length}
            </span>
          </div>
          <div className="text-sm text-gray-400">Pending Tasks</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <ArrowRight className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-500">
              {tasks.filter(t => t.status === 'in_progress').length}
            </span>
          </div>
          <div className="text-sm text-gray-400">In Progress</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
          </div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-red-500">
              {tasks.filter(t => t.status === 'failed').length}
            </span>
          </div>
          <div className="text-sm text-gray-400">Failed</div>
        </div>
      </div>
    </div>
  );
}