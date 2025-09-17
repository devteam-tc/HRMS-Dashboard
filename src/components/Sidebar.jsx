import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { menuItems } from '../config/navigation';

export function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['dashboard']);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [sectionId] // Only keep the current section ID to ensure only one section is open
    );
  };

  // Navigation items are imported from config/navigation.js

  const sidebarStyles = {
    boxShadow: 'inset -8px 0 12px rgba(255, 255, 255, 0.3), inset 8px 0 12px rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(145deg, #f0f4f7, #e6eaf0)',
  };

  return (
    <div 
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{
        ...sidebarStyles,
        position: 'relative',
        top: 0,
        left: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <img 
              src="/src/assets/logo.webp" 
              alt="HRMS Logo" 
              className="h-12 w-auto"
            />

          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={{
            boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.1), -3px -3px 6px rgba(255, 255, 255, 0.7)',
          }}
        >
          <Menu size={20} color="#333333" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 overflow-y-hidden h-full">
        {menuItems.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => !collapsed && toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                  collapsed ? 'justify-center' : ''
                }`}
                style={{
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.08), -2px -2px 4px rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} color="#333333" />
                  {!collapsed && (
                    <span className="text-gray-700">{section.label}</span>
                  )}
                </div>
                {!collapsed && (
                  <span className="text-gray-500">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {!collapsed && isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block p-2 rounded-lg text-sm transition-all duration-200 hover:bg-gray-50 ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                          : 'text-gray-600'
                      }`}
                      style={{
                        boxShadow: location.pathname === item.path 
                          ? 'inset 2px 2px 4px rgba(5, 167, 204, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                          : '1px 1px 2px rgba(0, 0, 0, 0.05), -1px -1px 2px rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
