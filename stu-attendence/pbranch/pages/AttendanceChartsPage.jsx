// // pbranch/pages/AttendanceChartsPage.jsx
// import AttendanceCharts from "../components/dashboard/AttendanceCharts";

// const AttendanceChartsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Attendance Charts</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Visual representation of attendance data
//         </p>
//       </div>

//       <AttendanceCharts />
//     </div>
//   );
// };

// export default AttendanceChartsPage;

// // pbranch/pages/AttendanceChartsPage.jsx
// import AttendanceCharts from "../components/dashboard/AttendanceCharts";

// const AttendanceChartsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Attendance Charts</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Visual representation of attendance data
//         </p>
//       </div>

//       <AttendanceCharts />   {/* <-- this shows the bar / pie / line charts */}
//     </div>
//   );
// };

// export default AttendanceChartsPage;

// // pbranch/pages/AttendanceChartsPage.jsx
// import { Link } from "react-router-dom";

// const AttendanceChartsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Attendance Charts</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Visual representation of attendance data
//         </p>
//       </div>

//       {/* Subject-wise Breakdown */}
//       <Link
//         to="/student-dashboard/charts/subject-wise"
//         className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
//       >
//         <h3 className="text-base font-bold text-gray-900">Subject-wise Breakdown</h3>
//         <p className="text-xs text-gray-500 mt-1">
//           Attendance percentage per subject
//         </p>
//       </Link>

//       {/* Distribution View */}
//       <Link
//         to="/student-dashboard/charts/distribution"
//         className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
//       >
//         <h3 className="text-base font-bold text-gray-900">Distribution View</h3>
//         <p className="text-xs text-gray-500 mt-1">
//           Subject-wise attendance distribution
//         </p>
//       </Link>

//       {/* Monthly Attendance Trend */}
//       <Link
//         to="/student-dashboard/charts/trend"
//         className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
//       >
//         <h3 className="text-base font-bold text-gray-900">
//           Monthly Attendance Trend
//         </h3>
//         <p className="text-xs text-gray-500 mt-1">
//           Overall attendance trend over the semester
//         </p>
//       </Link>
//     </div>
//   );
// };

// export default AttendanceChartsPage;

// pbranch/pages/AttendanceChartsLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";

const AttendanceChartsLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Charts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Visual representation of attendance data
        </p>
      </div>

      {/* clickable cards */}
      <div className="space-y-4">
        <ChartCard
          title="Subject-wise Breakdown"
          description="Attendance percentage per subject"
          to="/student-dashboard/charts/subject-wise"
          active={pathname.endsWith("/subject-wise")}
        />
        <ChartCard
          title="Distribution View"
          description="Subject-wise attendance distribution"
          to="/student-dashboard/charts/distribution"
          active={pathname.endsWith("/distribution")}
        />
        <ChartCard
          title="Monthly Attendance Trend"
          description="Overall attendance trend over the semester"
          to="/student-dashboard/charts/trend"
          active={pathname.endsWith("/trend")}
        />
      </div>

      {/* nested route content (actual graphs) */}
      <Outlet />
    </div>
  );
};

const ChartCard = ({ title, description, to, active }) => (
  <Link
    to={to}
    className={`block bg-white rounded-2xl border shadow-sm p-5 transition-all duration-200
    ${active ? "border-indigo-300 shadow-md" : "border-gray-100 hover:border-indigo-200 hover:shadow-md"}`}
  >
    <h3 className="text-base font-bold text-gray-900">{title}</h3>
    <p className="text-xs text-gray-500 mt-1">{description}</p>
  </Link>
);

export default AttendanceChartsLayout;

