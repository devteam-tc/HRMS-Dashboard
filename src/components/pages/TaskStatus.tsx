import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import {
  Plus,
  Calendar,
  User,
  MessageCircle,
  Paperclip,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  comments: number;
  attachments: number;
  project: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Design new dashboard layout',
    description: 'Create wireframes and mockups for the new HRMS dashboard',
    status: 'todo',
    priority: 'high',
    assignee: { name: 'Alice Johnson', avatar: '/placeholder-avatar.jpg' },
    dueDate: '2024-01-25',
    comments: 3,
    attachments: 2,
    project: 'HRMS Redesign'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up JWT-based authentication system',
    status: 'in-progress',
    priority: 'high',
    assignee: { name: 'Bob Smith', avatar: '/placeholder-avatar.jpg' },
    dueDate: '2024-01-22',
    comments: 5,
    attachments: 1,
    project: 'Security Updates'
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Carol Davis', avatar: '/placeholder-avatar.jpg' },
    dueDate: '2024-01-30',
    comments: 1,
    attachments: 0,
    project: 'Documentation'
  },
  {
    id: '4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'in-progress',
    priority: 'medium',
    assignee: { name: 'David Wilson', avatar: '/placeholder-avatar.jpg' },
    dueDate: '2024-01-28',
    comments: 2,
    attachments: 3,
    project: 'DevOps'
  },
  {
    id: '5',
    title: 'Update employee onboarding flow',
    description: 'Improve the new hire experience',
    status: 'done',
    priority: 'low',
    assignee: { name: 'Eve Brown', avatar: '/placeholder-avatar.jpg' },
    dueDate: '2024-01-20',
    comments: 4,
    attachments: 2,
    project: 'HR Process'
  },
  {
    id: '6',
    title: 'Database optimization',
    description: 'Optimize queries and improve performance',
    status: 'done',
    priority: 'high',
    assignee: { name: 'Frank Miller', avatar: '/placeholder-avatar.jpg' },
    dueDate: '2024-01-18',
    comments: 6,
    attachments: 1,
    project: 'Performance'
  }
];

const columns = [
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
  { id: 'done', title: 'Done', status: 'done' }
];

export const TaskStatus: React.FC = () => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getColumnColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'border-gray-300';
      case 'in-progress':
        return 'border-blue-300';
      case 'done':
        return 'border-green-300';
      default:
        return 'border-gray-300';
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    // In a real app, you would update the task status here
    console.log(`Dropped task ${draggedTask} to ${status}`);
    setDraggedTask(null);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Task Status (Kanban)</h1>
          <p className="text-gray-600 mt-1">Track and manage project tasks</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#05A7CC] hover:bg-[#048ba8] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-gray-500">All projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {getTasksByStatus('in-progress').length}
            </div>
            <p className="text-xs text-gray-500">Active tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {getTasksByStatus('done').length}
            </div>
            <p className="text-xs text-gray-500">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#05A7CC]">
              {Math.round((getTasksByStatus('done').length / tasks.length) * 100)}%
            </div>
            <p className="text-xs text-gray-500">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(column => (
          <Card key={column.id} className={`border-t-4 ${getColumnColor(column.status)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {column.title}
                  <Badge variant="outline" className="ml-2">
                    {getTasksByStatus(column.status).length}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent
              className="space-y-3 min-h-96"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              {getTasksByStatus(column.status).map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {task.project}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{task.assignee.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {(() => {
                            const days = getDaysUntilDue(task.dueDate);
                            if (days < 0) return `${Math.abs(days)}d overdue`;
                            if (days === 0) return 'Due today';
                            return `${days}d left`;
                          })()}
                        </span>
                      </div>
                      {task.comments > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center space-x-1">
                          <Paperclip className="w-3 h-3" />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {task.status === 'in-progress' && (
                    <Progress value={Math.random() * 100} className="h-1 mt-3" />
                  )}
                </div>
              ))}

              {getTasksByStatus(column.status).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No tasks in this column</p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};