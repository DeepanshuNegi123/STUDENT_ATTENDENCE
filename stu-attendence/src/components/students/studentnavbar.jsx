
import React, { useState, useCallback } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Search, User, Menu, LogOut } from 'lucide-react';
import StudentSidebar from './studentsidebar';
import { useNavigate } from 'react-router-dom';






const StudentNavbar = ({ toggle }) => {
  const navigate = useNavigate();

  const handlelogout = ()=>{

localStorage.removeItem('token');
sessionStorage.removeItem('token');
navigate('/login');

}

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 transition-all duration-300">
      {/* NAVBAR */}
      <nav className="flex p-5 gap-4 justify-between items-center bg-white shadow relative z-20">
        {/* LEFT - MENU BUTTON */}
        <button onClick={toggle} className="p-2 hover:bg-gray-100 rounded transition">
          <Menu size={24} />
        </button>

        {/* CENTER - WELCOME TEXT */}
        <div className="flex-1 text-center hidden sm:block">
          <h2 className="text-lg font-semibold text-gray-800">Welcome to Your Portal</h2>
        </div>

        {/* RIGHT - USER ACTIONS */}
        <div className="flex items-center gap-4">
          <Link to='/student/profile' className="p-2 hover:bg-gray-100 rounded transition">
            <User size={24} />
          </Link>
          <button className="p-2 hover:bg-red-50 rounded transition text-red-600" onClick={handlelogout}>
            <LogOut size={24} />
          </button>
        </div>
      </nav>

      {/* FLOATING SEARCH BAR */}
      <div
        className="fixed top-4 z-30 px-4 pointer-events-none
        sm:right-4 sm:left-auto
        md:left-1/2 md:right-auto md:-translate-x-1/2
      "
      >
        <div
          className="flex items-center gap-2 w-[90vw] sm:w-[60vw] md:w-[45vw]
            py-2 px-4 pointer-events-auto 
            rounded-full shadow-md bg-white border border-gray-200
          "
        >
          <input
            type="text"
            placeholder="Search courses, grades, schedule..."
            className="bg-transparent text-gray-700 placeholder-gray-400 w-full p-2 outline-none"
          />
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <Search className="text-gray-600" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar