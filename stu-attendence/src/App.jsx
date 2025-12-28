// import "./App.css";
// import Introslides from "./components/common/introslider";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import LoginPage from "./pages/Auth/LoginPage";
// // import SignupPage from "./pages/Auth/SignupPage";
// import {BrowserRouter,Routes, Route } from "react-router-dom";
// import Sidebar from "./components/layout/Sidebar";
// import Teacherdashboard from "./pages/teacherdashboard/teacherdashboard";
// // import ProtectedRoute from "./components/auth/ProtectedRoute";
// import Navbar from "./components/teachercomponents/navbar";
// import PbranchDashboard from "../pbranch/App.jsx";


// import PbranchAppShell from "../pbranch/App.jsx"; // Main layout (renamed for clarity)
// import DashboardHome from "../pbranch/pages/DashboardHome";
// import StudentProfile from "../pbranch/pages/StudentProfile";
// import AttendanceOverview from "../pbranch/pages/AttendanceOverview";
// import SubjectWiseAttendance from "../pbranch/pages/SubjectWiseAttendance";
// import AttendanceChartsPage from "../pbranch/pages/AttendanceChartsPage";
// import RecentLogsPage from "../pbranch/pages/RecentLogsPage";
// import NotificationsPage from "../pbranch/pages/NotificationsPage";
// import LeaveRequestsPage from "../pbranch/pages/LeaveRequestsPage";
// import SettingsPage from "../pbranch/pages/SettingsPage";


// const StudentDashboardLayout = ({ children }) => {
//   return <PbranchAppShell>{children}</PbranchAppShell>;
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Intro Page */}
//         <Route path="/" element={<Introslides />} />

//         {/* Login + Signup */}
//         <Route path="/login" element={<LoginPage />} />
//         {/* <Route path="/signup" element={<SignupPage />} /> */}

//         {/* Protected Dashboard */}
//         <Route
//           path="/dashboard"

//           element={
//         <>
//               <Sidebar>
//                 <Dashboard />
//               </Sidebar>

             

//               </>
            
//           }
//         />

//        <Route path="/teacher" element={<Teacherdashboard />}>
//         {/* Child routes (they appear inside <Outlet>) */}
//         <Route path="dashboard" element={<Dashboard />} />
//       </Route>
// // src/App.jsx - MAKE SURE THESE ROUTES MATCH SIDEBAR PATHS
// <Route path="/student-dashboard" element={<StudentDashboardLayout><DashboardHome /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/profile" element={<StudentDashboardLayout><StudentProfile /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/attendance-overview" element={<StudentDashboardLayout><AttendanceOverview /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/subject-wise" element={<StudentDashboardLayout><SubjectWiseAttendance /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/charts" element={<StudentDashboardLayout><AttendanceChartsPage /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/recent-logs" element={<StudentDashboardLayout><RecentLogsPage /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/notifications" element={<StudentDashboardLayout><NotificationsPage /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/leave-requests" element={<StudentDashboardLayout><LeaveRequestsPage /></StudentDashboardLayout>} />
// <Route path="/student-dashboard/settings" element={<StudentDashboardLayout><SettingsPage /></StudentDashboardLayout>} />


//         <Route path="/navbar" element
//         = {<Navbar/>}></Route>

    
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// src/App.jsx
// import "./App.css";
// import Introslides from "./components/common/introslider";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import LoginPage from "./pages/Auth/LoginPage";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/layout/Sidebar";
// import Teacherdashboard from "./pages/teacherdashboard/teacherdashboard";
// import Navbar from "./components/teachercomponents/navbar";

// // IMPORT THE LAYOUT (default export from pbranch/App.jsx)
// import PbranchLayout from "../pbranch/App.jsx";

// // Import individual student dashboard pages
// import DashboardHome from "../pbranch/pages/DashboardHome";
// import StudentProfile from "../pbranch/pages/StudentProfile";
// import AttendanceOverview from "../pbranch/pages/AttendanceOverview";
// import SubjectWiseAttendance from "../pbranch/pages/SubjectWiseAttendance";
// import AttendanceChartsPage from "../pbranch/pages/AttendanceChartsPage";
// import RecentLogsPage from "../pbranch/pages/RecentLogsPage";
// import NotificationsPage from "../pbranch/pages/NotificationsPage";
// import LeaveRequestsPage from "../pbranch/pages/LeaveRequestsPage";
// import SettingsPage from "../pbranch/pages/SettingsPage";


// import AttendanceChartsLayout from "../pbranch/pages/AttendanceChartsLayout";
// import SubjectChartsPage from "../pbranch/pages/SubjectChartsPage";
// import DistributionChartsPage from "../pbranch/pages/DistributionChartsPage";
// import TrendChartsPage from "../pbranch/pages/TrendChartsPage";



// // Layout wrapper for student dashboard pages
// const StudentDashboardLayout = ({ children }) => (
//   <PbranchLayout>{children}</PbranchLayout>
// );

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Intro */}
//         <Route path="/" element={<Introslides />} />

//         {/* Auth */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Existing app dashboards */}
//         <Route
//           path="/dashboard"
//           element={
//             <Sidebar>
//               <Dashboard />
//             </Sidebar>
//           }
//         />

