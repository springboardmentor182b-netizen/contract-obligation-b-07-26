const statuses = [
  {
    name: "Upcoming",
    completed: 8,
    total: 10,
    color: "bg-yellow-500",
  },
  {
    name: "In Progress",
    completed: 5,
    total: 8,
    color: "bg-blue-500",
  },
  {
    name: "Renewed",
    completed: 15,
    total: 15,
    color: "bg-green-500",
  },
  {
    name: "Expired",
    completed: 2,
    total: 5,
    color: "bg-red-500",
  },
  {
    name: "Cancelled",
    completed: 1,
    total: 3,
    color: "bg-gray-500",
  },
];


const StatusCard = () => {

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
          Renewal Status
        </h2>


        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Current renewal progress
        </p>


      </div>



      <div
        className="
          space-y-4
        "
      >

        {
          statuses.map((item)=>{


            const percentage = Math.round(
              (item.completed / item.total) * 100
            );


            return (

              <div
                key={item.name}
              >


                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >
                    {item.name}
                  </span>


                  <span
                    className="
                      text-xs
                      font-medium
                      text-gray-500
                    "
                  >
                    {percentage}%
                  </span>


                </div>




                <div
                  className="
                    h-2
                    rounded-full
                    bg-gray-100
                    overflow-hidden
                  "
                >

                  <div
                    className={`
                      h-full
                      rounded-full
                      ${item.color}
                    `}
                    style={{
                      width:`${percentage}%`
                    }}
                  />


                </div>


              </div>

            );

          })
        }


      </div>


    </div>

  );

};


export default StatusCard;