import React, { useState } from "react";
import {
  Search,
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface NeumorphicTopNavbarProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

export const NeumorphicTopNavbar: React.FC<NeumorphicTopNavbarProps> = ({
  isDarkMode,
  onDarkModeToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="neu-navbar px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="neu-input p-3 flex items-center rounded-2xl">
              <Search className="text-[#666666] mr-3" size={20} />
              <input
                type="text"
                placeholder="Search employees, documents, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#333333] placeholder-[#999999]"
              />
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 ml-8">
          {/* Dark Mode Toggle */}
          <button
            onClick={onDarkModeToggle}
            className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#05A7CC] transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#05A7CC] transition-colors">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-5 h-5 neu-secondary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </button>
          </div>

          {/* Messages */}
          <div className="relative">
            <button className="neu-button p-3 rounded-2xl text-[#666666] hover:text-[#05A7CC] transition-colors">
              <MessageCircle size={20} />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#4CAF50] rounded-full flex items-center justify-center neu-small">
                <span className="text-white text-xs font-bold">7</span>
              </div>
            </button>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="neu-button p-3 rounded-2xl flex items-center space-x-3 text-[#333333] hover:text-[#05A7CC] transition-colors">
                <div className="neu-small rounded-full p-1">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-[#05A7CC] text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="hidden md:block text-left">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-[#666666]">HR Manager</p>
                </div>
                <ChevronDown size={16} className="text-[#666666]" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 neu-card border-none shadow-none mt-2"
            >
              <div className="px-3 py-2">
                <p className="font-medium text-[#333333]">John Doe</p>
                <p className="text-xs text-[#666666]">john.doe@company.com</p>
              </div>
              <DropdownMenuSeparator className="bg-[#d1d9e6]" />
              <DropdownMenuItem className="hover:bg-transparent hover:text-[#05A7CC] cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-transparent hover:text-[#05A7CC] cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#d1d9e6]" />
              <DropdownMenuItem className="text-[#EF5226] hover:bg-transparent hover:text-[#EF5226] cursor-pointer">
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
