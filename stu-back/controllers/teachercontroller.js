import Teacher from "../models/teacher.js";
import User from "../models/user.js";

export const getTeacherProfile = async (req, res) => {
    try {
        const userId = req.user.id; // from JWT

        const teacher = await Teacher.findOne({ userId });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher profile not found" });
        }

        const user = await User.findById(userId).select("firstName email");

        res.status(200).json({
            success: true,
            teacher: {
                name: user.firstName,
                email: user.email,
                department: teacher.department,
                phone: teacher.phone,
                bio: teacher.bio,
                experience: teacher.experience,
                qualifications: teacher.qualifications,
                profileImage: teacher.profilePicture,
                joinedDate: teacher.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
