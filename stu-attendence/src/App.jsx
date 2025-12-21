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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Intro Page */}
        <Route path="/" element={<Introslides />} />

        {/* Login + Signup */}
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

        {/* Navbar Test Route */}
        <Route path="/navbar" element={<Navbar />} />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorised />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;