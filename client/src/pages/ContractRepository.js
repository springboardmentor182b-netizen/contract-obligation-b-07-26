import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ContractHeader from "../components/ContractHeader";
import StatusTabs from "../components/StatusTabs";
import CategoryTabs from "../components/CategoryTabs";
import ContractTable from "../components/ContractTable";
import NewContractModal from "../components/NewContractModal";
import { fetchContracts, createContract, updateContract, deleteContract } from "../api";
import "./ContractRepository.css";

const ContractRepository = () => {
  const [contracts, setContracts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContractsData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching contracts with filters:', { status: statusFilter !== "All" ? statusFilter : null, category: categoryFilter !== "All" ? categoryFilter : null, search: searchTerm });
      const data = await fetchContracts({ status: statusFilter !== "All" ? statusFilter : null, category: categoryFilter !== "All" ? categoryFilter : null, search: searchTerm });
      console.log('Received contracts data:', data);
      setContracts(data);
    } catch (error) {
      console.error("Failed to fetch contracts:", error);
      setError(error.message || "Failed to fetch contracts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractsData();
  }, [statusFilter, categoryFilter, searchTerm]);

  const handleSaveContract = async (contract) => {
    setLoading(true);
    setError(null);
    try {
      if (isEditing && contract.id) {
        await updateContract(contract.id, contract);
      } else {
        await createContract(contract);
      }
      setShowModal(false);
      setSelectedContract(null);
      setIsEditing(false);
      await fetchContractsData();
    } catch (error) {
      console.error("Failed to save contract:", error);
      setError(error.message || "Failed to save contract");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContract = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contract?")) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deleteContract(id);
      await fetchContractsData();
    } catch (error) {
      console.error("Failed to delete contract:", error);
      setError(error.message || "Failed to delete contract");
    } finally {
      setLoading(false);
    }
  };

  const handleEditContract = (contract) => {
    setSelectedContract(contract);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content-wrapper">
        <Navbar onNewContract={() => setShowModal(true)} />

        <main className="main-content">
          <ContractHeader filters={{ status: statusFilter !== "All" ? statusFilter : null, category: categoryFilter !== "All" ? categoryFilter : null, search: searchTerm }} />

          <StatusTabs
            selectedStatus={statusFilter}
            setSelectedStatus={setStatusFilter}
          />

          <CategoryTabs
            selectedCategory={categoryFilter}
            setSelectedCategory={setCategoryFilter}
          />

      <div className="table-container-wrapper">
            <div className="search-input-wrapper" style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            {error && (
              <div className="error-message" style={{ color: 'red', padding: '10px', marginBottom: '10px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '4px' }}>
                {error}
              </div>
            )}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading contracts...</div>
            ) : (
              <ContractTable
                contracts={contracts}
                onEdit={handleEditContract}
                onDelete={handleDeleteContract}
              />
            )}
          </div>
        </main>
      </div>

      <NewContractModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedContract(null);
          setIsEditing(false);
        }}
        onSave={handleSaveContract}
        contract={selectedContract}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ContractRepository;