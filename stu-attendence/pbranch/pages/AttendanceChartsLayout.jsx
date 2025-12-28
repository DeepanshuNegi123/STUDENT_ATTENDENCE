// pbranch/pages/AttendanceChartsLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";

const AttendanceChartsLayout = () => {
  const { pathname } = useLocation();

  const isActive = (segment) =>
    pathname === "/student-dashboard/charts" && segment === "subject-wise"
      ? true
      : pathname.endsWith(`/charts/${segment}`);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Charts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visual representation of attendance data
        </p>
      </div>

      {/* Three clickable cards */}
      <div className="space-y-4">
        <ChartCard
          title="Subject-wise Breakdown"
          description="Attendance percentage per subject"
          to="/student-dashboard/charts/subject-wise"
          active={isActive("subject-wise")}
        />
        <ChartCard
          title="Distribution View"
          description="Subject-wise attendance distribution"
          to="/student-dashboard/charts/distribution"
          active={isActive("distribution")}
        />
        <ChartCard
          title="Monthly Attendance Trend"
          description="Overall attendance trend over the semester"
          to="/student-dashboard/charts/trend"
          active={isActive("trend")}
        />
      </div>

      {/* Nested route content (actual charts) */}
      <Outlet />
    </div>
  );
};

const ChartCard = ({ title, description, to, active }) => (
  <Link
    to={to}
    className={`block bg-white rounded-2xl border shadow-sm p-5 transition-all duration-200
      ${
        active
          ? "border-indigo-300 shadow-md"
          : "border-gray-100 hover:border-indigo-200 hover:shadow-md"
      }`}
  >
    <h3 className="text-base font-bold text-gray-900">{title}</h3>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </Link>
);

export default AttendanceChartsLayout;

