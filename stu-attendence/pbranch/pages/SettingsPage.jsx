// pbranch/pages/SettingsPage.jsx
import { Bell, Lock, User, Globe } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your preferences and account settings
        </p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Bell size={20} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Notifications</h2>
            <p className="text-xs text-gray-500">Manage notification preferences</p>
          </div>
        </div>

        <div className="space-y-3">
          <ToggleItem label="Email Notifications" description="Receive updates via email" />
          <ToggleItem label="SMS Alerts" description="Get SMS for low attendance" />
          <ToggleItem label="Push Notifications" description="Browser push notifications" />
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <User size={20} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Account</h2>
            <p className="text-xs text-gray-500">Update your account information</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-gray-900">Update Profile</p>
            <p className="text-xs text-gray-500 mt-0.5">Change your personal information</p>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-gray-900">Change Password</p>
            <p className="text-xs text-gray-500 mt-0.5">Update your security credentials</p>
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
            <Globe size={20} className="text-sky-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Appearance</h2>
            <p className="text-xs text-gray-500">Customize your dashboard appearance</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>English</option>
              <option>Hindi</option>
              <option>Punjabi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleItem = ({ label, description }) => (
  <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100">
    <div>
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked />
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
    </label>
  </div>
);

export default SettingsPage;
