


import React, { useState, useCallback } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, User, Menu, LogOut } from 'lucide-react';
import StudentSidebar from './studentsidebar';
import StudentNavbar from './studentnavbar';

const StudentDashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar: Fixed position, toggles visibility */}
      <StudentSidebar isOpen={isSidebarOpen} />

      {/* Content Area: Adjusts margin based on sidebar state */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Top Navbar */}
        <StudentNavbar toggle={toggleSidebar} />

        {/* Main Content: Renders child routes and is scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;