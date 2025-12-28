import React, { useState } from 'react';
import { TrendingUp, Users, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const AttendanceSummary = () => {
    const [selectedMonth, setSelectedMonth] = useState('December');
    const [selectedSemester, setSelectedSemester] = useState('5th');

    const courseData = [
        {
            courseCode: 'CS-301',
            courseName: 'Data Structures',
            semester: '5th',
            enrolledStudents: 68,
            avgAttendance: 92,
            presentToday: 64,
            absentToday: 4,
            trend: 'up',
        },
        {
            courseCode: 'CS-302',
            courseName: 'Operating Systems',
            semester: '6th',
            enrolledStudents: 58,
            avgAttendance: 88,
            presentToday: 51,
            absentToday: 7,
            trend: 'down',
        },
        {
            courseCode: 'CS-303',
            courseName: 'Computer Networks',
            semester: '5th',
            enrolledStudents: 61,
            avgAttendance: 85,
            presentToday: 52,
            absentToday: 9,
            trend: 'stable',
        },
        {
            courseCode: 'CS-304',
            courseName: 'Database Management Systems',
            semester: '5th',
            enrolledStudents: 65,
            avgAttendance: 90,
            presentToday: 60,
            absentToday: 5,
            trend: 'up',
        },
        {
            courseCode: 'CS-305',
            courseName: 'Web Development',
            semester: '5th',
            enrolledStudents: 72,
            avgAttendance: 87,
            presentToday: 66,
            absentToday: 6,
            trend: 'stable',
        },
    ];

    const getTrendColor = (trend) => {
        if (trend === 'up') return 'text-green-600';
        if (trend === 'down') return 'text-red-600';
        return 'text-gray-600';
    };

    const getTrendLabel = (trend) => {
        if (trend === 'up') return '↑ Improving';
        if (trend === 'down') return '↓ Declining';
        return '→ Stable';
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const semesters = ['4th', '5th', '6th', '7th', '8th'];

    const filteredCourses = courseData.filter(c => c.semester === selectedSemester);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-4 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={28} className="text-blue-600" />
                        <h1 className="text-4xl font-bold text-gray-900">Attendance Summary</h1>
                    </div>
                    <p className="text-gray-600">Course-wise attendance overview and analysis</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Select Semester
                            </label>
                            <select
                                value={selectedSemester}
                                onChange={(e) => setSelectedSemester(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                            >
                                {semesters.map(sem => (
                                    <option key={sem} value={sem}>Semester {sem}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Select Month
                            </label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                            >
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredCourses.map((course) => {
                        const attendancePercentage = (
                            (course.presentToday / course.enrolledStudents) * 100
                        ).toFixed(1);

                        return (
                            <div
                                key={course.courseCode}
                                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition border border-gray-100"
                            >
                                {/* Course Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {course.courseCode}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">{course.courseName}</p>
                                    </div>
                                    <span
                                        className={`text-xs font-semibold ${getTrendColor(
                                            course.trend
                                        )}`}
                                    >
                                        {getTrendLabel(course.trend)}
                                    </span>
                                </div>

                                {/* Course Info */}
                                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Enrolled</span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {course.enrolledStudents}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Avg. Attendance</span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {course.avgAttendance}%
                                        </span>
                                    </div>
                                </div>

                                {/* Today's Status */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 mb-4">
                                    <p className="text-xs font-semibold text-gray-700 mb-3">
                                        Today's Attendance
                                    </p>
                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                {course.presentToday} Present
                                            </span>
                                            <span className="text-xs text-gray-500 ml-auto font-semibold">
                                                {attendancePercentage}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <XCircle size={16} className="text-red-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                                {course.absentToday} Absent
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-300 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                                            style={{ width: `${attendancePercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-100 transition border border-blue-200">
                                    View Details
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Overall Statistics */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BarChart3 size={24} className="text-blue-600" />
                        Overall Statistics - Semester {selectedSemester}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
                            <p className="text-sm text-gray-600 mb-2">Total Courses</p>
                            <p className="text-3xl font-bold text-blue-700">{filteredCourses.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200">
                            <p className="text-sm text-gray-600 mb-2">Total Enrolled</p>
                            <p className="text-3xl font-bold text-purple-700">
                                {filteredCourses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                            <p className="text-sm text-gray-600 mb-2">Avg. Attendance</p>
                            <p className="text-3xl font-bold text-green-700">
                                {(
                                    filteredCourses.reduce((sum, c) => sum + c.avgAttendance, 0) /
                                    filteredCourses.length
                                ).toFixed(1)}
                                %
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                            <p className="text-sm text-gray-600 mb-2">Present Today</p>
                            <p className="text-3xl font-bold text-green-700">
                                {filteredCourses.reduce((sum, c) => sum + c.presentToday, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceSummary;