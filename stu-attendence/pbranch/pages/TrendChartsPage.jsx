// pbranch/pages/TrendChartsPage.jsx
// import AttendanceCharts from "../components/dashboard/AttendanceCharts";

// const TrendChartsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           Monthly Attendance Trend
//         </h1>
//       </div>

//       <AttendanceCharts />
//     </div>
//   );
// };

// export default TrendChartsPage;
// pbranch/pages/TrendChartsPage.jsx
// pbranch/pages/TrendChartsPage.jsx
import AttendanceCharts from "../components/dashboard/AttendanceCharts";

const TrendChartsPage = () => {
  return (
    <div className="mt-2">
      <AttendanceCharts variant="trend" />
    </div>
  );
};

export default TrendChartsPage;


