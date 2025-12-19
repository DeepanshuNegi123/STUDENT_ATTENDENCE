import "./App.css";
import Introslides from "./components/common/introslider";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Auth/LoginPage";
// import SignupPage from "./pages/Auth/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Teacherdashboard from "./pages/teacherdashboard/teacherdashboard";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/teachercomponents/navbar";
import TeacherProfile from "./pages/teacherdashboard/teacherprofile";
import TimetableApp from "./pages/teacherdashboard/timetable";
import MarkAttendancePage from "./pages/teacherdashboard/markattendence";
import AttendanceDashboard from "./pages/teacherdashboard/attendencedashboard";
import ProtectedRoute from "./services/protectedroute";
import Unauthorised from "./services/unauthorised";
const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Intro Page */}
        <Route path="/" element={<Introslides />} />

        {/* Login + Signup */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}

        {/* Protected Dashboard */}
        {/* <Route
          path="/dashboard"

          element={
            <>
              <Sidebar>
                <Dashboard />
              </Sidebar>



            </>

          }
        /> */}

      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
      <Route path="/teacher" element={<Teacherdashboard />}>
      <Route index element={<AttendanceDashboard />} />
        <Route path="dashboard" element={<AttendanceDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="timetable" element={<TimetableApp />} />
         <Route path="markattendence" element={<MarkAttendancePage />} />
      </Route>
      </Route>
       
       
        <Route path="/navbar" element ={<Navbar />}></Route>
        <Route path="/unauthorized" element={<Unauthorised/>}></Route>
      


      </Routes>
    </BrowserRouter>
  );
};

export default App;
