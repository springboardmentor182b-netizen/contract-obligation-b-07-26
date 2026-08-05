import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/settings/integrations";


const IntegrationsSection = () => {

  const [apps, setApps] = useState([]);

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    fetchIntegrations();

  }, []);




  // GET DATA FROM DATABASE

  const fetchIntegrations = async () => {

    try {

      setLoading(true);

      const response = await fetch(API_URL);

      const data = await response.json();

      setApps(data);

    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };




  // CHANGE CONNECT/DISCONNECT ONLY IN UI

  const toggleConnection = (index) => {

    const updatedApps = [...apps];

    updatedApps[index].connected =
      !updatedApps[index].connected;


    setApps(updatedApps);

  };




  // SAVE CHANGES TO DATABASE

  const handleSave = async () => {

    try {


      setLoading(true);


      for(const app of apps){


        await fetch(`${API_URL}/${app.id}`,{


          method:"PUT",


          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify({

            name: app.name,

            icon: app.icon,

            description: app.description,

            connected: app.connected,

            since: app.since

          })


        });


      }



      alert("Integration settings saved successfully");


    }
    catch(error){

      console.log(error);

      alert("Failed to save settings");

    }
    finally{

      setLoading(false);

    }

  };





  return (

    <div className="space-y-8">


      {/* HEADER */}

      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-3xl font-bold text-[#1F2937]">
            Integrations
          </h1>


          <p className="mt-2 text-gray-500">
            Manage your integrations preferences
          </p>

        </div>



        <button

          onClick={handleSave}

          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937]"

        >

          {loading ? "Saving..." : "Save Changes"}

        </button>



      </div>





      {/* CONNECTED APPLICATIONS */}


      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">


        <div className="border-b px-8 py-6">


          <h2 className="text-2xl font-semibold">

            Connected Applications

          </h2>


          <p className="mt-1 text-gray-500">

            External tools and services integrated with ContractIQ.

          </p>


        </div>





        {apps.map((app,index)=>(


          <div

            key={app.id}

            className="flex items-center justify-between border-b px-8 py-6 last:border-none"

          >



            <div className="flex items-center gap-5">



              {/* ICON */}

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37] text-xl font-bold text-white">

                {app.icon}

              </div>




              <div>


                <h3 className="text-lg font-semibold text-[#1F2937]">

                  {app.name}

                </h3>


                <p className="mt-1 text-sm text-gray-500">

                  {app.description}

                </p>



                {app.connected && (

                  <p className="mt-2 text-sm text-gray-400">

                    Connected since {app.since}

                  </p>

                )}


              </div>



            </div>






            <div className="flex items-center gap-4">



              {app.connected && (

                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">

                  Connected

                </span>

              )}






              <button

                onClick={() => toggleConnection(index)}

                className={

                  app.connected

                  ?

                  "rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"

                  :

                  "rounded-xl bg-[#D4AF37] px-5 py-2 font-semibold text-[#1F2937]"

                }

              >

                {

                app.connected

                ?

                "Disconnect"

                :

                "Connect"

                }

              </button>



            </div>




          </div>



        ))}



      </div>






      {/* API ACCESS */}


      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">


        <div className="border-b px-8 py-6">


          <h2 className="text-2xl font-semibold">

            API Access

          </h2>


          <p className="mt-1 text-gray-500">

            Manage API keys for custom integrations with ContractIQ.

          </p>


        </div>





        <div className="flex items-center justify-between px-8 py-6">


          <div>


            <h3 className="text-lg font-semibold">

              Production Key

            </h3>


            <p className="mt-2 font-mono text-sm">

              ciq_live_••••••••••••4f2a

            </p>


          </div>



          <div className="flex gap-3">


            <button className="rounded-xl border border-[#D4AF37] px-5 py-2 text-[#D4AF37]">

              Rotate

            </button>


            <button className="rounded-xl border border-red-500 px-5 py-2 text-red-500">

              Revoke

            </button>


          </div>


        </div>



      </div>





      {/* GENERATE KEY */}


      <div className="flex justify-end">


        <button

          onClick={() =>
            alert("New API Key generated successfully")
          }

          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold"

        >

          Generate New API Key

        </button>


      </div>



    </div>

  );

};


export default IntegrationsSection;