// pbranch/data/attendanceData.js
export const studentInfo = {
  name: "Aman Sharma",
  rollNumber: "CS-2023-041",
  course: "B.Tech CSE",
  semester: "5th",
  section: "C",
  email: "aman.sharma@college.edu",
  phone: "+91 98765 43210",
};

export const attendanceSummary = {
  overallPercentage: 86,
  totalClasses: 420,
  attendedClasses: 361,
  status: "Good", // "Good" | "Warning" | "Shortage"
};

export const subjectAttendance = [
  { id: 1, subject: "Data Structures & Algorithms", attended: 48, total: 55, code: "CS301" },
  { id: 2, subject: "Operating Systems", attended: 45, total: 55, code: "CS302" },
  { id: 3, subject: "Database Management Systems", attended: 40, total: 50, code: "CS303" },
  { id: 4, subject: "Computer Networks", attended: 35, total: 45, code: "CS304" },
  { id: 5, subject: "Software Engineering", attended: 42, total: 50, code: "CS305" },
  { id: 6, subject: "Web Technologies", attended: 38, total: 45, code: "CS306" },
];

export const recentAttendance = [
  { date: "21 Dec 2025", day: "Sunday", subject: "Data Structures", status: "Present", time: "09:00 AM" },
  { date: "20 Dec 2025", day: "Saturday", subject: "Operating Systems", status: "Present", time: "10:30 AM" },
  { date: "19 Dec 2025", day: "Friday", subject: "DBMS", status: "Absent", time: "02:00 PM" },
  { date: "18 Dec 2025", day: "Thursday", subject: "Computer Networks", status: "Present", time: "11:00 AM" },
  { date: "17 Dec 2025", day: "Wednesday", subject: "Software Engineering", status: "Present", time: "01:30 PM" },
  { date: "16 Dec 2025", day: "Tuesday", subject: "Web Technologies", status: "Absent", time: "03:00 PM" },
];

export const alerts = [
  {
    id: 1,
    type: "danger",
    message: "Computer Networks attendance is below 75%. Immediate action required.",
    time: "10 minutes ago",
    priority: "high",
  },
  {
    id: 2,
    type: "warning",
    message: "DBMS attendance is at 80%. You're approaching the minimum threshold.",
    time: "2 hours ago",
    priority: "medium",
  },
  {
    id: 3,
    type: "info",
    message: "Mid-semester attendance will be locked on 25 Dec 2025.",
    time: "Yesterday",
    priority: "low",
  },
  {
    id: 4,
    type: "info",
    message: "Next class: Data Structures at 9:00 AM tomorrow.",
    time: "Yesterday",
    priority: "low",
  },
];

export const attendanceChartData = subjectAttendance.map((s) => ({
  name: s.subject.split(" ").slice(0, 2).join(" "),
  percentage: Math.round((s.attended / s.total) * 100),
  attended: s.attended,
  total: s.total,
}));

export const monthlyAttendanceTrend = [
  { month: "Aug", percentage: 82 },
  { month: "Sep", percentage: 84 },
  { month: "Oct", percentage: 86 },
  { month: "Nov", percentage: 85 },
  { month: "Dec", percentage: 87 },
];

export const leaveRequests = [
  { id: 1, date: "15 Dec 2025", reason: "Medical Emergency", status: "Approved", duration: "1 day" },
  { id: 2, date: "10 Dec 2025", reason: "Family Function", status: "Approved", duration: "2 days" },
  { id: 3, date: "05 Dec 2025", reason: "Personal Work", status: "Pending", duration: "1 day" },
];
