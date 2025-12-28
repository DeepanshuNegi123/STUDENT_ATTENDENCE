
// import { useState } from 'react';
// import { FaPenFancy } from "react-icons/fa";
// import { 
//   Home, 
//   Users, 
//   Calendar, 
//   FileText, 
//   Settings, 
//   LogOut,
//   Menu,
//   X,
//   ChevronDown,
//   BarChart
// } from 'lucide-react';



// const Sidebar = ({children}) => {
//   // State for mobile menu toggle
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
//   // State for active menu item
//   const [activeItem, setActiveItem] = useState('dashboard');
  
//   // State for expandable menu sections (if you want submenus)
//   const [expandedSections, setExpandedSections] = useState({});

//   // ========================================
//   // MENU ITEMS CONFIGURATION
//   // Add, remove, or modify items here
//   // ========================================
//   const menuItems = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: Home,
//       link: '/dashboard',
//       // submenu: [] // Uncomment to add submenu items
//     },
//     {
//       id: 'attendance',
//       label: 'Attendance',
//       icon: Calendar,
//       link: '/attendance',
//     },
//     {
//       id: 'students',
//       label: 'Students',
//       icon: Users,
//       link: '/students',
//     },
//     {
//       id: 'reports',
//       label: 'Reports',
//       icon: BarChart,
//       link: '/reports',
//       // Example submenu structure:
//       // submenu: [
//       //   { id: 'monthly', label: 'Monthly Reports', link: '/reports/monthly' },
//       //   { id: 'yearly', label: 'Yearly Reports', link: '/reports/yearly' },
//       // ]
//     },
//     {
//       id: 'documents',
//       label: 'Documents',
//       icon: FileText,
//       link: '/documents',
//     },
//   ];

//   // Bottom menu items (Settings, Logout, etc.)
//   const bottomMenuItems = [
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: Settings,
//       link: '/settings',
//     },
//     {
//       id: 'logout',
//       label: 'Logout',
//       icon: LogOut,
//       link: '/logout',
//       danger: true, // Special styling for logout
//     },
//   ];

//   // ========================================
//   // HANDLERS
//   // ========================================
  
//   // Toggle mobile menu
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   // Handle menu item click
//   const handleItemClick = (itemId) => {
//     setActiveItem(itemId);
//     // Close mobile menu after selection
//     setIsMobileMenuOpen(false);
    
//     // Add your navigation logic here
//     // Example: navigate(item.link);
//   };

//   // Toggle expandable sections (for submenus)
//   const toggleSection = (sectionId) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [sectionId]: !prev[sectionId]
//     }));
//   };

//   // ========================================
//   // RENDER MENU ITEM
//   // ========================================

//   const renderMenuItem = (item) => {
//     const Icon = item.icon;
//     const isActive = activeItem === item.id;
//     const hasSubmenu = item.submenu && item.submenu.length > 0;
//     const isExpanded = expandedSections[item.id];

//     return (



      

//       <div key={item.id} className="mb-1">
//         {/* Main Menu Item */}
//         <button
//           onClick={() => {
//             if (hasSubmenu) {
//               toggleSection(item.id);
//             } else {
//               handleItemClick(item.id);
//             }
//           }}
//           className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
//             isActive
//               ? 'bg-black text-white shadow-sm'
//               : item.danger
//               ? 'text-red-600 hover:bg-red-50'
//               : 'text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Icon size={20} />
//             <span className="font-medium">{item.label}</span>
//           </div>
          

//           {/* Dropdown indicator for submenus */}

//           {hasSubmenu && (
//             <ChevronDown
//               size={16}
//               className={`transition-transform duration-200 ${
//                 isExpanded ? 'rotate-180' : ''
//               }`}
//             />
//           )}
//         </button>


//         {/* Submenu Items */}
//         {hasSubmenu && isExpanded && (
//           <div className="ml-4 mt-1 space-y-1">
//             {item.submenu.map((subItem) => (
//               <button
//                 key={subItem.id}
//                 onClick={() => handleItemClick(subItem.id)}
//                 className={`w-full flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
//                   activeItem === subItem.id
//                     ? 'bg-gray-200 text-black font-medium'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {subItem.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* ========================================
//           MOBILE MENU BUTTON (Hamburger)
//           ======================================== */}
//       <button
//         onClick={toggleMobileMenu}
//         className="fixed  top-2 left-[15rem] z-50 p-2 bg-gray-50 rounded-lg shadow-lg hover:bg-gray-50 transition-all"
//       >
//         {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* ========================================
//           MOBILE OVERLAY
//           ======================================== */}
//       {isMobileMenuOpen && (
//         <div
//           onClick={toggleMobileMenu}
//           className=" "
//         />
//       )}

//       {/* ========================================
//           SIDEBAR CONTAINER
//           ======================================== */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full bg-white border-r border-gray-200 
//           transition-transform duration-300 ease-in-out z-40
//           w-64 flex flex-col
//           ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          
//         `}
//       >
//         {/* ========================================
//             LOGO/BRAND SECTION
//             Modify this section for your branding
//             ======================================== */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
//               <FaPenFancy className="text-white" size={20} />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">Mark It</h1>
//               <p className="text-xs text-gray-500">Attendance System</p>
//             </div>
//           </div>
//         </div>

//         {/* ========================================
//             MAIN MENU ITEMS
//             ======================================== */}
//         <nav className="flex-1 overflow-y-auto p-4">
//           <div className="space-y-1">
//             {menuItems.map(renderMenuItem)}
//           </div>
//         </nav>

//         {/* ========================================
//             BOTTOM MENU ITEMS (Settings, Logout)
//             ======================================== */}
//         <div className="p-4 border-t border-gray-200">
//           <div className="space-y-1">
//             {bottomMenuItems.map(renderMenuItem)}
//           </div>
//         </div>

   
//       </aside>

//       {/* ========================================
//           SPACER FOR DESKTOP
//           Prevents content from going under sidebar
//           ======================================== */}

//    {/* SIDEBAR + CONTENT LAYOUT */}

// <div className="flex">
  
//   {/* SIDEBAR is already above — we keep it */}

//   {/* SPACER */}

//   {/* <div className="hidden lg:block w-64" /> */}
//   {isMobileMenuOpen && <div className="w-64" />}

//   {/* MAIN PAGE CONTENT (Dashboard will come here) */}

  

//   <main className="flex-1 p-4">
//     {children}
//   </main>

// </div>

//     </>
//   );
// };

// export default Sidebar;

// pbranch/components/layout/Sidebar.jsx - FIXED NAVIGATION PATHS
import { NavLink } from "react-router-dom";
import { MessageCircle } from "lucide-react";
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
  { to: "/student-dashboard/settings", label: "Settings", icon: Settings },
  { to: "/student-dashboard/feedback", label: "Feedback", icon: MessageCircle },
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

        {/* Navigation - FIXED PATHS */}
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
              // Handle logout
              window.location.href = "/login";
            }}
          >
            <LogOut size={19} className="shrink-0 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
