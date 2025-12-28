import React, { useState } from 'react';
import { Search, Check, X, AlertCircle, Save, BookOpen } from 'lucide-react';

// ============================================================================
// MARK ATTENDANCE PAGE - Professional Design
// ============================================================================

const MarkAttendancePage = () => {
  // State management for attendance system
  const [selectedCourse, setSelectedCourse] = useState('CS-301');
  const [attendanceData, setAttendanceData] = useState(
    generateStudentData('CS-301')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [savedMessage, setSavedMessage] = useState(false);

  // Available courses
  const courseOptions = [
    { code: 'CS-301', name: 'Data Structures' },
    { code: 'CS-302', name: 'Operating Systems' },
    { code: 'CS-303', name: 'Computer Networks' },
    { code: 'CS-304', name: 'Database Management Systems' },
    { code: 'CS-305', name: 'Web Development' },
  ];

  // Generate mock student data - Replace with backend API call
  function generateStudentData(courseCode) {
    const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Ishaan', 'Rohan', 'Harsh', 'Nikhil', 'Karan', 'Sahil'];
    const lastNames = ['Sharma', 'Singh', 'Patel', 'Kumar', 'Verma', 'Gupta', 'Reddy', 'Rao', 'Nair', 'Iyer'];

    return Array.from({ length: 68 }, (_, i) => ({
      id: i + 1,
      rollNumber: `BE${String(i + 1).padStart(4, '0')}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      email: `student${i + 1}@university.edu`,
      status: 'present',
      remarks: '',
    }));
  }

  // Handle course selection change
  const handleCourseChange = (courseCode) => {
    setSelectedCourse(courseCode);
    setAttendanceData(generateStudentData(courseCode));
    setSearchTerm('');
  };

  // Update individual student attendance status
  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceData(
      attendanceData.map(student =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  // Update student remarks
  const handleRemarksChange = (studentId, remarks) => {
    setAttendanceData(
      attendanceData.map(student =>
        student.id === studentId ? { ...student, remarks } : student
      )
    );
  };

  // Mark all students with same status
  const handleMarkAll = (status) => {
    setAttendanceData(
      attendanceData.map(student => ({ ...student, status }))
    );
  };

  // Save attendance to backend
  const handleSaveAttendance = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
    // TODO: Replace with actual API call
    console.log('Attendance saved:', { course: selectedCourse, attendance: attendanceData });
  };

  // Filter students based on search and status
  const filteredStudents = attendanceData.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.includes(searchTerm);
    const matchesFilter =
      filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate attendance statistics
  const stats = {
    present: attendanceData.filter(s => s.status === 'present').length,
    absent: attendanceData.filter(s => s.status === 'absent').length,
    leave: attendanceData.filter(s => s.status === 'leave').length,
  };

  const selectedCourseData = courseOptions.find(c => c.code === selectedCourse);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Mark Attendance</h1>
          <p className="text-sm text-gray-600 mt-1">{currentDate}</p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
            <Check size={18} />
            <span className="text-sm font-medium">Attendance recorded successfully!</span>
          </div>
        )}

        {/* Course Selection */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Select Course
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {courseOptions.map(course => (
              <button
                key={course.code}
                onClick={() => handleCourseChange(course.code)}
                className={`py-3 px-4 font-medium transition text-center text-sm border ${selectedCourse === course.code
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                title={course.name}
              >
                <div className="font-semibold">{course.code}</div>
                <div className="text-xs mt-1 opacity-90">{course.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Present</p>
            <p className="text-3xl font-semibold text-green-600 mt-2">{stats.present}</p>
            <p className="text-xs text-gray-600 mt-1">
              {((stats.present / attendanceData.length) * 100).toFixed(1)}% of total
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Absent</p>
            <p className="text-3xl font-semibold text-red-600 mt-2">{stats.absent}</p>
            <p className="text-xs text-gray-600 mt-1">
              {((stats.absent / attendanceData.length) * 100).toFixed(1)}% of total
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">On Leave</p>
            <p className="text-3xl font-semibold text-yellow-600 mt-2">{stats.leave}</p>
            <p className="text-xs text-gray-600 mt-1">
              {((stats.leave / attendanceData.length) * 100).toFixed(1)}% of total
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleMarkAll('present')}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            >
              Mark All Absent
            </button>
            <button
              onClick={() => handleMarkAll('leave')}
              className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-700 transition"
            >
              Mark All Leave
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Search Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                Search Student
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="all">All Students ({attendanceData.length})</option>
                <option value="present">Present Only ({stats.present})</option>
                <option value="absent">Absent Only ({stats.absent})</option>
                <option value="leave">Leave Only ({stats.leave})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Roll Number */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {student.rollNumber}
                    </td>

                    {/* Student Name */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.name}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.email}
                    </td>

                    {/* Attendance Buttons */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-3 py-1.5 text-xs font-medium transition border ${student.status === 'present'
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-300'
                            }`}
                          title="Present"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-3 py-1.5 text-xs font-medium transition border ${student.status === 'absent'
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:border-red-300'
                            }`}
                          title="Absent"
                        >
                          <X size={14} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'leave')}
                          className={`px-3 py-1.5 text-xs font-medium transition border ${student.status === 'leave'
                              ? 'bg-yellow-600 text-white border-yellow-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-50 hover:border-yellow-300'
                            }`}
                          title="Leave"
                        >
                          <AlertCircle size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Remarks Input */}
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Add remarks..."
                        value={student.remarks}
                        onChange={(e) =>
                          handleRemarksChange(student.id, e.target.value)
                        }
                        className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results Message */}
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No students found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {attendanceData.length} students
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button
              onClick={handleSaveAttendance}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Save size={16} />
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendancePage;