// // pbranch/App.jsx
// import { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/layout/Sidebar";
// import Topbar from "./components/layout/Topbar";

// import DashboardHome from "./pages/DashboardHome";

// import StudentProfile from "./pages/StudentProfile";
// import AttendanceOverview from "./pages/AttendanceOverview";
// import SubjectWiseAttendance from "./pages/SubjectWiseAttendance";
// import AttendanceChartsPage from "./pages/AttendanceChartsPage";
// import RecentLogsPage from "./pages/RecentLogsPage";
// import NotificationsPage from "./pages/NotificationsPage";
// import LeaveRequestsPage from "./pages/LeaveRequestsPage";
// import SettingsPage from "./pages/SettingsPage";

// import "./index.css";

// const AppShell = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add("overflow-hidden", "lg:overflow-auto");
//     } else {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     };
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
//       <div className="flex-1 flex flex-col">
//         <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        
//         <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto">
//           {/* <Routes>
//             <Route path="/" element={<DashboardHome />} />
//             <Route path="/profile" element={<StudentProfile />} />
//             <Route path="/attendance-overview" element={<AttendanceOverview />} />
//             <Route path="/subject-wise" element={<SubjectWiseAttendance />} />
//             <Route path="/charts" element={<AttendanceChartsPage />} />
//             <Route path="/recent-logs" element={<RecentLogsPage />} />
//             <Route path="/notifications" element={<NotificationsPage />} />
//             <Route path="/leave-requests" element={<LeaveRequestsPage />} />
//             <Route path="/settings" element={<SettingsPage />} />
//           </Routes> */}
//          <DashboardHome/>
//         </main>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return <AppShell />;
// };

// export default App;


// pbranch/App.jsx - UPDATED TO ACCEPT CHILDREN
// import { useState, useEffect } from "react";
// import Sidebar from "./components/layout/Sidebar";
// import Topbar from "./components/layout/Topbar";
// import DashboardHome from "./pages/DashboardHome"; // fallback default

// const AppShell = ({ children = <DashboardHome /> }) => { // Accept children with fallback
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add("overflow-hidden", "lg:overflow-auto");
//     } else {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     };
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
//       <div className="flex-1 flex flex-col">
//         <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        
//         <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto">
//           {children} {/* Render the page content here */}
//         </main>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return <AppShell />; // No BrowserRouter
// };

// export default App;

// pbranch/App.jsx
// import { useState, useEffect } from "react";
// import Sidebar from "./components/layout/Sidebar";
// import Topbar from "./components/layout/Topbar";
// import DashboardHome from "./pages/DashboardHome";

// // This is the layout that will wrap each student dashboard page
// const PbranchLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add("overflow-hidden", "lg:overflow-auto");
//     } else {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     };
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col">
//         <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

//         <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto">
//           {/* Render whatever page component is passed in */}
//           {children || <DashboardHome />}
//         </main>
//       </div>
//     </div>
//   );
// };

// Default export used as layout wrapper
// const App = () => {
//   // If someone renders <PbranchDashboard /> directly, show home page
//   return <PbranchLayout />;
// };

// export default PbranchLayout; 
// <-- IMPORTANT: export the layout itself

// pbranch/App.jsx
// import { useState, useEffect } from "react";
// import Sidebar from "./components/layout/Sidebar";
// import Topbar from "./components/layout/Topbar";
// import DashboardHome from "./pages/DashboardHome";

// const PbranchLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.classList.add("overflow-hidden", "lg:overflow-auto");
//     } else {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
//     };
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col">
//         <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
//         <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto">
//           {children || <DashboardHome />} {/* ← this is where page content goes */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PbranchLayout;

// pbranch/App.jsx
import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import DashboardHome from "./pages/DashboardHome";

const PbranchLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // <-- start open

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden", "lg:overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
    }
    return () => {
      document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto">
          {children || <DashboardHome />}
        </main>
      </div>
    </div>
  );
};

export default PbranchLayout;



