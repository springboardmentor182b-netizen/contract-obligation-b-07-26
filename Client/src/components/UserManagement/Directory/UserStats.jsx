import {
  Users,
  CheckCircle2,
  Clock3,
  UserMinus,
  Ban,
  Shield,
} from "lucide-react";

import { useUsers } from "../../../context/UsersContext";

const UserStats = () => {
  const { users } = useUsers();

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active",
      value: users.length,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Pending",
      value: 0,
      icon: Clock3,
      color: "text-yellow-500",
    },
    {
      title: "Inactive",
      value: 0,
      icon: UserMinus,
      color: "text-gray-400",
    },
    {
      title: "Suspended",
      value: 0,
      icon: Ban,
      color: "text-red-500",
    },
    {
      title: "Roles Defined",
      value: 6,
      icon: Shield,
      color: "text-violet-500",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-4">
      {stats.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <card.icon
            className={`${card.color} mb-3`}
            size={22}
          />

          <h2 className="text-3xl font-bold">
            {card.value}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;