// pbranch/components/dashboard/SummaryCards.jsx
import { TrendingUp, CalendarDays, CheckCircle2, BookOpenCheck } from "lucide-react";
import { attendanceSummary } from "../../data/attendanceData";
import StatusBadge from "../common/StatusBadge";

const SummaryCards = () => {
  const { overallPercentage, totalClasses, attendedClasses, status } = attendanceSummary;

  const cards = [
    {
      title: "Overall Attendance",
      value: `${overallPercentage}%`,
      icon: TrendingUp,
      gradient: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50",
      extra: <StatusBadge status={status} />,
    },
    {
      title: "Total Classes",
      value: totalClasses,
      icon: CalendarDays,
      gradient: "from-sky-500 to-sky-600",
      bg: "bg-sky-50",
      extra: <p className="text-xs text-gray-500">This semester</p>,
    },
    {
      title: "Classes Attended",
      value: attendedClasses,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      extra: <p className="text-xs text-gray-500">Present count</p>,
    },
    {
      title: "Classes Missed",
      value: totalClasses - attendedClasses,
      icon: BookOpenCheck,
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      extra: <p className="text-xs text-gray-500">Absent count</p>,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
              {card.title}
            </p>
            <div
              className={`h-10 w-10 rounded-xl ${card.bg} flex items-center justify-center`}
            >
              <card.icon className={`bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`} size={20} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
          <div className="mt-3">{card.extra}</div>
        </div>
      ))}
    </section>
  );
};

export default SummaryCards;
