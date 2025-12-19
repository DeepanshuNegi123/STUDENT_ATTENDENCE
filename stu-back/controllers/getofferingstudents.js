import SubjectOffering from "../models/subjectoffering.js";
import Enrollment from "../models/enrollment.js";

export const getOfferingStudents = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { offeringId } = req.query;

    if (!offeringId) {
      return res.status(400).json({ message: "offeringId is required" });
    }

    // 🔐 Ensure teacher is assigned to this offering
    const offering = await SubjectOffering.findOne({
      _id: offeringId,
      teachers: teacherId,
      isActive: true,
    });

    if (!offering) {
      return res.status(403).json({
        message: "You are not assigned to this subject offering",
      });
    }

    // 📘 Get enrolled students
    const enrollments = await Enrollment.find({
      subjectOffering: offeringId,
      isActive: true,
    })
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "firstName email",
        },
      })
      .select("registrationNumber student");

    // 🧠 Shape data for frontend
    const students = enrollments.map((en) => ({
      enrollmentId: en._id,
      registrationNumber: en.registrationNumber,
      name: en.student.user.firstName,
      email: en.student.user.email,
    }));

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
