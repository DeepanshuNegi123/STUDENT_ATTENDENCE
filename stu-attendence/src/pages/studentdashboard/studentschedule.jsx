import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, AlertCircle } from 'lucide-react';

const StudentSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [view, setView] = useState("week"); // week or month

  // Mock schedule data
  const mockWeeklySchedule = {
    Monday: [
      {
        id: 1,
        time: "10:00 AM - 11:30 AM",
        startTime: "10:00",
        endTime: "11:30",
        subject: "Data Structures",
        code: "CS501",
        teacher: "Dr. Smith",
        classroom: "Block A, Room 101",
        type: "Lecture",
      },
      {
        id: 2,
        time: "1:00 PM - 2:30 PM",
        startTime: "13:00",
        endTime: "14:30",
        subject: "Database Systems",
        code: "CS503",
        teacher: "Dr. Brown",
        classroom: "Block C, Room 310",
        type: "Lecture",
      },
      {
        id: 3,
        time: "3:00 PM - 4:00 PM",
        startTime: "15:00",
        endTime: "16:00",
        subject: "Data Structures Lab",
        code: "CS501L",
        teacher: "Dr. Smith",
        classroom: "Block A, Lab 5",
        type: "Lab",
      },
    ],
    Tuesday: [
      {
        id: 4,
        time: "2:00 PM - 3:30 PM",
        startTime: "14:00",
        endTime: "15:30",
        subject: "Web Development",
        code: "CS502",
        teacher: "Prof. Johnson",
        classroom: "Block B, Room 205",
        type: "Lecture",
      },
      {
        id: 5,
        time: "11:00 AM - 12:30 PM",
        startTime: "11:00",
        endTime: "12:30",
        subject: "System Design",
        code: "CS504",
        teacher: "Prof. Williams",
        classroom: "Block A, Room 202",
        type: "Lecture",
      },
    ],
    Wednesday: [
      {
        id: 6,
        time: "10:00 AM - 11:30 AM",
        startTime: "10:00",
        endTime: "11:30",
        subject: "Data Structures",
        code: "CS501",
        teacher: "Dr. Smith",
        classroom: "Block A, Room 101",
        type: "Lecture",
      },
      {
        id: 7,
        time: "1:00 PM - 2:30 PM",
        startTime: "13:00",
        endTime: "14:30",
        subject: "Database Systems",
        code: "CS503",
        teacher: "Dr. Brown",
        classroom: "Block C, Room 310",
        type: "Lecture",
      },
    ],
    Thursday: [
      {
        id: 8,
        time: "2:00 PM - 3:30 PM",
        startTime: "14:00",
        endTime: "15:30",
        subject: "Web Development",
        code: "CS502",
        teacher: "Prof. Johnson",
        classroom: "Block B, Room 205",
        type: "Lecture",
      },
      {
        id: 9,
        time: "11:00 AM - 12:30 PM",
        startTime: "11:00",
        endTime: "12:30",
        subject: "System Design",
        code: "CS504",
        teacher: "Prof. Williams",
        classroom: "Block A, Room 202",
        type: "Lecture",
      },
    ],
    Friday: [
      {
        id: 10,
        time: "10:00 AM - 11:30 AM",
        startTime: "10:00",
        endTime: "11:30",
        subject: "Data Structures",
        code: "CS501",
        teacher: "Dr. Smith",
        classroom: "Block A, Room 101",
        type: "Lecture",
      },
      {
        id: 11,
        time: "2:00 PM - 4:00 PM",
        startTime: "14:00",
        endTime: "16:00",
        subject: "Web Development Lab",
        code: "CS502L",
        teacher: "Prof. Johnson",
        classroom: "Block B, Lab 3",
        type: "Lab",
      },
    ],
    Saturday: [],
    Sunday: [],
  };

  const mockMonthlyExams = [
    { id: 1, date: "2025-01-15", subject: "Data Structures", code: "CS501", time: "10:00 AM", classroom: "Exam Hall A" },
    { id: 2, date: "2025-01-18", subject: "Web Development", code: "CS502", time: "2:00 PM", classroom: "Exam Hall B" },
    { id: 3, date: "2025-01-20", subject: "Database Systems", code: "CS503", time: "10:00 AM", classroom: "Exam Hall C" },
    { id: 4, date: "2025-01-22", subject: "System Design", code: "CS504", time: "2:00 PM", classroom: "Exam Hall A" },
  ];

  const mockDeadlines = [
    { id: 1, date: "2025-01-14", task: "Data Structures Assignment 3", subject: "CS501", type: "Assignment" },
    { id: 2, date: "2025-01-16", task: "Web Dev Project Milestone", subject: "CS502", type: "Project" },
    { id: 3, date: "2025-01-19", task: "Database Design Report", subject: "CS503", type: "Report" },
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

  const selectedSchedule = mockWeeklySchedule[selectedDay];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const getTypeColor = (type) => {
    if (type === "Lecture") return "bg-blue-100 text-blue-700 border-blue-300";
    if (type === "Lab") return "bg-purple-100 text-purple-700 border-purple-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Class Schedule</h1>
        <p className="text-blue-100">Manage your timetable and important deadlines</p>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg shadow p-4 flex gap-4">
        <button
          onClick={() => setView("week")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            view === "week"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📅 Weekly View
        </button>
        <button
          onClick={() => setView("month")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            view === "month"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          📆 Monthly View
        </button>
      </div>

      {/* Weekly Schedule View */}
      {view === "week" && (
        <div className="space-y-6">
          {/* Day Selector */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Select Day</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-3 rounded-lg font-medium transition ${
                    selectedDay === day
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Day Schedule */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedDay}'s Schedule</h2>

            {selectedSchedule.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 text-lg">No classes scheduled for {selectedDay}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedSchedule.map((session) => (
                  <div
                    key={session.id}
                    className={`border-l-4 p-4 rounded-lg border border-gray-200 hover:shadow-lg transition ${getTypeColor(
                      session.type
                    )}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{session.subject}</h3>
                        <p className="text-sm text-gray-600">{session.code}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
                        {session.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-600" />
                        <span className="text-gray-700">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-600" />
                        <span className="text-gray-700">{session.classroom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-600" />
                        <span className="text-gray-700">{session.teacher}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Monthly View - Exams */}
      {view === "month" && (
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <AlertCircle className="text-red-600" />
              Upcoming Exams
            </h2>
            <div className="space-y-3">
              {mockMonthlyExams.map((exam) => (
                <div key={exam.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-800">{exam.subject}</p>
                      <p className="text-sm text-gray-600">{exam.code}</p>
                    </div>
                    <span className="text-red-600 font-bold">{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {exam.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {exam.classroom}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment Deadlines */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="text-blue-600" />
              Important Deadlines
            </h2>
            <div className="space-y-3">
              {mockDeadlines.map((deadline) => (
                <div key={deadline.id} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{deadline.task}</p>
                      <p className="text-sm text-gray-600">{deadline.subject}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-600 font-bold block">{deadline.date}</span>
                      <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded mt-1 inline-block">
                        {deadline.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Total Classes/Week</p>
          <p className="text-3xl font-bold text-gray-800">
            {Object.values(mockWeeklySchedule).reduce((total, day) => total + day.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-medium">Upcoming Exams</p>
          <p className="text-3xl font-bold text-gray-800">{mockMonthlyExams.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Pending Assignments</p>
          <p className="text-3xl font-bold text-gray-800">{mockDeadlines.length}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;