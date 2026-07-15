import {
  getObligations,
  addObligation as createObligation,
  updateObligation,
  deleteObligation as deleteObligationApi,
} from "../services/obligationApi";

import { useState, useEffect } from "react";
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
  const [obligations, setObligations] = useState([]);

const loadObligations = async () => {
  try {
    const response = await getObligations();

    console.log("API Response:", response.data);

    setObligations(response.data);
  } catch (error) {
    console.error("API Error:", error);
  }
};
useEffect(() => {
  loadObligations();
}, []);

const addObligation = async (formData) => {
  try {
    if (editingObligation) {
      const updated = {
        ...editingObligation,
        ...formData,
      };

      await updateObligation(updated.id, updated);
    } else {
      const newObligation = {
        id: `OBL-${Date.now()}`,
        ...formData,
      };

      await createObligation(newObligation);
    }

    await loadObligations();

    setEditingObligation(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);
  }
};
  const deleteObligation = async (id) => {
  try {
    await deleteObligationApi(id);

    await loadObligations();
  } catch (error) {
    console.error("Delete Error:", error);
  }
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