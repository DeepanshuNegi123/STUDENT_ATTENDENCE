// pbranch/components/dashboard/SubjectAttendanceTable.jsx
import { subjectAttendance } from "../../data/attendanceData";

const SubjectAttendanceTable = () => {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-gray-900">Subject-wise Attendance</h3>
          <p className="text-xs text-gray-500 mt-1">
            Detailed breakdown for each subject
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100 uppercase tracking-wide">
              <th className="py-3 pr-4 font-semibold">Subject</th>
              <th className="py-3 px-4 font-semibold">Code</th>
              <th className="py-3 px-4 font-semibold">Attended</th>
              <th className="py-3 px-4 font-semibold">Total</th>
              <th className="py-3 pl-4 font-semibold">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {subjectAttendance.map((row) => {
              const percentage = Math.round((row.attended / row.total) * 100);
              const isLow = percentage < 75;
              const isWarning = percentage >= 75 && percentage < 85;

              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors"
                >
                  <td className="py-3 pr-4 text-gray-900 font-semibold">
                    {row.subject}
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-xs">
                    {row.code}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {row.attended}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {row.total}
                  </td>
                  <td className="py-3 pl-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        isLow
                          ? "bg-red-50 text-red-700"
                          : isWarning
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isLow
                            ? "bg-red-500"
                            : isWarning
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      {percentage}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SubjectAttendanceTable;
