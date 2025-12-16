import React, { useState } from 'react';
import { Calendar, List, Grid, ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';

// ============================================================================
// MOCK DATA - Replace with backend API calls later
// ============================================================================

const MOCK_SCHEDULE = {
    // Format: 'YYYY-MM-DD': [array of classes]
    '2024-12-09': [ // Monday
        {
            id: 1,
            courseCode: 'CS-301',
            courseName: 'Data Structures and Algorithms',
            startTime: '09:00',
            endTime: '10:30',
            classroom: 'Lab A-202',
            building: 'Computer Science Block',
            instructor: 'Dr. Sarah Johnson',
            enrolled: 68,
            color: 'blue'
        },
        {
            id: 5,
            courseCode: 'CS-302',
            courseName: 'Operating Systems',
            startTime: '14:00',
            endTime: '15:30',
            classroom: 'Lab A-203',
            building: 'Computer Science Block',
            instructor: 'Dr. Michael Chen',
            enrolled: 55,
            color: 'purple'
        }
    ],
    '2024-12-10': [ // Tuesday
        {
            id: 2,
            courseCode: 'CS-305',
            courseName: 'Web Development',
            startTime: '10:45',
            endTime: '12:15',
            classroom: 'Classroom B-301',
            building: 'Main Academic Block',
            instructor: 'Dr. Sarah Johnson',
            enrolled: 72,
            color: 'green'
        },
        {
            id: 6,
            courseCode: 'CS-306',
            courseName: 'Software Engineering',
            startTime: '15:45',
            endTime: '17:15',
            classroom: 'Classroom B-302',
            building: 'Main Academic Block',
            instructor: 'Dr. Emily Rodriguez',
            enrolled: 60,
            color: 'orange'
        }
    ],
    '2024-12-11': [ // Wednesday
        {
            id: 3,
            courseCode: 'CS-304',
            courseName: 'Database Management Systems',
            startTime: '13:00',
            endTime: '14:30',
            classroom: 'Lab A-205',
            building: 'Computer Science Block',
            instructor: 'Dr. James Wilson',
            enrolled: 65,
            color: 'red'
        }
    ],
    '2024-12-12': [ // Thursday (Today)
        {
            id: 1,
            courseCode: 'CS-301',
            courseName: 'Data Structures and Algorithms',
            startTime: '09:00',
            endTime: '10:30',
            classroom: 'Lab A-202',
            building: 'Computer Science Block',
            instructor: 'Dr. Sarah Johnson',
            enrolled: 68,
            color: 'blue'
        },
        {
            id: 2,
            courseCode: 'CS-305',
            courseName: 'Web Development',
            startTime: '10:45',
            endTime: '12:15',
            classroom: 'Classroom B-301',
            building: 'Main Academic Block',
            instructor: 'Dr. Sarah Johnson',
            enrolled: 72,
            color: 'green'
        },
        {
            id: 3,
            courseCode: 'CS-304',
            courseName: 'Database Management Systems',
            startTime: '13:00',
            endTime: '14:30',
            classroom: 'Lab A-205',
            building: 'Computer Science Block',
            instructor: 'Dr. James Wilson',
            enrolled: 65,
            color: 'red'
        },
        {
            id: 4,
            courseCode: 'CS-303',
            courseName: 'Computer Networks',
            startTime: '14:45',
            endTime: '16:15',
            classroom: 'Classroom C-102',
            building: 'Main Academic Block',
            instructor: 'Dr. Robert Taylor',
            enrolled: 58,
            color: 'yellow'
        }
    ],
    '2024-12-13': [ // Friday
        {
            id: 7,
            courseCode: 'CS-307',
            courseName: 'Artificial Intelligence',
            startTime: '11:00',
            endTime: '12:30',
            classroom: 'Lab A-201',
            building: 'Computer Science Block',
            instructor: 'Dr. Lisa Anderson',
            enrolled: 50,
            color: 'indigo'
        }
    ]
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Get classes for a specific date
const getClassesForDate = (dateStr) => {
    return MOCK_SCHEDULE[dateStr] || [];
};

// Format date to YYYY-MM-DD
const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Get current time status for a class
const getClassStatus = (startTime, endTime, classDate) => {
    const now = new Date();
    const today = formatDateKey(now);

    if (classDate !== today) {
        return classDate < today ? 'completed' : 'upcoming';
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (currentMinutes < startMinutes) return 'upcoming';
    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) return 'ongoing';
    return 'completed';
};

// Get week dates starting from Monday
const getWeekDates = (date) => {
    const current = new Date(date);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    const monday = new Date(current.setDate(diff));

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDates.push(date);
    }
    return weekDates;
};

// ============================================================================
// PAGE 1: WEEKLY VIEW (Main Timeline View)
// ============================================================================

const WeeklyView = ({ onSelectDay, onSelectClass }) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const weekDates = getWeekDates(currentWeek);
    const today = formatDateKey(new Date());

    // Navigate to previous week
    const handlePrevWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeek(newDate);
    };

    // Navigate to next week
    const handleNextWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeek(newDate);
    };

    // Go to current week
    const handleToday = () => {
        setCurrentWeek(new Date());
    };

    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Get color classes for course cards
    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
            green: 'bg-green-100 border-green-300 hover:bg-green-200',
            red: 'bg-red-100 border-red-300 hover:bg-red-200',
            yellow: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200',
            purple: 'bg-purple-100 border-purple-300 hover:bg-purple-200',
            orange: 'bg-orange-100 border-orange-300 hover:bg-orange-200',
            indigo: 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200'
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header with Navigation */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Weekly Schedule</h1>

                    <div className="flex items-center justify-between bg-white border border-gray-200 p-4">
                        <button
                            onClick={handlePrevWeek}
                            className="p-2 hover:bg-gray-100 transition"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="text-center">
                            <p className="text-lg font-semibold text-gray-900">
                                {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                            <p className="text-sm text-gray-600">
                                {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleToday}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Today
                            </button>
                            <button
                                onClick={handleNextWeek}
                                className="p-2 hover:bg-gray-100 transition"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Week Grid */}
                <div className="grid grid-cols-7 gap-3">
                    {weekDates.map((date, index) => {
                        const dateKey = formatDateKey(date);
                        const classes = getClassesForDate(dateKey);
                        const isToday = dateKey === today;

                        return (
                            <div key={index} className="min-h-[300px]">
                                {/* Day Header */}
                                <div
                                    onClick={() => onSelectDay(date)}
                                    className={`p-3 mb-2 cursor-pointer transition ${isToday
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <p className={`text-xs font-medium uppercase ${isToday ? 'text-blue-100' : 'text-gray-600'}`}>
                                        {dayNames[index]}
                                    </p>
                                    <p className={`text-xl font-bold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                                        {date.getDate()}
                                    </p>
                                    {classes.length > 0 && (
                                        <p className={`text-xs mt-1 ${isToday ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {classes.length} {classes.length === 1 ? 'class' : 'classes'}
                                        </p>
                                    )}
                                </div>

                                {/* Classes List */}
                                <div className="space-y-2">
                                    {classes.length === 0 ? (
                                        <div className="bg-white border border-gray-200 p-3 text-center">
                                            <p className="text-xs text-gray-400">No classes</p>
                                        </div>
                                    ) : (
                                        classes.map((classItem) => (
                                            <button
                                                key={classItem.id}
                                                onClick={() => onSelectClass(classItem)}
                                                className={`w-full text-left p-3 border-l-4 transition ${getColorClasses(classItem.color)}`}
                                            >
                                                <p className="text-xs font-bold text-gray-900 mb-1">
                                                    {classItem.courseCode}
                                                </p>
                                                <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                                                    {classItem.courseName}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{classItem.startTime}</span>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// PAGE 2: DAILY VIEW (Detailed Single Day Timeline)
// ============================================================================

const DailyView = ({ selectedDate, onBack, onSelectClass }) => {
    const dateKey = formatDateKey(selectedDate);
    const classes = getClassesForDate(dateKey);
    const today = formatDateKey(new Date());
    const isToday = dateKey === today;

    // Sort classes by start time
    const sortedClasses = [...classes].sort((a, b) => {
        const aTime = parseInt(a.startTime.replace(':', ''));
        const bTime = parseInt(b.startTime.replace(':', ''));
        return aTime - bTime;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mb-6 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    ← Back to Weekly View
                </button>

                {/* Date Header */}
                <div className="bg-white border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                            </h1>
                            <p className="text-lg text-gray-600 mt-1">
                                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                        {isToday && (
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium">
                                TODAY
                            </span>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Total Classes: <span className="font-semibold text-gray-900">{classes.length}</span>
                        </p>
                    </div>
                </div>

                {/* Classes Timeline */}
                {sortedClasses.length === 0 ? (
                    <div className="bg-white border border-gray-200 p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">No Classes Scheduled</p>
                        <p className="text-sm text-gray-600">Enjoy your free day!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedClasses.map((classItem, index) => {
                            const status = getClassStatus(classItem.startTime, classItem.endTime, dateKey);

                            return (
                                <button
                                    key={index}
                                    onClick={() => onSelectClass(classItem)}
                                    className="w-full bg-white border border-gray-200 p-6 hover:shadow-lg transition text-left"
                                >
                                    {/* Status Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{classItem.courseCode}</h3>
                                            <p className="text-sm text-gray-700 mt-1">{classItem.courseName}</p>
                                        </div>
                                        {status === 'ongoing' && (
                                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium">
                                                IN PROGRESS
                                            </span>
                                        )}
                                        {status === 'completed' && (
                                            <span className="px-3 py-1 bg-gray-600 text-white text-xs font-medium">
                                                COMPLETED
                                            </span>
                                        )}
                                        {status === 'upcoming' && (
                                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium">
                                                UPCOMING
                                            </span>
                                        )}
                                    </div>

                                    {/* Class Details */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">Time:</span>
                                            <span className="text-gray-900 font-medium">
                                                {classItem.startTime} - {classItem.endTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">Room:</span>
                                            <span className="text-gray-900 font-medium">{classItem.classroom}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">Students:</span>
                                            <span className="text-gray-900 font-medium">{classItem.enrolled}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">Building:</span>
                                            <span className="text-gray-900 font-medium">{classItem.building}</span>
                                        </div>
                                    </div>

                                    {/* Instructor */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-600">
                                            Instructor: <span className="text-gray-900 font-medium">{classItem.instructor}</span>
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================================================
// PAGE 3: MONTHLY CALENDAR VIEW
// ============================================================================

const MonthlyView = ({ onSelectDay, onSelectClass }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
            days.push(null);
        }

        // Add all days in month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleToday = () => {
        setCurrentMonth(new Date());
    };

    const days = getDaysInMonth(currentMonth);
    const today = formatDateKey(new Date());

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Monthly Calendar</h1>

                    <div className="flex items-center justify-between bg-white border border-gray-200 p-4">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 transition">
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="text-center">
                            <p className="text-xl font-bold text-gray-900">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleToday}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Today
                            </button>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 transition">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white border border-gray-200">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 border-b border-gray-200">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="p-3 text-center font-semibold text-gray-700 text-sm uppercase tracking-wide border-r border-gray-200 last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7">
                        {days.map((day, index) => {
                            if (!day) {
                                return <div key={index} className="h-32 bg-gray-50 border-r border-b border-gray-200" />;
                            }

                            const dateKey = formatDateKey(day);
                            const classes = getClassesForDate(dateKey);
                            const isToday = dateKey === today;

                            return (
                                <button
                                    key={index}
                                    onClick={() => onSelectDay(day)}
                                    className={`h-32 p-2 border-r border-b border-gray-200 hover:bg-gray-50 transition text-left ${isToday ? 'bg-blue-50' : ''
                                        }`}
                                >
                                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'
                                        }`}>
                                        {day.getDate()}
                                    </div>

                                    {classes.length > 0 && (
                                        <div className="space-y-1">
                                            {classes.slice(0, 2).map((classItem, i) => (
                                                <div
                                                    key={i}
                                                    className="text-xs p-1 bg-blue-100 text-blue-800 truncate"
                                                >
                                                    {classItem.courseCode}
                                                </div>
                                            ))}
                                            {classes.length > 2 && (
                                                <div className="text-xs text-gray-600 pl-1">
                                                    +{classes.length - 2} more
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// PAGE 4: LIST VIEW (All Classes)
// ============================================================================

const ListView = ({ onSelectClass }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDay, setFilterDay] = useState('all');

    // Get all classes from all dates
    const getAllClasses = () => {
        const allClasses = [];
        Object.entries(MOCK_SCHEDULE).forEach(([dateKey, classes]) => {
            const date = new Date(dateKey);
            classes.forEach(classItem => {
                allClasses.push({
                    ...classItem,
                    date: date,
                    dateKey: dateKey,
                    dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
                });
            });
        });
        return allClasses.sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey));
    };

    const allClasses = getAllClasses();

    // Filter classes
    const filteredClasses = allClasses.filter(classItem => {
        const matchesSearch =
            classItem.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            classItem.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDay = filterDay === 'all' || classItem.dayName === filterDay;

        return matchesSearch && matchesDay;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">All Classes</h1>

                    {/* Filters */}
                    <div className="bg-white border border-gray-200 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search by course code, name, or instructor..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                            />

                            {/* Day Filter */}
                            <select
                                value={filterDay}
                                onChange={(e) => setFilterDay(e.target.value)}
                                className="px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Days</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {filteredClasses.length} of {allClasses.length} classes
                    </p>
                </div>

                {/* Classes List */}
                {filteredClasses.length === 0 ? (
                    <div className="bg-white border border-gray-200 p-12 text-center">
                        <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">No Classes Found</p>
                        <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredClasses.map((classItem, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectClass(classItem)}
                                className="w-full bg-white border border-gray-200 p-5 hover:shadow-lg transition text-left"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{classItem.courseCode}</h3>
                                        <p className="text-sm text-gray-700 mt-1">{classItem.courseName}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                                        {classItem.dayName}
                                    </span>
                                </div>

                                <div className="grid grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Date</p>
                                        <p className="text-gray-900 font-medium">
                                            {classItem.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Time</p>
                                        <p className="text-gray-900 font-medium">
                                            {classItem.startTime} - {classItem.endTime}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Room</p>
                                        <p className="text-gray-900 font-medium">{classItem.classroom}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Instructor</p>
                                        <p className="text-gray-900 font-medium">{classItem.instructor}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================================================
// COURSE DETAILS PAGE (Detailed Course Information)
// ============================================================================

const CourseDetails = ({ course, onBack }) => {
    // Mock detailed course data
    const courseData = {
        'CS-301': {
            fullName: 'Data Structures and Algorithms',
            credits: 4,
            semester: 'Fall 2024',
            description: 'This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, graphs, and hash tables. Students will learn algorithm analysis, sorting and searching algorithms.',
            learningOutcomes: [
                'Understand and implement fundamental data structures',
                'Analyze time and space complexity of algorithms',
                'Design efficient algorithms for problem-solving',
                'Apply appropriate data structures to real-world scenarios',
            ],
            prerequisites: 'CS-201: Introduction to Programming',
        },
        'CS-305': {
            fullName: 'Web Development',
            credits: 3,
            semester: 'Fall 2024',
            description: 'Comprehensive course covering modern web development technologies including HTML5, CSS3, JavaScript, React, Node.js, and database integration.',
            learningOutcomes: [
                'Develop responsive web interfaces using HTML, CSS, and JavaScript',
                'Build dynamic web applications using React framework',
                'Implement server-side logic using Node.js and Express',
                'Integrate databases and APIs in web applications',
            ],
            prerequisites: 'CS-201: Introduction to Programming',
        }
    };

    const data = courseData[course.courseCode] || courseData['CS-301'];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mb-6 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    ← Back
                </button>

                {/* Course Header */}
                <div className="bg-white border border-gray-200 p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{course.courseCode}</h1>
                    <p className="text-lg text-gray-700 mt-2">{data.fullName}</p>
                    <div className="mt-4 flex gap-6 text-sm">
                        <div>
                            <span className="text-gray-600">Credits:</span>
                            <span className="ml-2 font-semibold text-gray-900">{data.credits}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">Semester:</span>
                            <span className="ml-2 font-semibold text-gray-900">{data.semester}</span>
                        </div>
                    </div>
                </div>

                {/* Current Class Info */}
                <div className="bg-white border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        Class Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Time</p>
                            <p className="text-gray-900 font-medium mt-1">
                                {course.startTime} - {course.endTime}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Classroom</p>
                            <p className="text-gray-900 font-medium mt-1">{course.classroom}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Building</p>
                            <p className="text-gray-900 font-medium mt-1">{course.building}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Enrolled Students</p>
                            <p className="text-gray-900 font-medium mt-1">{course.enrolled}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Instructor</p>
                            <p className="text-gray-900 font-medium mt-1">{course.instructor}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        Course Description
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
                </div>

                {/* Learning Outcomes */}
                <div className="bg-white border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        Learning Outcomes
                    </h2>
                    <ul className="space-y-2">
                        {data.learningOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start text-sm">
                                <span className="text-blue-600 mr-2 mt-0.5">•</span>
                                <span className="text-gray-700">{outcome}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Prerequisites */}
                <div className="bg-white border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        Prerequisites
                    </h2>
                    <p className="text-sm text-gray-700">{data.prerequisites}</p>
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN APP COMPONENT (Navigation & State Management)
// ============================================================================

const TimetableApp = () => {
    // Navigation state: 'weekly' | 'daily' | 'monthly' | 'list' | 'course'
    const [currentView, setCurrentView] = useState('weekly');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Handle day selection - navigate to daily view
    const handleSelectDay = (date) => {
        setSelectedDate(date);
        setCurrentView('daily');
    };

    // Handle class selection - navigate to course details
    const handleSelectClass = (classItem) => {
        setSelectedCourse(classItem);
        setCurrentView('course');
    };

    // Handle back navigation
    const handleBack = () => {
        if (currentView === 'course') {
            setCurrentView('weekly');
            setSelectedCourse(null);
        } else if (currentView === 'daily') {
            setCurrentView('weekly');
            setSelectedDate(null);
        }
    };

    return (
        <div>
            {/* Navigation Bar */}
            {currentView !== 'course' && currentView !== 'daily' && (
                <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex gap-2 py-3">
                            <button
                                onClick={() => setCurrentView('weekly')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${currentView === 'weekly'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                            >
                                <Grid className="w-4 h-4" />
                                Weekly View
                            </button>

                            <button
                                onClick={() => setCurrentView('monthly')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${currentView === 'monthly'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                Monthly Calendar
                            </button>

                            <button
                                onClick={() => setCurrentView('list')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${currentView === 'list'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                All Classes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render Current View */}
            {currentView === 'weekly' && (
                <WeeklyView
                    onSelectDay={handleSelectDay}
                    onSelectClass={handleSelectClass}
                />
            )}

            {currentView === 'daily' && selectedDate && (
                <DailyView
                    selectedDate={selectedDate}
                    onBack={handleBack}
                    onSelectClass={handleSelectClass}
                />
            )}

            {currentView === 'monthly' && (
                <MonthlyView
                    onSelectDay={handleSelectDay}
                    onSelectClass={handleSelectClass}
                />
            )}

            {currentView === 'list' && (
                <ListView onSelectClass={handleSelectClass} />
            )}

            {currentView === 'course' && selectedCourse && (
                <CourseDetails
                    course={selectedCourse}
                    onBack={handleBack}
                />
            )}
        </div>
    );
};

export default TimetableApp;