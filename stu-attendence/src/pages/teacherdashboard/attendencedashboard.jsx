import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, BarChart3, AlertCircle } from 'lucide-react';

const TeacherDashboard = () => {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    fetchTeacherOfferings();
  }, []);

  const fetchTeacherOfferings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:5008/api/teacher/offerings",
        {
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch offerings");
      }

      const data = await response.json();
      console.log("Offerings data:", data);

      if (data.success && data.offerings) {
        // Fetch student count for each offering
        const offeringsWithStats = await Promise.all(
          data.offerings.map(async (offering) => {
            try {
              const studentsResponse = await fetch(
                `http://localhost:5008/api/teacher/attendance/students?offeringId=${offering._id}`,
                {
                  headers: getAuthHeader(),
                }
              );

              let enrolledStudents = 0;
              if (studentsResponse.ok) {
                const studentsData = await studentsResponse.json();
                enrolledStudents = studentsData.totalStudents || 0;
              }

              return {
                id: offering._id,
                courseCode: offering.subject?.code || "N/A",
                courseName: offering.subject?.name || "N/A",
                semester: offering.semester || "N/A",
                classCode: offering.classId?.classCode || "N/A",
                branch: offering.classId?.branch || "N/A",
                academicYear: offering.academicYear || "N/A",
                enrolledStudents: enrolledStudents,
                attendanceMarked: false,
              };
            } catch (err) {
              console.error("Error fetching students:", err);
              return {
                id: offering._id,
                courseCode: offering.subject?.code || "N/A",
                courseName: offering.subject?.name || "N/A",
                semester: offering.semester || "N/A",
                classCode: offering.classId?.classCode || "N/A",
                branch: offering.classId?.branch || "N/A",
                academicYear: offering.academicYear || "N/A",
                enrolledStudents: 0,
                attendanceMarked: false,
              };
            }
          })
        );

        setOfferings(offeringsWithStats);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalCourses: offerings.length,
    totalStudents: offerings.reduce((sum, o) => sum + o.enrolledStudents, 0),
    averageStudents: offerings.length > 0 
      ? Math.round(offerings.reduce((sum, o) => sum + o.enrolledStudents, 0) / offerings.length)
      : 0,
  };

  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <div>
              <p className="font-bold">Error Loading Dashboard</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Teaching Dashboard</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar size={18} />
            {getTodayDate()}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Courses" value={stats.totalCourses} color="blue" icon="📚" />
          <StatCard label="Total Students" value={stats.totalStudents} color="green" icon="👥" />
          <StatCard label="Avg. Students/Course" value={stats.averageStudents} color="purple" icon="📊" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => window.location.href = '/markattendence'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
          >
            <BarChart3 size={18} />
            Mark Attendance
          </button>
          <button
            onClick={fetchTeacherOfferings}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition shadow-sm"
          >
            Refresh
          </button>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>

          {offerings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {offerings.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onMarkAttendance={() => window.location.href = '/markattendence'}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No courses assigned yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
};

const CourseCard = ({ course, onMarkAttendance }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition bg-white flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{course.courseCode}</h3>
            <p className="text-gray-600 font-medium">{course.courseName}</p>
            <p className="text-sm text-gray-500 mt-1">
              {course.classCode} - {course.branch}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 whitespace-nowrap ml-4">
            Semester {course.semester}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 grid grid-cols-2 gap-4">
          <p className="flex items-center gap-2">
            <Users size={16} />
            {course.enrolledStudents} Students
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} />
            {course.academicYear}
          </p>
        </div>
      </div>

      <button
        onClick={onMarkAttendance}
        className="mt-4 md:mt-0 md:ml-4 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700"
      >
        Mark Attendance
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default TeacherDashboard;