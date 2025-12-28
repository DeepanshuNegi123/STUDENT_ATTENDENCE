import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // get user from localStorage

  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }


  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

 
  return <Outlet />;
};

export default ProtectedRoute;
