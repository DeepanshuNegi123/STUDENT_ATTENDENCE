// pbranch/pages/DashboardHome.jsx
import StudentInfoCard from "../components/dashboard/StudentInfoCard";
import SummaryCards from "../components/dashboard/SummaryCards";
import SubjectAttendanceTable from "../components/dashboard/SubjectAttendanceTable";
import AttendanceCharts from "../components/dashboard/AttendanceCharts";
import RecentAttendance from "../components/dashboard/RecentAttendance";
import AlertsPanel from "../components/dashboard/AlertsPanel";

const DashboardHome = () => {
  return (
    <div className="space-y-5">
      <StudentInfoCard />
      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <SubjectAttendanceTable />
          <AttendanceCharts />
        </div>
        <div className="space-y-5">
          <RecentAttendance />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
