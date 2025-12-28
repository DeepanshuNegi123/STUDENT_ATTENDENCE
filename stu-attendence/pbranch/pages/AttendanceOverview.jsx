// pbranch/pages/AttendanceOverview.jsx
import SummaryCards from "../components/dashboard/SummaryCards";
import RecentAttendance from "../components/dashboard/RecentAttendance";
import AlertsPanel from "../components/dashboard/AlertsPanel";

const AttendanceOverview = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete summary of your attendance records
        </p>
      </div>

      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentAttendance />
        <AlertsPanel />
      </div>
    </div>
  );
};

export default AttendanceOverview;
