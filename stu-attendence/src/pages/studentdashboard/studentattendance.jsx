import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, TrendingDown, CheckCircle, Clock } from 'lucide-react';

const StudentAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [filterCourse, setFilterCourse] = useState("");



  // Mock attendance data
  const mockAttendanceBySubject = [
    { subject: "Data Structures", attended: 34, total: 40, percentage: 85 },
    { subject: "Web Development", attended: 37, total: 40, percentage: 92 },
    { subject: "Database Systems", attended: 31, total: 40, percentage: 78 },
    { subject: "System Design", attended: 38, total: 40, percentage: 95 },
  ];



  const mockAttendanceTrend = [
    { week: "Week 1", percentage: 80 },
    { week: "Week 2", percentage: 85 },
    { week: "Week 3", percentage: 82 },
    { week: "Week 4", percentage: 88 },
    { week: "Week 5", percentage: 90 },
    { week: "Week 6", percentage: 87 },
  ];



  const mockClassAttendance = [
    { id: 1, date: "2025-01-10", subject: "Data Structures", status: "Present", time: "10:15 AM", remarks: "On time" },
    { id: 2, date: "2025-01-09", subject: "Web Development", status: "Present", time: "2:05 PM", remarks: "On time" },
    { id: 3, date: "2025-01-08", subject: "Database Systems", status: "Absent", time: "-", remarks: "No reason provided" },
    { id: 4, date: "2025-01-07", subject: "System Design", status: "Present", time: "11:10 AM", remarks: "On time" },
    { id: 5, date: "2025-01-06", subject: "Data Structures", status: "Present", time: "10:08 AM", remarks: "2 mins late" },
    { id: 6, date: "2025-01-03", subject: "Web Development", status: "Present", time: "2:00 PM", remarks: "On time" },
    { id: 7, date: "2025-01-02", subject: "Database Systems", status: "Present", time: "1:05 PM", remarks: "On time" },
    { id: 8, date: "2025-01-01", subject: "System Design", status: "Absent", time: "-", remarks: "Medical leave" },
  ];



  const pieData = [
    { name: "Present", value: 32 },
    { name: "Absent", value: 5 },
    { name: "Leave", value: 3 },
  ];

  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalClasses = mockClassAttendance.length;
  const presentDays = mockClassAttendance.filter(item => item.status === "Present").length;
  const absentDays = mockClassAttendance.filter(item => item.status === "Absent").length;
  const overallPercentage = Math.round((presentDays / totalClasses) * 100);

  // Filter attendance by course
  const filteredAttendance = filterCourse
    ? mockAttendanceBySubject.filter(item => item.subject === filterCourse)
    : mockAttendanceBySubject;


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Attendance Tracker</h1>
        <p className="text-green-100">Monitor your attendance across all courses</p>
      </div>


      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Overall Attendance</p>
              <h3 className="text-3xl font-bold text-gray-800">{overallPercentage}%</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Target: 75%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Classes Attended</p>
              <h3 className="text-3xl font-bold text-gray-800">{presentDays}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Out of {totalClasses} classes</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Absent Days</p>
              <h3 className="text-3xl font-bold text-gray-800">{absentDays}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Need to be careful</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Classes</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalClasses}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">This semester</p>
        </div>
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance by Subject */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance by Subject</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAttendanceBySubject}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} interval={0} tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>



        {/* Attendance Summary Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Attendance Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Attendance Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockAttendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>




      {/* Attendance by Subject Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Subject-wise Attendance</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attended</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockAttendanceBySubject.map((item) => (
              <tr key={item.subject} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.attended}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.percentage >= 80 ? 'bg-green-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{item.percentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.percentage >= 75 ? (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ✓ Good
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      ⚠ Risky
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* Detailed Class-wise Attendance */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Recent Class Attendance</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockClassAttendance.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.status === "Present" ? (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ✓ Present
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      ✕ Absent
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendance;