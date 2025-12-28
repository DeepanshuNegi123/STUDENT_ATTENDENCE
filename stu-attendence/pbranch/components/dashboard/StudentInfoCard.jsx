// pbranch/components/dashboard/StudentInfoCard.jsx
import { IdCard, GraduationCap, Hash, Layers, Mail, Phone } from "lucide-react";
import { studentInfo } from "../../data/attendanceData";

const StudentInfoCard = () => {
  return (
    <section className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center shadow-lg">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-xs text-indigo-600 uppercase tracking-wide font-semibold">
              Student Information
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{studentInfo.name}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
        <InfoItem icon={IdCard} label="Roll Number" value={studentInfo.rollNumber} />
        <InfoItem icon={GraduationCap} label="Course" value={studentInfo.course} />
        <InfoItem icon={Layers} label="Semester" value={studentInfo.semester} />
        <InfoItem icon={Hash} label="Section" value={studentInfo.section} />
        <InfoItem icon={Mail} label="Email" value={studentInfo.email} />
        <InfoItem icon={Phone} label="Phone" value={studentInfo.phone} />
      </div>
    </section>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2">
    <Icon className="text-indigo-500 mt-0.5 shrink-0" size={16} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-gray-900 font-semibold text-xs sm:text-sm break-all">{value}</p>
    </div>
  </div>
);

export default StudentInfoCard;
