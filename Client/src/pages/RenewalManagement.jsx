import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/RenewalManagement/Header";
import StatsCards from "../components/RenewalManagement/StatsCards";
import SearchBar from "../components/RenewalManagement/SearchBar";
import RenewalTable from "../components/RenewalManagement/RenewalTable";
import FeaturesCard from "../components/RenewalManagement/FeaturesCard";
import StatusCard from "../components/RenewalManagement/StatusCard";
import AddRenewalModal from "../components/RenewalManagement/AddRenewalModal";

const RenewalManagement = () => {
  const [renewals, setRenewals] = useState([]);
  const [filteredRenewals, setFilteredRenewals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchRenewals = async () => {
    try {
      setLoading(true);

      const response = await fetch("/renewals/");

      if (!response.ok) {
        throw new Error("Failed to fetch renewals");
      }

      const data = await response.json();

      setRenewals(data);
      setFilteredRenewals(data);
    } catch (error) {
      console.error("Fetch Renewal Error:", error);
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

    const search = value.toLowerCase();

    const result = renewals.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search)
    );

    setFilteredRenewals(result);
  };

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header onAdd={() => setShowModal(true)} />

      <StatsCards renewals={renewals} />

      <SearchBar onSearch={handleSearch} />

      <RenewalTable
        renewals={filteredRenewals}
        loading={loading}
        refresh={fetchRenewals}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeaturesCard />
        </div>

        <div className="lg:col-span-1">
          <StatusCard renewals={renewals} />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <AddRenewalModal
            onClose={() => setShowModal(false)}
            refresh={fetchRenewals}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RenewalManagement;