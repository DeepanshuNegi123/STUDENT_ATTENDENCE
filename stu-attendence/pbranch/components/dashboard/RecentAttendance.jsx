// pbranch/components/dashboard/RecentAttendance.jsx
import { recentAttendance } from "../../data/attendanceData";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const RecentAttendance = () => {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">Recent Attendance</h3>
        <p className="text-xs text-gray-500 mt-1">Last few days attendance history</p>
      </div>

      <ul className="space-y-2.5">
        {recentAttendance.map((item, index) => {
          const isPresent = item.status === "Present";
          return (
            <li
              key={index}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50/70 hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {item.subject}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.day}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.time}
                  </span>
                </div>
              </div>
              <div>
                {isPresent ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    <CheckCircle2 size={14} />
                    Present
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700">
                    <XCircle size={14} />
                    Absent
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RecentAttendance;
