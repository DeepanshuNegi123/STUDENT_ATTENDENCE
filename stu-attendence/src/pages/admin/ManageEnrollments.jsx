import { useState, useEffect } from "react";
import { Plus, X, Trash2, Users } from "lucide-react";

const ManageEnrollments = () => {
  const [offerings, setOfferings] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [academicYear, setAcademicYear] = useState("2024-25");

  const API_URL = "http://localhost:5008/api/admin";
  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [offeringsRes, studentsRes, enrollmentsRes] = await Promise.all([
        fetch(`${API_URL}/offerings`, { headers: getAuthHeader() }),
        fetch(`${API_URL}/students`, { headers: getAuthHeader() }),
        fetch(`${API_URL}/enrollments`, { headers: getAuthHeader() }),
      ]);

      const offeringsData = await offeringsRes.json();
      const studentsData = await studentsRes.json();
      const enrollmentsData = await enrollmentsRes.json();

      setOfferings(offeringsData.offerings || []);
      setStudents(studentsData.students || []);
      setEnrollments(enrollmentsData.enrollments || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollStudents = async () => {
    if (!selectedOffering) {
      alert("Please select an offering");
      return;
    }
    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/enrollments/bulk`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
          offeringId: selectedOffering,
          studentIds: selectedStudents,
          academicYear,
        }),
      });

      if (!response.ok) throw new Error("Failed to enroll students");

      const data = await response.json();
      alert(data.message || "Students enrolled successfully!");
      setShowModal(false);
      setSelectedOffering(null);
      setSelectedStudents([]);
      fetchData();
    } catch (error) {
      console.error("Error enrolling students:", error);
      alert("Failed to enroll students: " + error.message);
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (window.confirm("Remove this student from the course?")) {
      try {
        const response = await fetch(`${API_URL}/enrollments/${id}`, {
          method: "DELETE",
          headers: getAuthHeader(),
        });

        if (!response.ok) throw new Error("Failed to delete enrollment");
        alert("Student removed successfully!");
        fetchData();
      } catch (error) {
        console.error("Error deleting enrollment:", error);
        alert("Failed to remove student");
      }
    }
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const getOfferingName = (offering) => {
    if (!offering) return "Unknown";
    return `${offering.subject?.code || "?"} - ${offering.classId?.classCode || "?"}`;
  };

  const getStudentName = (enrollment) => {
    return enrollment.student?.userId?.fullName || "Unknown";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Enrollments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Enroll Students
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Reg. Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Academic Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No enrollments found. Enroll students to get started!
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => (
                <tr key={enrollment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {getStudentName(enrollment)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {enrollment.registrationNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {enrollment.subjectOffering?.subject?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {enrollment.subjectOffering?.classId?.classCode || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {enrollment.academicYear}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteEnrollment(enrollment._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users size={24} />
                Enroll Students in Course
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedOffering(null);
                  setSelectedStudents([]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Course Offering *
                </label>
                <select
                  value={selectedOffering || ""}
                  onChange={(e) => setSelectedOffering(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Course</option>
                  {offerings.map((offering) => (
                    <option key={offering._id} value={offering._id}>
                      {getOfferingName(offering)} - Sem {offering.semester}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year *
                </label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="2024-25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Students * ({selectedStudents.length} selected)
                </label>
                <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                  {students.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">No students available</p>
                  ) : (
                    students.map((student) => (
                      <div
                        key={student._id}
                        className="flex items-center p-3 hover:bg-gray-50 border-b last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => toggleStudentSelection(student._id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label className="ml-3 flex-1 cursor-pointer">
                          <span className="text-sm font-medium text-gray-900">
                            {student.userId?.fullName || "Unknown"}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {student.regNumber || "No Reg"}
                          </span>
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOffering(null);
                    setSelectedStudents([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnrollStudents}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Enroll Students
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEnrollments;