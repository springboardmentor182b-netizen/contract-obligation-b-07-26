import { useEffect, useState } from "react";
import { Shield, Smartphone, KeyRound } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/settings/security";

const SecuritySection = () => {

  const [securityId, setSecurityId] = useState(null);

  const [loading, setLoading] = useState(false);


  const [security, setSecurity] = useState({

    currentPassword: "",

    newPassword: "",

    twoFactor: false,

    sessionAlerts: true,

  });


  useEffect(() => {

    fetchSecurity();

  }, []);



  const fetchSecurity = async () => {

    try {

      const response = await fetch(API_URL);

      const data = await response.json();


      if(data.length > 0){

        const item = data[0];


        setSecurityId(item.id);


        setSecurity({

          currentPassword:item.currentPassword || "",

          newPassword:item.newPassword || "",

          twoFactor:item.twoFactor || false,

          sessionAlerts:item.sessionAlerts ?? true,

        });

      }


    } catch(error){

      console.log(error);

    }

  };




  const handleChange=(e)=>{

    setSecurity({

      ...security,

      [e.target.name]:e.target.value

    });

  };




  const handleSave=async()=>{


    try{


      setLoading(true);


      const method = securityId ? "PUT" : "POST";


      const url = securityId
      ? `${API_URL}/${securityId}`
      : API_URL;



      const response = await fetch(url,{

        method,

        headers:{

          "Content-Type":"application/json"

        },


        body:JSON.stringify(security)

      });



      const data=await response.json();



      if(!securityId){

        setSecurityId(data.id);

      }


      alert("Security settings saved successfully");


    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }


  };




return (

<div className="space-y-8">


{/* Header */}

<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-[#1F2937]">

Security & Access

</h1>


<p className="text-gray-500 mt-2">

Manage your security settings

</p>


</div>



<button

onClick={handleSave}

className="bg-[#D4AF37] px-6 py-3 rounded-xl font-semibold"

>

{loading ? "Saving..." : "Save Changes"}

</button>


</div>




{/* Password */}


<div className="bg-white rounded-2xl shadow border p-8">


<div className="flex items-center gap-3 mb-6">


<Shield className="text-[#D4AF37]"/>


<h2 className="text-2xl font-semibold">

Password

</h2>


</div>




<label className="block mb-2 font-medium">

Current Password

</label>


<input

type="password"

name="currentPassword"

value={security.currentPassword}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3 mb-5"

/>




<label className="block mb-2 font-medium">

New Password

</label>


<input

type="password"

name="newPassword"

value={security.newPassword}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3 mb-5"

/>




<label className="block mb-2 font-medium">

Confirm Password

</label>


<input

type="password"

className="w-full border rounded-xl px-4 py-3"

/>



</div>





{/* Two Factor */}


<div className="bg-white rounded-2xl shadow border p-8">


<div className="flex justify-between items-center">


<div className="flex gap-3">


<Smartphone className="text-[#D4AF37]"/>


<div>


<h2 className="text-xl font-semibold">

Two-Factor Authentication

</h2>


<p className="text-gray-500">

Add extra protection to your account

</p>


</div>


</div>



<button

onClick={()=>setSecurity({

...security,

twoFactor:!security.twoFactor

})}


className={`px-5 py-2 rounded-xl ${
security.twoFactor
?"bg-[#D4AF37]"
:"bg-gray-300"
}`}

>

{security.twoFactor ? "Enabled":"Disabled"}

</button>



</div>


</div>





{/* Session Alerts */}



<div className="bg-white rounded-2xl shadow border p-8">


<div className="flex justify-between items-center">


<div>


<h2 className="text-xl font-semibold">

Session Alerts

</h2>


<p className="text-gray-500">

Email me when a new session starts

</p>


</div>




<button

onClick={()=>setSecurity({

...security,

sessionAlerts:!security.sessionAlerts

})}


className={`h-7 w-14 rounded-full ${
security.sessionAlerts
?"bg-[#D4AF37]"
:"bg-gray-300"
}`}

>


<span className="block bg-white w-5 h-5 rounded-full ml-1"></span>


</button>


</div>


</div>





{/* Backup Codes */}


<div className="bg-white rounded-2xl shadow border p-8 flex justify-between">


<div className="flex gap-3">


<KeyRound className="text-[#D4AF37]"/>


<div>

<h2 className="text-xl font-semibold">

Backup Codes

</h2>


<p className="text-gray-500">

Generate recovery codes

</p>


</div>


</div>



<button className="border border-[#D4AF37] px-5 py-2 rounded-xl">

Generate

</button>


</div>




</div>

);


};


export default SecuritySection;