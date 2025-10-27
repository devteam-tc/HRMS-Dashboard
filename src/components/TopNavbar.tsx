import React, { useState } from 'react';
import {
  Search,
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface TopNavbarProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

export const TopNavbar = ({ isDarkMode, onDarkModeToggle }: TopNavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees, documents, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A7CC] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              <Badge className="absolute -top-1 -right-1 bg-[#EF5226] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                3
              </Badge>
            </button>
          </div>

          {/* Messages */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageCircle size={20} />
              <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                7
              </Badge>
            </button>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-[#05A7CC] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">HR Manager</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@company.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};