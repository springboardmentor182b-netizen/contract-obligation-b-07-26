import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";


const StatsCards = ({ renewals = [] }) => {

  const totalRenewals = renewals.length;


  const completedRenewals = renewals.filter(
    (item) =>
      item.renewal_status?.toLowerCase() === "completed"
  ).length;


  const pendingRenewals = renewals.filter(
    (item) =>
      item.renewal_status?.toLowerCase() === "pending"
  ).length;


  const overdueRenewals = renewals.filter((item) => {

    if (!item.renewal_date) return false;

    return (
      new Date(item.renewal_date) < new Date() &&
      item.renewal_status?.toLowerCase() !== "completed"
    );

  }).length;



  const cards = [

    {
      title: "Total Renewals",
      value: totalRenewals,
      icon: FileText,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },


    {
      title: "Completed",
      value: completedRenewals,
      icon: CheckCircle,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },


    {
      title: "Pending",
      value: pendingRenewals,
      icon: Clock,
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },


    {
      title: "Overdue",
      value: overdueRenewals,
      icon: AlertTriangle,
      bg: "bg-red-100",
      iconColor: "text-red-600",
    },

  ];



  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4
        w-full
      "
    >

      {cards.map((card) => {

        const Icon = card.icon;


        return (

          <div
            key={card.title}
            className="
              bg-white
              rounded-xl
              border
              border-gray-200
              p-4
              min-h-[120px]
              flex
              items-center
              justify-between
              shadow-sm
              hover:shadow-md
              transition
            "
          >


            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                  font-medium
                "
              >
                {card.title}
              </p>


              <h2
                className="
                  text-3xl
                  font-bold
                  text-gray-800
                  mt-2
                "
              >
                {card.value}
              </h2>


            </div>



            <div
              className={`
                ${card.bg}
                rounded-full
                p-3
              `}
            >

              <Icon
                className={`
                  w-6
                  h-6
                  ${card.iconColor}
                `}
              />

            </div>


          </div>

        );

      })}


    </div>

  );

};


export default StatsCards;