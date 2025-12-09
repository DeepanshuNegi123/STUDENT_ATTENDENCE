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
        <Route
          path="/dashboard"

          element={
        <>
              <Sidebar>
                <Dashboard />
              </Sidebar>

             

              </>
            
          }
        />

       <Route path="/teacher" element={<Teacherdashboard />}>
        {/* Child routes (they appear inside <Outlet>) */}
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

        <Route path="/navbar" element
        = {<Navbar/>}></Route>

    
      </Routes>
    </BrowserRouter>
  );
};

export default App;
