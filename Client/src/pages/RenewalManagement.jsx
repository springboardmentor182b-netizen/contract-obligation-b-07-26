import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/RenewalManagement/Header";
import StatsCards from "../components/RenewalManagement/StatsCards";
import SearchBar from "../components/RenewalManagement/SearchBar";
import RenewalTable from "../components/RenewalManagement/RenewalTable";
import FeaturesCard from "../components/RenewalManagement/FeaturesCard";
import StatusCard from "../components/RenewalManagement/StatusCard";
import AddRenewalModal from "../components/RenewalManagement/AddRenewalModal";

const RenewalManagement = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="px-6 py-5 space-y-5"
    >
      <Header onAdd={() => setShowModal(true)} />

      <StatsCards />

      <SearchBar />

      <RenewalTable />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <FeaturesCard />
        </div>

        <div className="col-span-4">
          <StatusCard />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <AddRenewalModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RenewalManagement;