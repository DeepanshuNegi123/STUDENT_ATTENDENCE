import React, { useState, useCallback } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, User, Menu, LogOut } from 'lucide-react';


const StudentSidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-xl border-r 
      transition-all duration-300 overflow-hidden 
      ${isOpen ? "w-64" : "w-0"}`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex justify-center items-center">
            <span className="text-white font-bold">📚</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Mark It</h1>
            <p className="text-xs text-gray-500">Student Portal</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="p-4 space-y-2">
        <Link to="/student/dashboard" className="p-3 block hover:bg-blue-50 rounded transition text-gray-700 hover:text-blue-600 font-medium">
          📊 Dashboard
        </Link>
        <Link to="/student/courses" className="p-3 block hover:bg-blue-50 rounded transition text-gray-700 hover:text-blue-600 font-medium">
          📖 My Courses
        </Link>
        <Link to="/student/attendance" className="p-3 block hover:bg-blue-50 rounded transition text-gray-700 hover:text-blue-600 font-medium">
          ✓ Attendance
        </Link>
        <Link to="/student/grades" className="p-3 block hover:bg-blue-50 rounded transition text-gray-700 hover:text-blue-600 font-medium">
          📈 Grades
        </Link>
        <Link to="/student/schedule" className="p-3 block hover:bg-blue-50 rounded transition text-gray-700 hover:text-blue-600 font-medium">
          🕐 Schedule
        </Link>
        <Link to="/student/profile" className="p-3 block hover:bg-blue-50 rounded transition text-gray-700 hover:text-blue-600 font-medium">
          👤 Profile
        </Link>
      </div>
    </div>
  );
};

export default StudentSidebar