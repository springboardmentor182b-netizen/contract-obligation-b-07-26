import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/ObligationTracker/Header";
import StatsCards from "../components/ObligationTracker/StatsCards";
import FilterBar from "../components/ObligationTracker/FilterBar";
import ResponsibilityCard from "../components/ObligationTracker/ResponsibilityCard";
import ComplianceCard from "../components/ObligationTracker/ComplianceCard";
import ObligationTable from "../components/ObligationTracker/ObligationTable";
import AddObligationModal from "../components/ObligationTracker/AddObligationModal";

const ObligationTracking = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="px-6 py-5 space-y-5"
    >
      <Header onAdd={() => setShowModal(true)} />

      <StatsCards />

      <FilterBar />

      <ObligationTable />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <ResponsibilityCard />
        </div>

        <div className="col-span-4">
          <ComplianceCard />
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <AddObligationModal
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ObligationTracking;