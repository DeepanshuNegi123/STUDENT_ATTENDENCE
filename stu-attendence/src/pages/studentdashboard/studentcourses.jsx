import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock courses data
  const mockCourses = [
    {
      id: 1,
      code: "CS501",
      name: "Data Structures",
      teacher: "Dr. Smith",
      credits: 4,
      semester: 5,
      status: "Active",
      description: "Learn fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.",
      schedule: "Monday, Wednesday, Friday - 10:00 AM to 11:30 AM",
      classroom: "Block A, Room 101",
      totalStudents: 45,
      materials: 12,
      assignments: 5,
      attendance: 85,
      nextClass: "2025-01-15 10:00 AM",
      syllabus: "Introduction to Data Structures, Linear Structures, Tree Structures, Graph Algorithms",
    },
    {
      id: 2,
      code: "CS502",
      name: "Web Development",
      teacher: "Prof. Johnson",
      credits: 3,
      semester: 5,
      status: "Active",
      description: "Master modern web development with HTML, CSS, JavaScript, React, and backend technologies.",
      schedule: "Tuesday, Thursday - 2:00 PM to 3:30 PM",
      classroom: "Block B, Room 205",
      totalStudents: 52,
      materials: 15,
      assignments: 6,
      attendance: 92,
      nextClass: "2025-01-14 2:00 PM",
      syllabus: "Frontend Fundamentals, React Framework, Backend APIs, Database Integration",
    },
    {
      id: 3,
      code: "CS503",
      name: "Database Systems",
      teacher: "Dr. Brown",
      credits: 4,
      semester: 5,
      status: "Active",
      description: "Comprehensive study of database design, SQL, normalization, and database management systems.",
      schedule: "Monday, Wednesday - 1:00 PM to 2:30 PM",
      classroom: "Block C, Room 310",
      totalStudents: 48,
      materials: 10,
      assignments: 4,
      attendance: 78,
      nextClass: "2025-01-16 1:00 PM",
      syllabus: "Database Design, SQL Queries, Normalization, Transactions, Security",
    },
    {
      id: 4,
      code: "CS504",
      name: "System Design",
      teacher: "Prof. Williams",
      credits: 4,
      semester: 5,
      status: "Active",
      description: "Advanced course on designing scalable and distributed systems for large-scale applications.",
      schedule: "Tuesday, Thursday - 11:00 AM to 12:30 PM",
      classroom: "Block A, Room 202",
      totalStudents: 40,
      materials: 18,
      assignments: 7,
      attendance: 95,
      nextClass: "2025-01-14 11:00 AM",
      syllabus: "System Architecture, Scalability, Load Balancing, Distributed Systems, Microservices",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(mockCourses);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-blue-100">You are enrolled in {courses.length} courses this semester</p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer border border-gray-200 overflow-hidden"
          >
            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold">{course.code}</h3>
                  <p className="text-blue-100">{course.name}</p>
                </div>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {course.credits} Credits
                </span>
              </div>
            </div>

            {/* Course Body */}
            <div className="p-6 space-y-4">
              {/* Teacher */}
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Instructor</p>
                  <p className="font-medium text-gray-800">{course.teacher}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-3">
                <Clock className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Schedule</p>
                  <p className="font-medium text-gray-800 text-sm">{course.schedule}</p>
                </div>
              </div>

              {/* Attendance */}
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Attendance</p>
                  <p className="font-medium text-gray-800">{course.attendance}%</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{course.materials}</p>
                  <p className="text-xs text-gray-500">Materials</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{course.assignments}</p>
                  <p className="text-xs text-gray-500">Assignments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{course.totalStudents}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-white hover:text-blue-200 float-right text-2xl"
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedCourse.code} - {selectedCourse.name}</h2>
              <p className="text-blue-100">{selectedCourse.description}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Instructor */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <User size={20} />
                  Instructor
                </h3>
                <p className="text-gray-700">{selectedCourse.teacher}</p>
              </div>

              {/* Schedule Details */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock size={20} />
                  Class Schedule
                </h3>
                <p className="text-gray-700 mb-2">{selectedCourse.schedule}</p>
                <p className="text-gray-600 text-sm">📍 {selectedCourse.classroom}</p>
              </div>

              {/* Next Class */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-gray-600">Next Class</p>
                <p className="text-lg font-bold text-blue-600">{selectedCourse.nextClass}</p>
              </div>

              {/* Syllabus */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FileText size={20} />
                  Syllabus
                </h3>
                <p className="text-gray-700">{selectedCourse.syllabus}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Course Materials</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedCourse.materials}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Assignments</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedCourse.assignments}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-3xl font-bold text-green-600">{selectedCourse.attendance}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-orange-600">{selectedCourse.totalStudents}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  View Materials
                </button>
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                  View Assignments
                </button>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;