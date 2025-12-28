// pbranch/components/dashboard/AttendanceCharts.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  attendanceChartData,
  monthlyAttendanceTrend,
} from "../../data/attendanceData";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const AttendanceCharts = ({ variant = "subject" }) => {
  const showSubject = variant === "subject" || variant === "all";
  const showDistribution = variant === "distribution" || variant === "all";
  const showTrend = variant === "trend" || variant === "all";

  return (
    <div className="space-y-5">
      {/* Top row: subject bar + distribution pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {showSubject && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-auto">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">
                Subject-wise Breakdown
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Attendance percentage per subject
              </p>
            </div>

            {/* Fixed size bar chart */}
            <BarChart
              width={600}
              height={260}
              data={attendanceChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                angle={-35}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]} fill="#4f46e5" />
            </BarChart>
          </div>
        )}

        {showDistribution && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-auto">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">Distribution View</h3>
              <p className="text-xs text-gray-500 mt-1">
                Subject-wise attendance distribution
              </p>
            </div>

            {/* Fixed size pie chart */}
            <PieChart width={320} height={260}>
              <Pie
                data={attendanceChartData}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                label={({ percentage }) => `${percentage}%`}
              >
                {attendanceChartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </div>
        )}
      </div>

      {/* Bottom row: trend line chart */}
      {showTrend && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-auto">
          <div className="mb-4">
            <h3 className="text-base font-bold text-gray-900">
              Monthly Attendance Trend
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Overall attendance trend over the semester
            </p>
          </div>

          {/* Fixed size line chart */}
          <LineChart
            width={700}
            height={260}
            data={monthlyAttendanceTrend}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#6b7280" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              domain={[70, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5, fill: "#10b981" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default AttendanceCharts;