//         <Route path="/teacher" element={<Teacherdashboard />}>
//           <Route path="dashboard" element={<Dashboard />} />
//         </Route>

//         {/* STUDENT DASHBOARD ROUTES (all use same layout) */}
//         <Route
//           path="/student-dashboard"
//           element={
//             // <StudentDashboardLayout>
//               <PbranchLayout>
//           <DashboardHome />
//         </PbranchLayout>
//             // </StudentDashboardLayout>
//           }
//         />

//         <Route
//           path="/student-dashboard/profile"
//           element={
//             <StudentDashboardLayout>
//               <StudentProfile />
//             </StudentDashboardLayout>
//           }
//         />
//         <Route
//           path="/student-dashboard/attendance-overview"
//           element={
//             <StudentDashboardLayout>
//               <AttendanceOverview />
//             </StudentDashboardLayout>
//           }
//         />
//         <Route
//           path="/student-dashboard/subject-wise"
//           element={
//             <StudentDashboardLayout>
//               <SubjectWiseAttendance />
//             </StudentDashboardLayout>
//           }
//         />

//         <Route
//           path="/student-dashboard/charts"
//           element={
//        <PbranchLayout>
//           <AttendanceChartsLayout />   {/* contains Outlet */}
//         </PbranchLayout>
//           }
//         />
 
//   {/* default: list of 3 cards */}
//       <Route index element={<SubjectChartsPage />} />


//       {/* specific views */}
//       <Route path="subject-wise" element={<SubjectChartsPage />} />
//       <Route path="distribution" element={<DistributionChartsPage />} />
//       <Route path="trend" element={<TrendChartsPage />} />

//         <Route
//     path="/student-dashboard/charts/subject-wise"
//      element={
//     <StudentDashboardLayout>
//       <SubjectChartsPage />
//     </StudentDashboardLayout>
//   }
//   />

//   <Route
//   path="/student-dashboard/charts/distribution"
//   element={
//     <StudentDashboardLayout>
//       <DistributionChartsPage />
//     </StudentDashboardLayout>
//   }
// />

// <Route
//   path="/student-dashboard/charts/trend"
//   element={
//     <StudentDashboardLayout>
//       <TrendChartsPage />
//     </StudentDashboardLayout>
//   }
// />


//         <Route
//           path="/student-dashboard/recent-logs"
//           element={
//             <StudentDashboardLayout>
//               <RecentLogsPage />
//             </StudentDashboardLayout>
//           }
//         />
//         <Route
//           path="/student-dashboard/notifications"
//           element={
//             <StudentDashboardLayout>
//               <NotificationsPage />
//             </StudentDashboardLayout>
//           }
//         />
//         <Route
//           path="/student-dashboard/leave-requests"
//           element={
//             <StudentDashboardLayout>
//               <LeaveRequestsPage />
//             </StudentDashboardLayout>
//           }
//         />
//         <Route
//           path="/student-dashboard/settings"
//           element={
//             <StudentDashboardLayout>
//               <SettingsPage />
//             </StudentDashboardLayout>
//           }
//         />

//         {/* Misc */}
//         <Route path="/navbar" element={<Navbar />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


// src/App.jsx
import "./App.css";
import Introslides from "./components/common/introslider";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Auth/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Teacherdashboard from "./pages/teacherdashboard/teacherdashboard";
import Navbar from "./components/teachercomponents/navbar";
import TeacherProfile from "./pages/teacherdashboard/teacherprofile";
import TimetableApp from "./pages/teacherdashboard/timetable";
import MarkAttendancePage from "./pages/teacherdashboard/markattendence";
import AttendanceDashboard from "./pages/teacherdashboard/attendencedashboard";
import ProtectedRoute from "./services/protectedroute";
import Unauthorised from "./services/unauthorised";

// Import Admin Components
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTeachers from "./pages/admin/ManageTeachers";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageClasses from "./pages/admin/ManageClasses";
import ManageSubjects from "./pages/admin/ManageSubjects";
import ManageOfferings from "./pages/admin/ManageOfferings";
import ManageEnrollments from "./pages/admin/ManageEnrollments";

// Import Student Components
import StudentDashboardLayout from "./components/students/studentdashboardlayout";
import StudentDashboard from "./components/students/studentdashboard";
import StudentCourses from "./pages/studentdashboard/studentcourses";
import StudentAttendance from "./pages/studentdashboard/studentattendance";
import StudentGrades from "./pages/studentdashboard/studentgrades";
import StudentSchedule from "./pages/studentdashboard/studentschedule";
import StudentProfile from "./pages/studentdashboard/studentprofile";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Intro Page */}
        <Route path="/" element={<Introslides />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Teacher Routes */}
        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="/teacher" element={<Teacherdashboard />}>
            <Route index element={<AttendanceDashboard />} />
            <Route path="dashboard" element={<AttendanceDashboard />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="timetable" element={<TimetableApp />} />
            <Route path="markattendence" element={<MarkAttendancePage />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<ManageTeachers />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="classes" element={<ManageClasses />} />
            <Route path="subjects" element={<ManageSubjects />} />
            <Route path="offerings" element={<ManageOfferings />} />
            <Route path="enrollments" element={<ManageEnrollments />} />
          </Route>
        </Route>



        {/* Protected Student Routes */}
     <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentDashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>
          </Route>
        

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorised />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App
