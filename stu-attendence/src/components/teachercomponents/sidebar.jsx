import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-xl border-r 
      transition-all duration-300 overflow-hidden 
      ${isOpen ? "w-64" : "w-0"}`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex justify-center items-center">
            <FaPenFancy className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Mark It</h1>
            <p className="text-xs text-gray-500">Attendance System</p>
          </div>
        </div>
      </div>

      {/* LINKS */}
      <div className="p-4">
        <Link to="/teacher/dashboard" className="p-2 block hover:bg-gray-100 rounded">
          Dashboard
        </Link>
        <Link to="/teacher/timetable" className="p-2 block hover:bg-gray-100 rounded">Timetable</Link>
        <Link to="markattendence" className="p-2 block hover:bg-gray-100 rounded">Attendence</Link>
        <p className="p-2 hover:bg-gray-100 rounded">Students</p>
      </div>
    </div>
  );
}
