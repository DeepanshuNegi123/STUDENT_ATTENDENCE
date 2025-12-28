// pbranch/pages/NotificationsPage.jsx
import AlertsPanel from "../components/dashboard/AlertsPanel";

const NotificationsPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications & Alerts</h1>
        <p className="text-sm text-gray-500 mt-1">
          All important updates and warnings
        </p>
      </div>

      <AlertsPanel />
    </div>
  );
};

export default NotificationsPage;
