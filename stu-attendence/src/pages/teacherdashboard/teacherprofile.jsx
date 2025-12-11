import React, { useEffect, useState } from 'react';
import { Edit2, Bell, MessageCircle, Calendar, AlertCircle } from 'lucide-react';



const TeacherProfile = () => {

    // CUSTOMIZABLE: Teacher Data (from teacherSchema)
    const [teacherData, setteacherdata] = useState({
        userId: "user123",
        name: "Sarah Johnson",
        email: "sarah.johnson@school.com",
        phone: "+1 (555) 123-4567",
        department: "English & Literature",
        profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        bio: "Passionate educator with 8+ years of experience in teaching English literature and creative writing.",
        experience: 8,
        qualifications: ["B.A. in English Literature", "M.Ed in Curriculum Design", "TESOL Certification"],
        joinedDate: "January 2023",
    });

    // CUSTOMIZABLE: Teacher Events & News
    const [teacherEvents, setteacherevent] = useState([
        // {
        //     id: 1,
        //     type: "event",
        //     title: "Faculty Development Workshop",
        //     description: "Professional development workshop on innovative teaching methods",
        //     date: "Feb 15, 2024",
        //     time: "10:00 AM - 12:00 PM",
        //     location: "Conference Hall",
        // },
        // {
        //     id: 2,
        //     type: "news",
        //     title: "New Curriculum Update",
        //     description: "Updated curriculum guidelines for Class 9 & 10 have been released",
        //     date: "Feb 10, 2024",
        // },
        // {
        //     id: 3,
        //     type: "event",
        //     title: "Annual Teacher Recognition Ceremony",
        //     description: "Celebrate outstanding achievements and contributions",
        //     date: "Mar 05, 2024",
        //     time: "4:00 PM - 6:00 PM",
        //     location: "Main Auditorium",
        // },
        // {
        //     id: 4,
        //     type: "news",
        //     title: "System Maintenance Notice",
        //     description: "The attendance system will be under maintenance on Feb 12th",
        //     date: "Feb 08, 2024",
        // },
    ]);

    // CUSTOMIZABLE: Important Messages
    const [importantMessages, setimportant] = useState([
        // {
        //     id: 1,
        //     title: "Deadline: Submit Mid-term Grades",
        //     content: "Please submit all mid-term grades by February 20, 2024",
        //     priority: "high",
        //     date: "Feb 08, 2024",
        // },
        // {
        //     id: 2,
        //     title: "Updated Leave Policy",
        //     content: "Review the new leave policy guidelines in the admin portal",
        //     priority: "medium",
        //     date: "Feb 05, 2024",
        // },
    ]);



    // CUSTOMIZABLE: Student Messages
    const [studentMessages, setstudentmesssage] = useState([
        // {
        //     id: 1,
        //     studentName: "Rahul Kumar",
        //     studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
        //     message: "Sir, can I get the assignment extension?",
        //     timestamp: "2 hours ago",
        //     unread: true,
        // },
        // {
        //     id: 2,
        //     studentName: "Priya Singh",
        //     studentImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop",
        //     message: "Thank you for the feedback on my essay!",
        //     timestamp: "5 hours ago",
        //     unread: true,
        // },
        // {
        //     id: 3,
        //     studentName: "Amit Patel",
        //     studentImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        //     message: "I didn't understand the last topic, can you explain?",
        //     timestamp: "1 day ago",
        //     unread: false,
        // },
        // {
        //     id: 4,
        //     studentName: "Neha Sharma",
        //     studentImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop",
        //     message: "When will the test results be announced?",
        //     timestamp: "2 days ago",
        //     unread: false,
        // },
    ]);




    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content Area */}
            <div className="p-4 md:p-8">
                {/* Welcome & Edit Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your professional information</p>
                    </div>
                    <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2">
                        <Edit2 size={18} />
                        Edit Profile
                    </button>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
                            {/* Profile Section */}
                            <div className="text-center mb-6">
                                <img
                                    src={teacherData.profilePicture}
                                    alt={teacherData.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h2 className="text-2xl font-bold text-gray-900">{teacherData.name}</h2>
                                <p className="text-sm text-gray-600">{teacherData.department}</p>
                            </div>

                            {/* Info Details */}
                            <div className="space-y-4 pb-6 border-b">
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide">Email</p>
                                    <p className="text-sm font-medium text-gray-900">{teacherData.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide">Phone</p>
                                    <p className="text-sm font-medium text-gray-900">{teacherData.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide">Experience</p>
                                    <p className="text-sm font-medium text-gray-900">{teacherData.experience} years</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide">Member Since</p>
                                    <p className="text-sm font-medium text-gray-900">{teacherData.joinedDate}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">About</h3>
                                <p className="text-sm text-gray-700 leading-relaxed">{teacherData.bio}</p>
                            </div>
                        </div>
                    </div>

                    {/* Center & Right Column - Content Sections */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Qualifications */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Qualifications</h3>
                            <div className="space-y-3">
                                {teacherData.qualifications.map((qual, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-gray-700">{qual}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Important Messages */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertCircle size={20} className="text-red-600" />
                                Important Messages
                            </h3>
                            <div className="space-y-3">
                                {importantMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`p-4 rounded-lg border-l-4 ${msg.priority === "high"
                                            ? "border-l-red-600 bg-red-50"
                                            : "border-l-yellow-600 bg-yellow-50"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <p className="font-semibold text-gray-900">{msg.title}</p>
                                                <p className="text-sm text-gray-700 mt-1">{msg.content}</p>
                                            </div>
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${msg.priority === "high"
                                                    ? "bg-red-200 text-red-800"
                                                    : "bg-yellow-200 text-yellow-800"
                                                    }`}
                                            >
                                                {msg.priority.charAt(0).toUpperCase() + msg.priority.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">{msg.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Teacher Events & News */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-blue-600" />
                                Events & News
                            </h3>
                            <div className="space-y-3">
                                {teacherEvents.map((item) => (
                                    <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className={`text-xs font-semibold px-2 py-1 rounded uppercase ${item.type === "event"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-purple-100 text-purple-800"
                                                            }`}
                                                    >
                                                        {item.type}

                                                    </span>
                                                </div>
                                                <p className="font-semibold text-gray-900">{item.title}</p>
                                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                                                    <span>{item.date}</span>
                                                    {item.time && <span>{item.time}</span>}
                                                    {item.location && <span>📍 {item.location}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Student Messages */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <MessageCircle size={20} className="text-green-600" />
                                Messages from Students
                            </h3>
                            <div className="space-y-3">
                                {studentMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`p-4 rounded-lg border transition hover:shadow-md cursor-pointer ${msg.unread ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <img
                                                src={msg.studentImage}
                                                alt={msg.studentName}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="font-semibold text-gray-900">{msg.studentName}</p>
                                                    {msg.unread && (
                                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                                                <p className="text-xs text-gray-500 mt-2">{msg.timestamp}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;