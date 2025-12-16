import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, BarChart3 } from 'lucide-react';

const AttendanceDashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');

    // Mock data for today's lectures
    const todaysLectures = [
        {
            id: 1,
            courseCode: 'CS-301',
            courseName: 'Data Structures',
            semester: '5th',
            startTime: '09:00 AM',
            endTime: '10:30 AM',
            venue: 'Lab A-202',
            enrolledStudents: 68,
            attendanceMarked: false,
        },
        {
            id: 2,
            courseCode: 'CS-304',
            courseName: 'Database Management Systems',
            semester: '5th',
            startTime: '10:45 AM',
            endTime: '12:15 PM',
            venue: 'Classroom B-301',
            enrolledStudents: 65,
            attendanceMarked: true,
        },
        {
            id: 3,
            courseCode: 'CS-305',
            courseName: 'Web Development',
            semester: '5th',
            startTime: '01:00 PM',
            endTime: '02:30 PM',
            venue: 'Lab A-205',
            enrolledStudents: 72,
            attendanceMarked: false,
        },
        {
            id: 4,
            courseCode: 'CS-302',
            courseName: 'Operating Systems',
            semester: '6th',
            startTime: '03:00 PM',
            endTime: '04:30 PM',
            venue: 'Classroom B-202',
            enrolledStudents: 58,
            attendanceMarked: false,
        },
    ];

    const attendanceStats = {
        totalLectures: todaysLectures.length,
        markedLectures: todaysLectures.filter(c => c.attendanceMarked).length,
        pendingLectures: todaysLectures.filter(c => !c.attendanceMarked).length,
        totalEnrolled: todaysLectures.reduce((sum, c) => sum + c.enrolledStudents, 0),
    };

    const getTodayDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    if (currentPage === 'weeklyLectures') {
        return <WeeklyLecturesPage onBack={() => setCurrentPage('dashboard')} />;
    }

    if (currentPage === 'classSummary') {
        return <ClassSummaryPage onBack={() => setCurrentPage('dashboard')} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-4 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Attendance Management</h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Calendar size={18} />
                        {getTodayDate()}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Lectures" value={attendanceStats.totalLectures} color="blue" icon="📚" />
                    <StatCard label="Marked" value={attendanceStats.markedLectures} color="green" icon="✓" />
                    <StatCard label="Pending" value={attendanceStats.pendingLectures} color="orange" icon="⏳" />
                    <StatCard label="Total Enrolled" value={attendanceStats.totalEnrolled} color="purple" icon="👥" />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={() => setCurrentPage('weeklyLectures')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
                    >
                        View Weekly Schedule
                    </button>
                    <button
                        onClick={() => setCurrentPage('classSummary')}
                        className="bg-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition shadow-sm flex items-center gap-2"
                    >
                        <BarChart3 size={18} />
                        Attendance Summary
                    </button>
                </div>

                {/* Today's Lectures */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Lectures</h2>

                    {todaysLectures.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {todaysLectures.map((lecture) => (
                                <LectureCard
                                    key={lecture.id}
                                    lecture={lecture}
                                    onMarkAttendance={() => setCurrentPage(`markAttendance-${lecture.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-8">No lectures scheduled for today</p>
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
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
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

const LectureCard = ({ lecture, onMarkAttendance }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition bg-white flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{lecture.courseCode}</h3>
                        <p className="text-gray-600 font-medium">{lecture.courseName}</p>
                        <p className="text-sm text-gray-500 mt-1">Semester: {lecture.semester}</p>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${lecture.attendanceMarked
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                            }`}
                    >
                        {lecture.attendanceMarked ? 'Marked' : 'Pending'}
                    </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <p className="flex items-center gap-2">
                        <Clock size={16} />
                        {lecture.startTime} - {lecture.endTime}
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin size={16} />
                        {lecture.venue}
                    </p>
                    <p className="flex items-center gap-2">
                        <Users size={16} />
                        {lecture.enrolledStudents} Students
                    </p>
                </div>
            </div>

            <button
                onClick={onMarkAttendance}
                className={`mt-4 md:mt-0 md:ml-4 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap ${lecture.attendanceMarked
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                {lecture.attendanceMarked ? 'View' : 'Mark'} Attendance
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

const WeeklyLecturesPage = ({ onBack }) => {
    const [selectedDay, setSelectedDay] = useState('Monday');

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const weeklySchedule = {
        Monday: [
            { id: 1, courseCode: 'CS-301', courseName: 'Data Structures', semester: '5th', time: '09:00 AM - 10:30 AM', venue: 'Lab A-202', students: 68 },
            { id: 2, courseCode: 'CS-304', courseName: 'DBMS', semester: '5th', time: '10:45 AM - 12:15 PM', venue: 'Classroom B-301', students: 65 },
            { id: 3, courseCode: 'CS-401', courseName: 'AI & ML', semester: '7th', time: '02:00 PM - 03:30 PM', venue: 'Lab A-304', students: 52 },
        ],
        Tuesday: [
            { id: 1, courseCode: 'CS-302', courseName: 'Operating Systems', semester: '6th', time: '09:00 AM - 10:30 AM', venue: 'Classroom B-202', students: 58 },
            { id: 2, courseCode: 'CS-305', courseName: 'Web Development', semester: '5th', time: '10:45 AM - 12:15 PM', venue: 'Lab A-205', students: 72 },
        ],
        Wednesday: [
            { id: 1, courseCode: 'CS-301', courseName: 'Data Structures', semester: '5th', time: '09:00 AM - 10:30 AM', venue: 'Lab A-202', students: 68 },
            { id: 2, courseCode: 'CS-303', courseName: 'Computer Networks', semester: '5th', time: '10:45 AM - 12:15 PM', venue: 'Classroom B-303', students: 61 },
            { id: 3, courseCode: 'CS-402', courseName: 'Cloud Computing', semester: '7th', time: '02:00 PM - 03:30 PM', venue: 'Lab A-301', students: 48 },
        ],
        Thursday: [
            { id: 1, courseCode: 'CS-304', courseName: 'DBMS', semester: '5th', time: '09:00 AM - 10:30 AM', venue: 'Classroom B-301', students: 65 },
            { id: 2, courseCode: 'CS-302', courseName: 'Operating Systems', semester: '6th', time: '11:00 AM - 12:30 PM', venue: 'Classroom B-202', students: 58 },
        ],
        Friday: [
            { id: 1, courseCode: 'CS-305', courseName: 'Web Development', semester: '5th', time: '09:00 AM - 10:30 AM', venue: 'Lab A-205', students: 72 },
            { id: 2, courseCode: 'CS-303', courseName: 'Computer Networks', semester: '5th', time: '10:45 AM - 12:15 PM', venue: 'Classroom B-303', students: 61 },
        ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-4 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="text-blue-600 font-medium mb-4 hover:text-blue-700 flex items-center gap-1"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900">Weekly Lecture Schedule</h1>
                </div>

                {/* Day Selector */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {daysOfWeek.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`py-3 px-2 rounded-lg font-medium transition text-sm md:text-base ${selectedDay === day
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {day.slice(0, 3)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lectures for Selected Day */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedDay}'s Lectures</h2>

                    {weeklySchedule[selectedDay].length > 0 ? (
                        <div className="space-y-4">
                            {weeklySchedule[selectedDay].map((lecture) => (
                                <div key={lecture.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-gray-50">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{lecture.courseCode}</h3>
                                            <p className="text-gray-600 font-medium">{lecture.courseName}</p>
                                            <p className="text-sm text-gray-500 mt-1">Semester: {lecture.semester}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <Clock size={16} />
                                            {lecture.time}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            {lecture.venue}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Users size={16} />
                                            {lecture.students} Enrolled
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-8">No lectures scheduled for {selectedDay}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const ClassSummaryPage = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-4 md:p-8">
                <button
                    onClick={onBack}
                    className="text-blue-600 font-medium mb-4 hover:text-blue-700 flex items-center gap-1"
                >
                    ← Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Summary - Coming Soon</h1>
                <p className="text-gray-600 mt-2">Navigate to the summary page from the dashboard</p>
            </div>
        </div>
    );
};

export default AttendanceDashboard;