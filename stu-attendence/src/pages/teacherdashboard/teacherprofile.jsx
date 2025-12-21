import React from 'react';
import { Mail, Phone, BookOpen, Award } from 'lucide-react';
import EditTeacherProfile from '../../components/teachercomponents/editteacherprofile';
import { useEffect, useState } from 'react';
import { fetchTeacherProfile } from "../../services/teacherservices";

const TeacherProfile = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacher, setTeacher] = useState({
    id: '',
    name: 'Loading...',
    title: 'Teacher',
    department: 'N/A',
    email: 'N/A',
    phone: 'N/A',
    profileImage: '',
    bio: 'Loading profile...',
    joinedDate: 'N/A',
    experience: 0,
    qualifications: [],
    courses: [],
    officeHours: 'N/A',
    office: 'N/A'
  });

  useEffect(() => {
    const loadTeacherProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch teacher profile
        const profileData = await fetchTeacherProfile();
        console.log("Profile data:", profileData);

        // Fetch teacher offerings (courses)
        const token = localStorage.getItem("token");
        const offeringsResponse = await fetch(
          "http://localhost:5008/api/teacher/offerings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        let courses = [];
        if (offeringsResponse.ok) {
          const offeringsData = await offeringsResponse.json();
          console.log("Offerings data:", offeringsData);

          if (offeringsData.success && offeringsData.offerings) {
            // Fetch student count for each offering
            courses = await Promise.all(
              offeringsData.offerings.map(async (offering) => {
                try {
                  const studentsResponse = await fetch(
                    `http://localhost:5008/api/teacher/attendance/students?offeringId=${offering._id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  let studentCount = 0;
                  if (studentsResponse.ok) {
                    const studentsData = await studentsResponse.json();
                    studentCount = studentsData.totalStudents || 0;
                  }

                  return {
                    code: offering.subject?.code || "N/A",
                    name: offering.subject?.name || "N/A",
                    students: studentCount,
                  };
                } catch (err) {
                  console.error("Error fetching students for offering:", err);
                  return {
                    code: offering.subject?.code || "N/A",
                    name: offering.subject?.name || "N/A",
                    students: 0,
                  };
                }
              })
            );
          }
        }

        // Update teacher state with backend data
        setTeacher((prev) => ({
          ...prev,
          id: profileData.profile?.id || "",
          name: profileData.profile?.name || "Teacher",
          department: profileData.profile?.department || "N/A",
          email: profileData.profile?.email || "N/A",
          phone: profileData.profile?.phone || "N/A",
          experience: profileData.profile?.experience || 0,
          qualifications: profileData.profile?.qualifications || [],
          joinedDate: profileData.profile?.joinedAt
            ? new Date(profileData.profile.joinedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : "N/A",
          bio: `Experienced teacher with ${
            profileData.profile?.experience || 0
          }+ years of experience in ${profileData.profile?.department || "education"}.`,
          courses: courses,
        }));
      } catch (err) {
        console.error("Failed to load teacher profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadTeacherProfile();
  }, []);

  const handleSave = (updatedData) => {
    setTeacher({ ...teacher, ...updatedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditTeacherProfile
        teacherData={teacher}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded border border-red-200 text-red-700">
          <p className="font-bold">Error Loading Profile</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">Professional Information & Teaching Details</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              ✎ Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-8">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <img
                  src={teacher.profileImage || "https://via.placeholder.com/128"}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                />
                <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                <p className="text-sm font-medium text-blue-600 mt-1">{teacher.title}</p>
                <p className="text-sm text-gray-600 mt-1">{teacher.department}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-600 mb-2">Contact</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={16} className="text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${teacher.email}`} className="text-blue-600 hover:underline">
                        {teacher.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={16} className="text-gray-400 flex-shrink-0" />
                      <a href={`tel:${teacher.phone}`} className="text-blue-600 hover:underline">
                        {teacher.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs uppercase font-semibold text-gray-600 mb-3">Location</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-medium">{teacher.office}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs uppercase font-semibold text-gray-600 mb-3">Office Hours</p>
                  <p className="text-sm text-gray-700">{teacher.officeHours}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-6 py-2 bg-red-600 text-white mt-6 font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Right Content - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white border border-gray-200 p-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">About</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>

              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-600 mb-2">Experience</p>
                  <p className="text-2xl font-bold text-gray-900">{teacher.experience}+ Years</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-gray-600 mb-2">Joined</p>
                  <p className="text-gray-900 font-medium">{teacher.joinedDate}</p>
                </div>
              </div>
            </div>

            {/* Qualifications Section */}
            {teacher.qualifications.length > 0 && (
              <div className="bg-white border border-gray-200 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Award size={20} className="text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Qualifications</h3>
                </div>
                <ul className="space-y-3">
                  {teacher.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Current Courses Section */}
            {teacher.courses.length > 0 && (
              <div className="bg-white border border-gray-200 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={20} className="text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Teaching Courses</h3>
                </div>
                <div className="space-y-3">
                  {teacher.courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200">
                      <div>
                        <p className="font-semibold text-gray-900">{course.code}</p>
                        <p className="text-sm text-gray-600">{course.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Enrolled</p>
                        <p className="text-lg font-bold text-gray-900">{course.students}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistics Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 p-6">
                <p className="text-xs uppercase font-semibold text-gray-600 mb-3">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{teacher.courses.length}</p>
              </div>
              <div className="bg-white border border-gray-200 p-6">
                <p className="text-xs uppercase font-semibold text-gray-600 mb-3">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">
                  {teacher.courses.reduce((sum, course) => sum + course.students, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherProfile;