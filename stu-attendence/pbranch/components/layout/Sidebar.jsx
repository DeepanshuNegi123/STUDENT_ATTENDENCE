// pbranch/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  BookOpen,
  BarChart3,
  Clock,
  Bell,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { to: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/student-dashboard/profile", label: "Student Profile", icon: User },
  { to: "/student-dashboard/attendance-overview", label: "Attendance Overview", icon: CalendarCheck },
  { to: "/student-dashboard/subject-wise", label: "Subject-wise Attendance", icon: BookOpen },
  { to: "/student-dashboard/charts", label: "Attendance Charts", icon: BarChart3 },
  { to: "/student-dashboard/recent-logs", label: "Recent Attendance Logs", icon: Clock },
  { to: "/student-dashboard/notifications", label: "Notifications / Alerts", icon: Bell },
  { to: "/student-dashboard/leave-requests", label: "Leave Requests", icon: FileText },
  { to: "/student-dashboard/feedback", label: "Feedback", icon: MessageCircle },
  { to: "/student-dashboard/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 shadow-xl
        flex flex-col transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
            <GraduationCap size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Student Attendance</p>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-3">
          <ul className="space-y-1.5">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  onClick={onClose}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={`shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? "text-indigo-600" : "text-gray-400"
                        }`}
                      />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-100 p-3">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 group"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <LogOut
              size={19}
              className="shrink-0 group-hover:scale-110 transition-transform"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
