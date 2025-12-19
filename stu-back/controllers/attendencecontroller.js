import Attendance from "../models/attendance";

export const markAttendance = async (req, res) => {
  const records = req.body; // array
  await Attendance.insertMany(records);
  res.json({ message: "Attendance saved" });
};
