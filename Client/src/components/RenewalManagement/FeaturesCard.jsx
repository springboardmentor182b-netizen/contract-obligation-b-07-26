const features = [
  {
    title: "Renewal Tracking",
    description: "Track all contract renewals",
    status: "Active",
    color: "bg-blue-500",
  },
  {
    title: "Expiry Monitoring",
    description: "Monitor upcoming expiry dates",
    status: "Enabled",
    color: "bg-green-500",
  },
  {
    title: "Auto Reminders",
    description: "Schedule renewal notifications",
    status: "Running",
    color: "bg-orange-500",
  },
  {
    title: "Approval Workflow",
    description: "Manage renewal approvals",
    status: "Available",
    color: "bg-purple-500",
  },
];


const FeaturesCard = () => {

  return (

    <div
      className="
        h-full
        rounded-xl
        bg-white
        border
        border-gray-200
        p-5
      "
    >


      <div className="mb-4">

        <h2
          className="
            text-lg
            font-semibold
            text-gray-800
          "
        >
          Renewal Features
        </h2>


        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Available renewal management features
        </p>

      </div>




      <div
        className="
          space-y-3
        "
      >

        {
          features.map((feature)=>(


            <div
              key={feature.title}
              className="
                flex
                items-center
                justify-between
                rounded-lg
                border
                border-gray-100
                px-4
                py-3
                transition
                hover:bg-gray-50
              "
            >


              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >


                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-semibold
                    text-white
                    ${feature.color}
                  `}
                >
                  {feature.title.charAt(0)}
                </div>



                <div>

                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                    "
                  >
                    {feature.title}
                  </h3>


                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    {feature.description}
                  </p>


                </div>


              </div>




              <span
                className="
                  rounded-full
                  bg-green-50
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-600
                "
              >
                {feature.status}
              </span>



            </div>


          ))
        }


      </div>


    </div>

  );

};


export default FeaturesCard;