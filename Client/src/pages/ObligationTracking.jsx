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
  const [editingObligation, setEditingObligation] = useState(null);
  const [obligations, setObligations] = useState([
  {
    id: "OBL-001",
    obligation: "Review Vendor Contract",
    contract: "Vendor Agreement",
    owner: "John Smith",
    priority: "High",
    status: "Pending",
    dueDate: "2026-07-20",
  },
  {
    id: "OBL-002",
    obligation: "Submit Compliance Report",
    contract: "Service Contract",
    owner: "Sarah Lee",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-07-25",
  },
  {
    id: "OBL-003",
    obligation: "Renew Insurance Policy",
    contract: "Insurance Contract",
    owner: "David Wilson",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-07-15",
  },
]);
const addObligation = (formData) => {
  if (editingObligation) {
    // Update existing obligation
    setObligations((prev) =>
      prev.map((item) =>
        item.id === editingObligation.id
          ? {
              ...item,
              ...formData,
            }
          : item
      )
    );
  } else {
    // Add new obligation
    setObligations((prev) => [
      ...prev,
      {
        id: `OBL-${String(prev.length + 1).padStart(3, "0")}`,
        ...formData,
      },
    ]);
  }

  setEditingObligation(null);
  setShowModal(false);
};
   const deleteObligation = (id) => {
  setObligations((prev) =>
    prev.filter((item) => item.id !== id)
  );
};
const editObligation = (obligation) => {
  setEditingObligation(obligation);
  setShowModal(true);
};
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
      <Header
  onAdd={() => {
    setEditingObligation(null);
    setShowModal(true);
  }}
/>

      <StatsCards />

      <FilterBar />

      <ObligationTable
  obligations={obligations}
  onDelete={deleteObligation}
  onEdit={editObligation}
/>

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
      onClose={() => {
        setShowModal(false);
        setEditingObligation(null);
      }}
      onSave={addObligation}
      editingObligation={editingObligation}
    />
  )}
</AnimatePresence>
    </motion.div>
  );
};

export default ObligationTracking;