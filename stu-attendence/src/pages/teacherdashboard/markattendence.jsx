import React, { useEffect, useState } from "react";
import { Search, Check, X, AlertCircle, Save, Loader } from "lucide-react";

const MarkAttendancePage = () => {
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [savedMessage, setSavedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Get token from localStorage (set during login)
  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  /* --------------------------------------------------------------------------
     1️⃣ Load teacher offerings on page load
     -------------------------------------------------------------------------- */
  useEffect(() => {
    async function loadOfferings() {
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

        if (data.success && data.offerings.length > 0) {
          setCourseOptions(data.offerings);
          // Auto-select first course
          handleCourseChange(data.offerings[0]);
        } else {
          setError("No courses assigned to you");
        }
      } catch (err) {
        setError(err.message || "Failed to load courses");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadOfferings();
  }, []);

  /* --------------------------------------------------------------------------
     2️⃣ Fetch students when course is selected
     -------------------------------------------------------------------------- */
  const handleCourseChange = async (course) => {
  try {
    setSelectedCourse(course);
    setSearchTerm("");
    setAttendanceData([]);
    setError(null);

    const response = await fetch(
      `http://localhost:5008/api/teacher/attendance/students?offeringId=${course._id}`,
      {
        headers: getAuthHeader(),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch students");
    }

    const data = await response.json();

    if (data.success) {
      if (data.students.length === 0) {
        setError("No students enrolled in this course yet");
        return;
      }

      const preparedData = data.students.map((student) => ({
        enrollmentId: student.enrollmentId,
        studentId: student.studentId, // ← FIXED: Now uses Student._id from backend
        registrationNumber: student.registrationNumber,
        name: student.name,
        email: student.email,
        status: "PRESENT",
        remarks: "",
      }));
      setAttendanceData(preparedData);
    }
  } catch (err) {
    setError(err.message || "Failed to load students");
    console.error("Error loading students:", err);
  }
};

  /* --------------------------------------------------------------------------
     3️⃣ Update individual student status
     -------------------------------------------------------------------------- */
  const handleStatusChange = (enrollmentId, newStatus) => {
    setAttendanceData(
      attendanceData.map((student) =>
        student.enrollmentId === enrollmentId
          ? { ...student, status: newStatus }
          : student
      )
    );
  };

  /* --------------------------------------------------------------------------
     4️⃣ Update remarks
     -------------------------------------------------------------------------- */
  const handleRemarksChange = (enrollmentId, remarks) => {
    setAttendanceData(
      attendanceData.map((student) =>
        student.enrollmentId === enrollmentId
          ? { ...student, remarks }
          : student
      )
    );
  };

  /* --------------------------------------------------------------------------
     5️⃣ Mark all students with same status
     -------------------------------------------------------------------------- */
  const handleMarkAll = (status) => {
    setAttendanceData(
      attendanceData.map((student) => ({ ...student, status }))
    );
  };

  /* --------------------------------------------------------------------------
     6️⃣ Save attendance to backend
     -------------------------------------------------------------------------- */
  const handleSaveAttendance = async () => {
    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    if (attendanceData.length === 0) {
      setError("No students to mark attendance");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload = {
        offeringId: selectedCourse._id,
        date: new Date().toISOString(),
        attendance: attendanceData.map((s) => ({
          studentId: s.studentId,
          status: s.status,
        })),
      };

      const response = await fetch(
        "http://localhost:5008/api/teacher/attendance",
        {
          method: "POST",
          headers: getAuthHeader(),
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save attendance");
      }

      const data = await response.json();

      if (data.success) {
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
        
        // Reset form
        if (courseOptions.length > 0) {
          handleCourseChange(selectedCourse);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to save attendance");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  /* --------------------------------------------------------------------------
     Filters & stats
     -------------------------------------------------------------------------- */
  const filteredStudents = attendanceData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber?.includes(searchTerm);

    const matchesFilter =
      filterStatus === "all" || student.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    PRESENT: attendanceData.filter((s) => s.status === "PRESENT").length,
    ABSENT: attendanceData.filter((s) => s.status === "ABSENT").length,
    LEAVE: attendanceData.filter((s) => s.status === "LEAVE").length,
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={32} />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Mark Attendance
          </h1>
          <p className="text-sm text-gray-600 mt-1">{currentDate}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
            <Check size={18} />
            <span className="text-sm font-medium">
              Attendance recorded successfully!
            </span>
          </div>
        )}

        {/* Course Selection */}
        {courseOptions.length > 0 && (
          <div className="bg-white border border-gray-200 p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Select Course
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {courseOptions.map((course) => (
                <button
                  key={course._id}
                  onClick={() => handleCourseChange(course)}
                  className={`py-3 px-4 font-medium transition text-center text-sm border ${
                    selectedCourse?._id === course._id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold">
                    {course.subject?.code || "N/A"}
                  </div>
                  <div className="text-xs mt-1 opacity-90">
                    {course.subject?.name || "N/A"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        {attendanceData.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard
                label="Present"
                value={stats.PRESENT}
                total={attendanceData.length}
                color="green"
              />
              <StatCard
                label="Absent"
                value={stats.ABSENT}
                total={attendanceData.length}
                color="red"
              />
              <StatCard
                label="On Leave"
                value={stats.LEAVE}
                total={attendanceData.length}
                color="yellow"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 p-6 mb-6">
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleMarkAll("PRESENT")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => handleMarkAll("ABSENT")}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Mark All Absent
                </button>
                <button
                  onClick={() => handleMarkAll("LEAVE")}
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                >
                  Mark All Leave
                </button>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white border border-gray-200 p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by name or registration number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="PRESENT">Present</option>
                  <option value="ABSENT">Absent</option>
                  <option value="LEAVE">Leave</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Reg. No.
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.enrollmentId} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.registrationNumber}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.email}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    student.enrollmentId,
                                    "PRESENT"
                                  )
                                }
                                className={`px-3 py-1 text-xs font-medium rounded transition ${
                                  student.status === "PRESENT"
                                    ? "bg-green-100 text-green-700 border border-green-300"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                <Check size={14} className="inline mr-1" />
                                Present
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    student.enrollmentId,
                                    "ABSENT"
                                  )
                                }
                                className={`px-3 py-1 text-xs font-medium rounded transition ${
                                  student.status === "ABSENT"
                                    ? "bg-red-100 text-red-700 border border-red-300"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                <X size={14} className="inline mr-1" />
                                Absent
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    student.enrollmentId,
                                    "LEAVE"
                                  )
                                }
                                className={`px-3 py-1 text-xs font-medium rounded transition ${
                                  student.status === "LEAVE"
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                Leave
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveAttendance}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {saving ? "Saving..." : "Save Attendance"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, total, color }) => (
  <div className="bg-white border border-gray-200 p-5">
    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
      {label}
    </p>
    <p className={`text-3xl font-semibold text-${color}-600 mt-2`}>
      {value}
    </p>
    <p className="text-xs text-gray-600 mt-1">
      {total ? ((value / total) * 100).toFixed(1) : 0}% of total
    </p>
  </div>
);

export default MarkAttendancePage;