const SidebarItem = ({
  icon: Icon,
  title,
  active,
  badge,
}) => {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />

        <span className="font-medium">
          {title}
        </span>
      </div>

      {badge && (
        <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-white">
          {badge}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;