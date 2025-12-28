// pbranch/components/common/StatusBadge.jsx
const statusConfig = {
  Good: {
    label: "Good Standing",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Warning: {
    label: "Warning",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Shortage: {
    label: "Shortage",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.Good;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
};

export default StatusBadge;
