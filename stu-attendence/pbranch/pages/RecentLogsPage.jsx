// pbranch/pages/RecentLogsPage.jsx
import RecentAttendance from "../components/dashboard/RecentAttendance";

const RecentLogsPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recent Attendance Logs</h1>
        <p className="text-sm text-gray-500 mt-1">
          View your recent attendance history
        </p>
      </div>

      <RecentAttendance />
    </div>
  );
};

export default RecentLogsPage;
