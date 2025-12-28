// pbranch/components/dashboard/AlertsPanel.jsx
import { alerts } from "../../data/attendanceData";
import { AlertTriangle, Info, OctagonAlert } from "lucide-react";

const AlertsPanel = () => {
  const getIcon = (type) => {
    if (type === "danger")
      return <OctagonAlert size={18} className="text-red-600" />;
    if (type === "warning")
      return <AlertTriangle size={18} className="text-amber-600" />;
    return <Info size={18} className="text-sky-600" />;
  };

  const getClasses = (type) => {
    if (type === "danger")
      return "bg-red-50 border-red-200 text-red-900";
    if (type === "warning")
      return "bg-amber-50 border-amber-200 text-amber-900";
    return "bg-sky-50 border-sky-200 text-sky-900";
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">Alerts & Notifications</h3>
        <p className="text-xs text-gray-500 mt-1">
          Important updates and warnings
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${getClasses(
              alert.type
            )}`}
          >
            <span className="mt-0.5 shrink-0">{getIcon(alert.type)}</span>
            <div className="flex-1">
              <p className="font-semibold">{alert.message}</p>
              <p className="text-xs opacity-75 mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlertsPanel;
