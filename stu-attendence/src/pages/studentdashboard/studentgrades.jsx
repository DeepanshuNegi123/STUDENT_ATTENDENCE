import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, AlertCircle, CheckCircle } from 'lucide-react';

const StudentGrades = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock grades data
  const mockCourseGrades = [
    {
      id: 1,
      code: "CS501",
      name: "Data Structures",
      teacher: "Dr. Smith",
      credits: 4,
      assessments: [
        { name: "Quiz 1", score: 18, total: 20, date: "2025-01-05", weight: 5 },
        { name: "Quiz 2", score: 17, total: 20, date: "2025-01-12", weight: 5 },
        { name: "Assignment 1", score: 9, total: 10, date: "2025-01-08", weight: 10 },
        { name: "Assignment 2", score: 8, total: 10, date: "2025-01-15", weight: 10 },
        { name: "Mid Semester", score: 35, total: 40, date: "2024-12-20", weight: 30 },
      ],
      currentScore: 87,
      expectedGrade: "A",
      gradePointValue: 4.0,
    },
    {
      id: 2,
      code: "CS502",
      name: "Web Development",
      teacher: "Prof. Johnson",
      credits: 3,
      assessments: [
        { name: "Quiz 1", score: 20, total: 20, date: "2025-01-05", weight: 5 },
        { name: "Quiz 2", score: 19, total: 20, date: "2025-01-12", weight: 5 },
        { name: "Project 1", score: 48, total: 50, date: "2025-01-10", weight: 20 },
        { name: "Mid Semester", score: 38, total: 40, date: "2024-12-20", weight: 30 },
      ],
      currentScore: 92,
      expectedGrade: "A",
      gradePointValue: 4.0,
    },
    {
      id: 3,
      code: "CS503",
      name: "Database Systems",
      teacher: "Dr. Brown",
      credits: 4,
      assessments: [
        { name: "Quiz 1", score: 16, total: 20, date: "2025-01-05", weight: 5 },
        { name: "Quiz 2", score: 15, total: 20, date: "2025-01-12", weight: 5 },
        { name: "Assignment 1", score: 7, total: 10, date: "2025-01-08", weight: 10 },
        { name: "Mid Semester", score: 30, total: 40, date: "2024-12-20", weight: 30 },
      ],
      currentScore: 78,
      expectedGrade: "B+",
      gradePointValue: 3.3,
    },
    {
      id: 4,
      code: "CS504",
      name: "System Design",
      teacher: "Prof. Williams",
      credits: 4,
      assessments: [
        { name: "Quiz 1", score: 20, total: 20, date: "2025-01-05", weight: 5 },
        { name: "Quiz 2", score: 20, total: 20, date: "2025-01-12", weight: 5 },
        { name: "Assignment 1", score: 10, total: 10, date: "2025-01-08", weight: 10 },
        { name: "Assignment 2", score: 9, total: 10, date: "2025-01-15", weight: 10 },
        { name: "Mid Semester", score: 38, total: 40, date: "2024-12-20", weight: 30 },
      ],
      currentScore: 95,
      expectedGrade: "A+",
      gradePointValue: 4.0,
    },
  ];

  const mockGradeDistribution = [
    { grade: "A+", count: 2, percentage: 25 },
    { grade: "A", count: 1, percentage: 50 },
    { grade: "B+", count: 1, percentage: 25 },
  ];

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

  // Calculate SGPA
  const totalCredits = mockCourseGrades.reduce((sum, course) => sum + course.credits, 0);
  const weightedSum = mockCourseGrades.reduce((sum, course) => sum + (course.gradePointValue * course.credits), 0);
  const SGPA = (weightedSum / totalCredits).toFixed(2);

  // Calculate average score
  const avgScore = Math.round(
    mockCourseGrades.reduce((sum, course) => sum + course.currentScore, 0) / mockCourseGrades.length
  );

  const getGradeColor = (expectedGrade) => {
    if (expectedGrade === "A" || expectedGrade === "A+") return "bg-green-100 text-green-700";
    if (expectedGrade === "B+") return "bg-blue-100 text-blue-700";
    if (expectedGrade === "B") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Grades & Performance</h1>
        <p className="text-purple-100">Track your academic performance across courses</p>
      </div>

      {/* Overall Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Current SGPA</p>
              <h3 className="text-3xl font-bold text-gray-800">{SGPA}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Out of 10.0</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <h3 className="text-3xl font-bold text-gray-800">{avgScore}%</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Across all courses</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Credits</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalCredits}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Enrolled courses</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Courses</p>
              <h3 className="text-3xl font-bold text-gray-800">{mockCourseGrades.length}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertCircle className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Active semester</p>
        </div>
      </div>

      {/* Course Grades Overview */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Course Grades Summary</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCourseGrades.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.credits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${course.currentScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{course.currentScore}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGradeColor(course.expectedGrade)}`}>
                    {course.expectedGrade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grade Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Score Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockCourseGrades}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="currentScore" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8">
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-white hover:text-purple-200 float-right text-2xl"
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedCourse.code} - {selectedCourse.name}</h2>
              <p className="text-purple-100">Instructor: {selectedCourse.teacher}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Overall Performance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Current Score</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedCourse.currentScore}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Expected Grade</p>
                  <p className={`text-3xl font-bold ${selectedCourse.expectedGrade === 'A+' ? 'text-green-600' : 'text-blue-600'}`}>
                    {selectedCourse.expectedGrade}
                  </p>
                </div>
              </div>

              {/* Assessments */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Assessment Breakdown</h3>
                <div className="space-y-3">
                  {selectedCourse.assessments.map((assessment, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">{assessment.name}</p>
                          <p className="text-xs text-gray-500">{assessment.date} | Weight: {assessment.weight}%</p>
                        </div>
                        <span className="text-lg font-bold text-purple-600">
                          {assessment.score}/{assessment.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-purple-600"
                          style={{ width: `${(assessment.score / assessment.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                  Download Report
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

export default StudentGrades;