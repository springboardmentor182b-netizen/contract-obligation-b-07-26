import {
  User,
  Building2,
  ShieldCheck,
  Bell,
  Plug,
  FileText,
  Scale,
  Palette,
  CreditCard,
  TriangleAlert,
} from "lucide-react";

const menuItems = [
  {
    id: "profile",
    title: "My Profile",
    icon: User,
  },
  {
    id: "organization",
    title: "Organization",
    icon: Building2,
  },
  {
    id: "security",
    title: "Security & Access",
    icon: ShieldCheck,
  },
  {
    id: "notifications",
    title: "Notification Settings",
    icon: Bell,
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: Plug,
  },
  {
    id: "contracts",
    title: "Contract Defaults",
    icon: FileText,
  },
  {
    id: "compliance",
    title: "Compliance Settings",
    icon: Scale,
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
  },
  {
    id: "billing",
    title: "Billing & Plan",
    icon: CreditCard,
  },
  {
    id: "danger",
    title: "Danger Zone",
    icon: TriangleAlert,
  },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 min-h-screen">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-[#1F2937]">
          Settings
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Account & System Preferences
        </p>

      </div>

      <div className="px-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all

              ${
                activeTab === item.id
                  ? "bg-[#D4AF37] text-black font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSidebar;