// Admin Service - All API calls for Admin Dashboard
// Base URL
const API_URL = "http://localhost:5008/api/admin";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ============= TEACHERS =============
export const teacherService = {
  // Create teacher
  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/teachers`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create teacher");
      return await response.json();
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw error;
    }
  },

  // Get all teachers
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/teachers`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();
      // Backend returns: { success: true, count: X, teachers: [...] }
      return data.teachers || [];
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  },

  // Update teacher
  update: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/teachers/${id}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update teacher");
      return await response.json();
    } catch (error) {
      console.error("Error updating teacher:", error);
      throw error;
    }
  },

  // Delete teacher
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/teachers/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to delete teacher");
      return await response.json();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      throw error;
    }
  },
};

// ============= STUDENTS =============
export const studentService = {
  // Create student
  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create student");
      return await response.json();
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  },

  // Get all students
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      // Backend returns: { success: true, count: X, students: [...] }
      return data.students || [];
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  // Assign student to class
  assignToClass: async (studentId, classId) => {
    try {
      const response = await fetch(`${API_URL}/students/assign-class`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify({ studentId, classId }),
      });
      if (!response.ok) throw new Error("Failed to assign student to class");
      return await response.json();
    } catch (error) {
      console.error("Error assigning student to class:", error);
      throw error;
    }
  },
};

// ============= CLASSES =============
export const classService = {
  // Create class
  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/classes`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create class");
      return await response.json();
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  // Get all classes
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/classes`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch classes");
      const data = await response.json();
      // Backend returns: { success: true, count: X, classes: [...] }
      return data.classes || [];
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },
};

// ============= SUBJECTS =============
export const subjectService = {
  // Create subject
  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/subjects`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create subject");
      return await response.json();
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  // Get all subjects
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/subjects`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch subjects");
      const data = await response.json();
      // Backend returns: { success: true, count: X, subjects: [...] }
      return data.subjects || [];
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },
};

// ============= OFFERINGS (Teacher Assignment) =============
export const offeringService = {
  // Create offering (assign teacher to subject+class)
  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/offerings`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create offering");
      return await response.json();
    } catch (error) {
      console.error("Error creating offering:", error);
      throw error;
    }
  },

  // Get all offerings
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/offerings`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch offerings");
      const data = await response.json();
      // Backend returns: { success: true, count: X, offerings: [...] }
      return data.offerings || [];
    } catch (error) {
      console.error("Error fetching offerings:", error);
      throw error;
    }
  },

  // Delete offering
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/offerings/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to delete offering");
      return await response.json();
    } catch (error) {
      console.error("Error deleting offering:", error);
      throw error;
    }
  },
};

// ============= TEACHER ROUTES (For Teacher Dashboard) =============
export const teacherDashboardService = {
  // Get teacher's profile
  getProfile: async () => {
    try {
      const response = await fetch("http://localhost:5008/api/teacher/profile", {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch teacher profile");
      return await response.json();
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
      throw error;
    }
  },

  // Get teacher's offerings (courses)
  getOfferings: async () => {
    try {
      const response = await fetch("http://localhost:5008/api/teacher/offerings", {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch offerings");
      const data = await response.json();
      // Backend returns: { success: true, offerings: [...] }
      return data.offerings || [];
    } catch (error) {
      console.error("Error fetching offerings:", error);
      throw error;
    }
  },

  // Get students for an offering
  getStudents: async (offeringId) => {
    try {
      const response = await fetch(
        `http://localhost:5008/api/teacher/attendance/students?offeringId=${offeringId}`,
        {
          headers: getAuthHeader(),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      // Backend returns: { success: true, totalStudents: X, students: [...] }
      return data.students || [];
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  // Mark attendance
  markAttendance: async (offeringId, date, attendance) => {
    try {
      const response = await fetch("http://localhost:5008/api/teacher/attendance", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
          offeringId,
          date,
          attendance, // Array of { studentId, status }
        }),
      });
      if (!response.ok) throw new Error("Failed to mark attendance");
      return await response.json();
    } catch (error) {
      console.error("Error marking attendance:", error);
      throw error;
    }
  },
};

// ============= ENROLLMENTS =============
export const enrollmentService = {
  // Get all enrollments
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/enrollments`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to fetch enrollments");
      const data = await response.json();
      return data.enrollments || [];
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      throw error;
    }
  },

  // Bulk enroll students
  bulkEnroll: async (offeringId, studentIds, academicYear) => {
    try {
      const response = await fetch(`${API_URL}/enrollments/bulk`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ offeringId, studentIds, academicYear }),
      });
      if (!response.ok) throw new Error("Failed to enroll students");
      return await response.json();
    } catch (error) {
      console.error("Error enrolling students:", error);
      throw error;
    }
  },

  // Delete enrollment
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/enrollments/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      if (!response.ok) throw new Error("Failed to delete enrollment");
      return await response.json();
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      throw error;
    }
  },
};