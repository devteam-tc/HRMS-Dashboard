import React, { useState } from 'react';
import { Search, Bell, MessageCircle, User, Settings, LogOut, Sun, Moon, Menu } from 'lucide-react';

export function Header({ toggleSidebar, darkMode, onToggleDarkMode, onToggleMobileSidebar }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);

  const navbarStyles = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08), 0 -2px 4px rgba(255, 255, 255, 0.9)',
    background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
  };

  const buttonStyles = {
    boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.1), -3px -3px 6px rgba(255, 255, 255, 0.8)',
  };

  const inputStyles = {
    boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.9)',
    backgroundColor: '#f1f5f9',
  };

  return (
    <header 
      className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6"
      style={navbarStyles}
    >
      <div className="flex items-center">
        {/* Mobile menu button - only visible on mobile */}
        <button 
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-lg mr-2 transition-all duration-200 hover:bg-gray-100 lg:hidden"
          style={buttonStyles}
        >
          <Menu size={20} color="#333333" />
        </button>
        
        {/* Desktop menu button - only visible on desktop */}
        {/* <button 
          onClick={toggleSidebar}
          className="hidden lg:block p-2 rounded-lg mr-4 transition-all duration-200 hover:bg-gray-100"
          style={buttonStyles}
        >
          <Menu size={20} color="#333333" />
        </button> */}
        
        {/* Search Bar - hidden on mobile, visible on md and up */}
        <div className="relative hidden md:block">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            type="text"
            placeholder="Search employees, tasks..."
            className="w-48 lg:w-64 pl-10 pr-4 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            style={inputStyles}
          />
        </div>
        
        {/* Mobile search button - only visible on mobile */}
        <button 
          className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={buttonStyles}
        >
          <Search size={20} color="#333333" />
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={buttonStyles}
        >
          {darkMode ? (
            <Sun size={20} color="#333333" />
          ) : (
            <Moon size={20} color="#333333" />
          )}
        </button>

        {/* Notifications */}
        {/* <button 
          className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={buttonStyles}
        >
          <Bell size={20} color="#333333" />
          {notifications > 0 && (
            <span 
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              style={{
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              {notifications}
            </span>
          )}
        </button> */}

        {/* Messages */}
        {/* <button 
          className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={buttonStyles}
        >
          <MessageCircle size={20} color="#333333" />
          {messages > 0 && (
            <span 
              className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              style={{
                backgroundColor: '#05A7CC',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              {messages}
            </span>
          )}
        </button> */}

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
            style={buttonStyles}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#05A7CC',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.15), -1px -1px 2px rgba(255, 255, 255, 0.7)',
              }}
            >
              <User size={16} color="white" />
            </div>
            <span className="text-gray-700 hidden md:block">John Doe</span>
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 z-50"
              style={{
                boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15), -2px -2px 8px rgba(255, 255, 255, 0.9)',
              }}
            >
              <div className="py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">HR Manager</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
