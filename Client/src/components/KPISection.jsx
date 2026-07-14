import StatsCard from "./StatsCard";

function KPISection() {

  const stats = [

    {
      title: "Total Contracts",
      value: "247",
      color: "primary",
    },

    {
      title: "Active Contracts",
      value: "189",
      color: "success",
    },

    {
      title: "Pending Approval",
      value: "18",
      color: "warning",
    },

    {
      title: "Compliance",
      value: "94%",
      color: "info",
    },

  ];

  return (

    <div className="row">

      {stats.map((item)=>(

        <div
          className="col-lg-3 col-md-6 mb-4"
          key={item.title}
        >

          <StatsCard
            title={item.title}
            value={item.value}
            color={item.color}
          />

        </div>

      ))}

    </div>

  );

}

export default KPISection;