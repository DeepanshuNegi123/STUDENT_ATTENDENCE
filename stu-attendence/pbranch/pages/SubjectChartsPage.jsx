// pbranch/pages/SubjectChartsPage.jsx
// import AttendanceCharts from "../components/dashboard/AttendanceCharts";

// const SubjectChartsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Subject-wise Breakdown</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Bar and pie charts of subject-wise attendance
//         </p>
//       </div>

//       {/* You can either reuse the combined component or create a specific one */}
//       <AttendanceCharts />
//     </div>
//   );
// };

// export default SubjectChartsPage;

// pbranch/pages/SubjectChartsPage.jsx
// import AttendanceCharts from "../components/dashboard/AttendanceCharts";

// const SubjectChartsPage = () => (
//   <div className="space-y-5">
//     <h1 className="text-2xl font-bold text-gray-900">Subject-wise Breakdown</h1>
//     <AttendanceCharts /> {/* or a SubjectOnlyCharts component */}
//   </div>
// );

// export default SubjectChartsPage;

// pbranch/pages/SubjectChartsPage.jsx
// pbranch/pages/SubjectChartsPage.jsx
import AttendanceCharts from "../components/dashboard/AttendanceCharts";

const SubjectChartsPage = () => {
  // Show only the subject-wise bar + pie part from AttendanceCharts
  return (
    <div className="mt-2">
      <AttendanceCharts variant="subject" />
    </div>
  );
};

export default SubjectChartsPage;


