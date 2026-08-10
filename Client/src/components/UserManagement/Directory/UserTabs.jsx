import {
  Users,
  Shield,
  KeyRound,
} from "lucide-react";

const tabs = [
  {
    name: "User Directory",
    icon: Users,
  },
  {
    name: "Roles & Access",
    icon: Shield,
  },
  {
    name: "Permission Matrix",
    icon: KeyRound,
  },
];

const UserTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-8 border-b border-gray-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative flex items-center gap-2 pb-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.name
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <Icon size={15} />

            {tab.name}

            {activeTab === tab.name && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#F5A000]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default UserTabs;