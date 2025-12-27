import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, BookOpen, TrendingUp, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call later
  const mockStudentData = {
    name: "Piyush Raj",
    regNumber: "reg1244",
    branch: "Computer Science",
    semester: 5,
    section: "A",
    email: "piyush@gmail.com",
    phone: "1234567890",
  };

  const mockAttendanceData = [
    { subject: "Data Structures", percentage: 85 },
    { subject: "Web Development", percentage: 92 },
    { subject: "Database Systems", percentage: 78 },
    { subject: "Algorithms", percentage: 88 },
    { subject: "System Design", percentage: 95 },
  ];

  const mockGradesData = [
    { name: "Quiz 1", score: 18, total: 20 },
    { name: "Mid Sem", score: 35, total: 40 },
    { name: "Assignment", score: 9, total: 10 },
    { name: "Project", score: 28, total: 30 },
  ];

  const mockCoursePerformance = [
    { name: "Jan", performance: 75 },
    { name: "Feb", performance: 78 },
    { name: "Mar", performance: 82 },
    { name: "Apr", performance: 85 },
    { name: "May", performance: 88 },
    { name: "Jun", performance: 92 },
  ];

  const mockEnrolledCourses = [
    { id: 1, code: "CS501", name: "Data Structures", teacher: "Dr. Smith", credits: 4, status: "Active" },
    { id: 2, code: "CS502", name: "Web Development", teacher: "Prof. Johnson", credits: 3, status: "Active" },
    { id: 3, code: "CS503", name: "Database Systems", teacher: "Dr. Brown", credits: 4, status: "Active" },
    { id: 4, code: "CS504", name: "System Design", teacher: "Prof. Williams", credits: 4, status: "Active" },
  ];

  const mockUpcomingEvents = [
    { id: 1, title: "Data Structures Mid Exam", date: "2025-01-15", type: "exam", subject: "Data Structures" },
    { id: 2, title: "Web Dev Project Submission", date: "2025-01-18", type: "assignment", subject: "Web Development" },
    { id: 3, title: "Database Quiz 2", date: "2025-01-20", type: "quiz", subject: "Database Systems" },
    { id: 4, title: "System Design Class", date: "2025-01-22", type: "class", subject: "System Design" },
  ];

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudentData(mockStudentData);
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

  // Calculate overall attendance
  const overallAttendance = Math.round(
    mockAttendanceData.reduce((sum, item) => sum + item.percentage, 0) / mockAttendanceData.length
  );

  // Calculate SGPA (mock)
  const mockSGPA = 8.45;

  // Calculate total credits
  const totalCredits = mockEnrolledCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
        <p className="text-blue-100">
          Semester {studentData.semester} | {studentData.branch} | Section {studentData.section}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Overall Attendance</p>
              <h3 className="text-3xl font-bold text-gray-800">{overallAttendance}%</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Target: 75%</p>
        </div>

        {/* SGPA */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Current SGPA</p>
              <h3 className="text-3xl font-bold text-gray-800">{mockSGPA}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Out of 10.0</p>
        </div>

        {/* Active Courses */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Courses</p>
              <h3 className="text-3xl font-bold text-gray-800">{mockEnrolledCourses.length}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">{totalCredits} Credits</p>
        </div>

        {/* Hours Studied */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Study Hours (This Month)</p>
              <h3 className="text-3xl font-bold text-gray-800">48</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Keep it up!</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockCoursePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance by Subject */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance by Subject</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} interval={0} tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="percentage" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Upcoming Events
            </h2>
            <div className="space-y-3">
              {mockUpcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-sm text-gray-800">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded ${
                    event.type === 'exam' ? 'bg-red-100 text-red-700' :
                    event.type === 'assignment' ? 'bg-yellow-100 text-yellow-700' :
                    event.type === 'quiz' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Info</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration No.</span>
                <span className="font-medium text-gray-800">{studentData.regNumber}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-800 text-sm">{studentData.email}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-gray-800">{studentData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockEnrolledCourses.map((course) => (
            <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{course.code}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  {course.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{course.name}</p>
              <p className="text-xs text-gray-500 mb-3">👨‍🏫 {course.teacher}</p>
              <p className="text-xs font-medium text-blue-600">{course.credits} Credits</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;