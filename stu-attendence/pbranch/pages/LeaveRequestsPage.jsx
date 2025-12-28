// // pbranch/pages/LeaveRequestsPage.jsx
// import { leaveRequests } from "../data/attendanceData";
// import { Calendar, FileText } from "lucide-react";

// const LeaveRequestsPage = () => {
//   return (
//     <div className="space-y-5">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Submit and track your leave applications
//         </p>
//       </div>

//       {/* Leave Request Form */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//         <h2 className="text-base font-bold text-gray-900 mb-4">Submit New Request</h2>
        
//         <form className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Reason for Leave
//             </label>
//             <textarea
//               rows="4"
//               placeholder="Enter the reason for your leave request..."
//               className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
//           >
//             Submit Request
//           </button>
//         </form>
//       </div>

//       {/* Past Requests */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//         <h2 className="text-base font-bold text-gray-900 mb-4">Previous Requests</h2>
        
//         <div className="space-y-3">
//           {leaveRequests.map((request) => (
//             <div
//               key={request.id}
//               className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
//                   <Calendar size={18} className="text-indigo-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900">{request.reason}</p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {request.date} • {request.duration}
//                   </p>
//                 </div>
//               </div>
//               <span
//                 className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
//                   request.status === "Approved"
//                     ? "bg-emerald-50 text-emerald-700"
//                     : request.status === "Pending"
//                     ? "bg-amber-50 text-amber-700"
//                     : "bg-red-50 text-red-700"
//                 }`}
//               >
//                 {request.status}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveRequestsPage;

// pbranch/pages/LeaveRequestsPage.jsx
// pbranch/pages/LeaveRequestsPage.jsx
// pbranch/pages/LeaveRequestsPage.jsx
import { useState } from "react";
import { leaveRequests } from "../data/attendanceData";
import { Calendar } from "lucide-react";

const LeaveRequestsPage = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !reason.trim()) {
      alert("Please fill all the fields before submitting.");
      return;
    }

    alert("Your leave request has been submitted!");

    setFromDate("");
    setToDate("");
    setReason("");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Submit and track your leave applications
        </p>
      </div>

      {/* Leave Request Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Submit New Request
        </h2>

        {/* THIS FORM WRAPS THE FIELDS + BUTTON */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Leave
            </label>
            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for your leave request..."
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* SUBMIT BUTTON – should appear right under textarea */}
  <button
  type="submit"
  style={{
    backgroundColor: "#4f46e5",   // indigo
    color: "white",
    padding: "0.5rem 1.25rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
  }}
  className="inline-flex items-center justify-center shadow-sm"
>
  Submit Request
</button>


        </form>
      </div>

      {/* Previous Requests */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Previous Requests
        </h2>

        <div className="space-y-3">
          {leaveRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Calendar size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {request.reason}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {request.date} • {request.duration}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  request.status === "Approved"
                    ? "bg-emerald-50 text-emerald-700"
                    : request.status === "Pending"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {request.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsPage;
