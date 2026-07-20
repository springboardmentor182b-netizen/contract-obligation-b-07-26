import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/RenewalManagement/Header";
import StatsCards from "../components/RenewalManagement/StatsCards";
import SearchBar from "../components/RenewalManagement/SearchBar";
import RenewalTable from "../components/RenewalManagement/RenewalTable";
import FeaturesCard from "../components/RenewalManagement/FeaturesCard";
import StatusCard from "../components/RenewalManagement/StatusCard";
import AddRenewalModal from "../components/RenewalManagement/AddRenewalModal";


const API_URL = "http://127.0.0.1:8000/renewals/";


const RenewalManagement = () => {

  const [renewals, setRenewals] = useState([]);
  const [filteredRenewals, setFilteredRenewals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);



  const fetchRenewals = async () => {

    try {

      setLoading(true);

      const response = await fetch(API_URL);


      if (!response.ok) {
        throw new Error("Failed to fetch renewals");
      }


      const data = await response.json();


      setRenewals(data);
      setFilteredRenewals(data);


    } catch(error) {

      console.error(
        "Fetch Renewal Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchRenewals();

  }, []);




  const handleSearch = (value) => {


    if (!value) {

      setFilteredRenewals(renewals);

      return;

    }


    const searchText =
      value.toLowerCase();



    const result = renewals.filter((item) =>

      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchText)

    );


    setFilteredRenewals(result);

  };




  return (

    <motion.div

      className="
        w-full
        px-5
        py-4
        space-y-5
      "


      initial={{
        opacity:0,
        y:15
      }}


      animate={{
        opacity:1,
        y:0
      }}


      transition={{
        duration:0.3
      }}

    >


      {/* Header */}

      <div className="w-full">

        <Header
          onAdd={() =>
            setShowModal(true)
          }
        />

      </div>



      {/* Statistics */}

      <div className="w-full">

        <StatsCards
          renewals={renewals}
        />

      </div>




      {/* Search */}

      <div className="w-full">

        <SearchBar
          onSearch={handleSearch}
        />

      </div>




      {/* Table */}

      <div className="w-full">

        <RenewalTable

          renewals={filteredRenewals}

          loading={loading}

          refresh={fetchRenewals}

        />

      </div>




      {/* Bottom Information Cards */}

      <div
        className="
          grid
          grid-cols-12
          gap-5
          w-full
        "
      >


        <div
          className="
            col-span-12
            lg:col-span-7
          "
        >

          <FeaturesCard />

        </div>



        <div
          className="
            col-span-12
            lg:col-span-5
          "
        >

          <StatusCard
            renewals={renewals}
          />

        </div>


      </div>





      {/* Add Renewal Modal */}

      <AnimatePresence>

        {
          showModal && (

            <AddRenewalModal

              onClose={() =>
                setShowModal(false)
              }

              refresh={fetchRenewals}

            />

          )
        }

      </AnimatePresence>



    </motion.div>

  );

};


export default RenewalManagement;