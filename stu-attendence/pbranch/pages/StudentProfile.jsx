// pbranch/pages/StudentProfile.jsx
import StudentInfoCard from "../components/dashboard/StudentInfoCard";
import { studentInfo } from "../data/attendanceData";

const StudentProfile = () => {
  return (
    <div className="space-y-5">
      <StudentInfoCard />
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">Additional Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <DetailItem label="Father's Name" value="Rajesh Sharma" />
          <DetailItem label="Mother's Name" value="Priya Sharma" />
          <DetailItem label="Date of Birth" value="15 March 2005" />
          <DetailItem label="Blood Group" value="O+" />
          <DetailItem label="Address" value="123, MG Road, Phagwara, Punjab" />
          <DetailItem label="Emergency Contact" value="+91 98765 00000" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">Academic Performance</h2>
        <p className="text-sm text-gray-600">
          CGPA: <span className="font-bold text-gray-900">8.5 / 10.0</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Previous Semester SGPA: <span className="font-bold text-gray-900">8.7 / 10.0</span>
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-gray-900 font-semibold">{value}</p>
  </div>
);

export default StudentProfile;
