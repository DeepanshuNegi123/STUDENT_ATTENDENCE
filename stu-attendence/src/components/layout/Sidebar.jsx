
import { useState } from 'react';
import { FaPenFancy } from "react-icons/fa";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart
} from 'lucide-react';



const Sidebar = ({children}) => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State for active menu item
  const [activeItem, setActiveItem] = useState('dashboard');
  
  // State for expandable menu sections (if you want submenus)
  const [expandedSections, setExpandedSections] = useState({});

  // ========================================
  // MENU ITEMS CONFIGURATION
  // Add, remove, or modify items here
  // ========================================
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      link: '/dashboard',
      // submenu: [] // Uncomment to add submenu items
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Calendar,
      link: '/attendance',
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      link: '/students',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart,
      link: '/reports',
      // Example submenu structure:
      // submenu: [
      //   { id: 'monthly', label: 'Monthly Reports', link: '/reports/monthly' },
      //   { id: 'yearly', label: 'Yearly Reports', link: '/reports/yearly' },
      // ]
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      link: '/documents',
    },
  ];

  // Bottom menu items (Settings, Logout, etc.)
  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      link: '/settings',
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      link: '/logout',
      danger: true, // Special styling for logout
    },
  ];

  // ========================================
  // HANDLERS
  // ========================================
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle menu item click
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Close mobile menu after selection
    setIsMobileMenuOpen(false);
    
    // Add your navigation logic here
    // Example: navigate(item.link);
  };

  // Toggle expandable sections (for submenus)
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // ========================================
  // RENDER MENU ITEM
  // ========================================

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedSections[item.id];

    return (



      

      <div key={item.id} className="mb-1">
        {/* Main Menu Item */}
        <button
          onClick={() => {
            if (hasSubmenu) {
              toggleSection(item.id);
            } else {
              handleItemClick(item.id);
            }
          }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-black text-white shadow-sm'
              : item.danger
              ? 'text-red-600 hover:bg-red-50'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon size={20} />
            <span className="font-medium">{item.label}</span>
          </div>
          

          {/* Dropdown indicator for submenus */}

          {hasSubmenu && (
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </button>


        {/* Submenu Items */}
        {hasSubmenu && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.submenu.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => handleItemClick(subItem.id)}
                className={`w-full flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeItem === subItem.id
                    ? 'bg-gray-200 text-black font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ========================================
          MOBILE MENU BUTTON (Hamburger)
          ======================================== */}
      <button
        onClick={toggleMobileMenu}
        className="fixed  top-2 left-[15rem] z-50 p-2 bg-gray-50 rounded-lg shadow-lg hover:bg-gray-50 transition-all"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ========================================
          MOBILE OVERLAY
          ======================================== */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className=" "
        />
      )}

      {/* ========================================
          SIDEBAR CONTAINER
          ======================================== */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 
          transition-transform duration-300 ease-in-out z-40
          w-64 flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          
        `}
      >
        {/* ========================================
            LOGO/BRAND SECTION
            Modify this section for your branding
            ======================================== */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <FaPenFancy className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Mark It</h1>
              <p className="text-xs text-gray-500">Attendance System</p>
            </div>
          </div>
        </div>

        {/* ========================================
            MAIN MENU ITEMS
            ======================================== */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map(renderMenuItem)}
          </div>
        </nav>

        {/* ========================================
            BOTTOM MENU ITEMS (Settings, Logout)
            ======================================== */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-1">
            {bottomMenuItems.map(renderMenuItem)}
          </div>
        </div>

   
      </aside>

      {/* ========================================
          SPACER FOR DESKTOP
          Prevents content from going under sidebar
          ======================================== */}

   {/* SIDEBAR + CONTENT LAYOUT */}

<div className="flex">
  
  {/* SIDEBAR is already above — we keep it */}

  {/* SPACER */}

  {/* <div className="hidden lg:block w-64" /> */}
  {isMobileMenuOpen && <div className="w-64" />}

  {/* MAIN PAGE CONTENT (Dashboard will come here) */}

  

  <main className="flex-1 p-4">
    {children}
  </main>

</div>

    </>
  );
};

export default Sidebar;