import React from 'react';
import {
  Users,
  TrendingDown,
  DollarSign,
  Heart,
  UserPlus,
  UserCheck,
  Calendar as CalendarIcon
} from 'lucide-react';

// Import components
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import MetricsCard from '../components/dashboard/MetricsCard';
import AttritionChart from '../components/dashboard/charts/AttritionChart';
import PayrollChart from '../components/dashboard/charts/PayrollChart';
import EngagementChart from '../components/dashboard/charts/EngagementChart';
import Meetings from '../components/dashboard/Meetings';
import RecentActivities from '../components/dashboard/RecentActivities';
import QuickActions from '../components/dashboard/QuickActions';

// Data
const attritionData = [
  { month: 'Jan', rate: 12 },
  { month: 'Feb', rate: 15 },
  { month: 'Mar', rate: 8 },
  { month: 'Apr', rate: 10 },
  { month: 'May', rate: 7 },
  { month: 'Jun', rate: 9 }
];

const payrollData = [
  { month: 'Jan', amount: 450000 },
  { month: 'Feb', amount: 520000 },
  { month: 'Mar', amount: 480000 },
  { month: 'Apr', amount: 510000 },
  { month: 'May', amount: 490000 },
  { month: 'Jun', amount: 530000 }
];

const engagementData = [
  { name: 'Highly Engaged', value: 45, color: '#4CAF50' },
  { name: 'Engaged', value: 35, color: '#05A7CC' },
  { name: 'Neutral', value: 15, color: '#FFC107' },
  { name: 'Disengaged', value: 5, color: '#EF5226' }
];

const upcomingMeetings = [
  { title: 'Weekly Team Standup', time: '09:00 AM', participants: 8, type: 'Team' },
  { title: 'Performance Review', time: '11:30 AM', participants: 2, type: 'One-on-One' },
  { title: 'Quarterly Planning', time: '02:00 PM', participants: 15, type: 'Management' },
  { title: 'Training Session', time: '04:00 PM', participants: 12, type: 'Learning' }
];

const quickActions = [
  { title: 'Add Employee', icon: UserPlus, color: 'bg-gradient-to-r from-blue-500 to-cyan-400', description: 'Onboard new team member' },
  { title: 'Approve Leave', icon: UserCheck, color: 'bg-primary-600', description: 'Review pending requests' },
  { title: 'Run Payroll', icon: DollarSign, color: 'bg-secondary-600', description: 'Process monthly salary' },
  { title: 'Schedule Interview', icon: CalendarIcon, color: 'bg-gradient-to-r from-purple-500 to-pink-500', description: 'Book candidate meeting' }
];

const recentActivities = [
  { 
    user: 'Alice Johnson', 
    action: 'completed onboarding', 
    time: '2 hours ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'success'
  },
  { 
    user: 'Bob Smith', 
    action: 'submitted leave request', 
    time: '4 hours ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'info'
  },
  { 
    user: 'Carol Davis', 
    action: 'updated profile', 
    time: '6 hours ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'info'
  },
  { 
    user: 'System', 
    action: 'payroll processed', 
    time: '1 day ago',
    avatar: '/placeholder-avatar.jpg',
    type: 'success'
  }
];

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 bg-[#ECF0F3] min-h-screen">
      <WelcomeHeader />

      {/* Primary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricsCard 
          icon={Users}
          value="1,247"
          change="+12 this month"
          title="Total Employees"
          subtitle="Active: 1,195 | Inactive: 52"
          iconColor="text-[#05A7CC]"
        />
        
        <MetricsCard 
          icon={TrendingDown}
          value="8.2%"
          change="-2.1% vs last month"
          title="Attrition Rate"
          subtitle="Industry avg: 10.3%"
          iconColor="text-[#EF5226]"
          changeType="decrease"
        />
        
        <MetricsCard 
          icon={DollarSign}
          value="$532K"
          change="+4.2% vs last month"
          title="Monthly Payroll"
          subtitle="Annual: $6.1M projected"
          iconColor="text-[#4CAF50]"
        />
        
        <MetricsCard 
          icon={Heart}
          value="87%"
          change="+5% vs last quarter"
          title="Engagement Score"
          subtitle="Target: 85%"
          iconColor="text-[#9C27B0]"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AttritionChart data={attritionData} />
        <PayrollChart data={payrollData} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EngagementChart data={engagementData} />
        <Meetings meetings={upcomingMeetings} />
        <RecentActivities activities={recentActivities} />
      </div>

      <QuickActions actions={quickActions} />
    </div>
  );
};

export default Dashboard;
