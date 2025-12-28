// pbranch/components/layout/Topbar.jsx
import { Menu, Bell, Search, UserCircle2 } from "lucide-react";
import { studentInfo } from "../../data/attendanceData";

const Topbar = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Welcome, {studentInfo.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Track your attendance and stay updated
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button className="hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button className="relative inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
            <UserCircle2 className="text-gray-500" size={22} />
            <div className="text-xs leading-tight">
              <p className="font-semibold text-gray-800">{studentInfo.name}</p>
              <p className="text-gray-500">{studentInfo.rollNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
