// pbranch/pages/SubjectWiseAttendance.jsx
import SubjectAttendanceTable from "../components/dashboard/SubjectAttendanceTable";
import AttendanceCharts from "../components/dashboard/AttendanceCharts";

const SubjectWiseAttendance = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subject-wise Attendance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Detailed attendance breakdown for each subject
        </p>
      </div>

      <SubjectAttendanceTable />
      <AttendanceCharts />
    </div>
  );
};

export default SubjectWiseAttendance;
