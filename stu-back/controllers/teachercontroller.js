import Teacher from "../models/teacher.js";
import User from "../models/user.js";
import SubjectOffering from "../models/subjectoffering.js";
import Enrollment from "../models/enrollment.js";
import Attendance from "../models/attendance.js";
import subjectoffering from "../models/subjectoffering.js";

/**
 * 👨‍🏫 Teacher Profile
 */
export const getTeacherProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const teacher = await Teacher.findOne({ userId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    const user = await User.findById(userId).select("firstName email");

    res.status(200).json({
      success: true,
      profile: {
        name: user.firstName,
        email: user.email,
        department: teacher.department,
        phone: teacher.phone,
        experience: teacher.experience,
        qualifications: teacher.qualifications,
        profileImage: teacher.profilePicture,
        joinedAt: teacher.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 📘 Teacher → Subject Offerings
 */
export const getTeacherOfferings = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const offerings = await SubjectOffering.find({
      teachers: teacherId,
      isActive: true,
    })
      .populate("subject", "code name semester")
      .populate("classes", "classCode branch semester section academicYear");

    res.status(200).json({
      success: true,
      offerings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 👥 Students of an Offering (for attendance)
 */
export const getOfferingStudents = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { offeringId } = req.query;

    if (!offeringId) {
      return res.status(400).json({ message: "offeringId is required" });
    }

    // Ensure teacher is assigned
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

    const enrollments = await Enrollment.find({
      subjectOffering: offeringId,
      isActive: true,
    }).populate({
      path: "student",
      populate: {
        path: "user",
        select: "firstName email",
      },
    });

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


export const markAttendance = async (req , res) =>{



  try {

    const teacherId = req.user.id;
    const {offeringId, date , attendance} = req.body;


    if(!offeringId || !date || !attendance?.length){

return res.status(400).json({
  message:"invalid payload"
});

}

const offering = await SubjectOffering.findOne({
      _id: offeringId,
      teachers: teacherId,
      isActive: true,
    });

   if (!offering) {
      return res.status(403).json({ message: "Unauthorized" });
    }

const records = attendance.map((item)=>({

  subjectofferingId:offeringId,
  studentId:item.studentId,
  date,
  status:item.status,

}));


await Attendance.insertMany(records);

 res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
    });

  }
  catch(error){

     console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};