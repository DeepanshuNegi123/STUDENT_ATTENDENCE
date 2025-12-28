// pbranch/pages/DistributionChartsPage.jsx
// import AttendanceCharts from "../components/dashboard/AttendanceCharts";

// const DistributionChartsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Distribution View</h1>
//       </div>

//       <AttendanceCharts />
//     </div>
//   );
// };

// export default DistributionChartsPage;

// pbranch/pages/DistributionChartsPage.jsx
// pbranch/pages/DistributionChartsPage.jsx
import AttendanceCharts from "../components/dashboard/AttendanceCharts";

const DistributionChartsPage = () => {
  return (
    <div className="mt-2">
      <AttendanceCharts variant="distribution" />
    </div>
  );
};

export default DistributionChartsPage;

