import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../components/Navbar";
import { getDashboard, getProfile } from "../features/dashboard/services/dashboardApi";
import ContractHeader from "../components/ContractHeader";
import StatusTabs from "../components/StatusTabs";
import CategoryTabs from "../components/CategoryTabs";
import ContractTable from "../components/ContractTable";
import NewContractModal from "../components/NewContractModal";
import ContractAIWorkspace from "../components/ContractAIWorkspace";
import { fetchContracts, createContract, updateContract, deleteContract, createObligation } from "../api";
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
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("contractiq_sidebar_collapsed") === "true",
  );

  const fetchContractsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const status = typeof statusFilter === 'string' && statusFilter !== 'All' ? statusFilter : null;
      const category = typeof categoryFilter === 'string' && categoryFilter !== 'All' ? categoryFilter : null;
      const data = await fetchContracts({ status, category, search: searchTerm });
      setContracts(Array.isArray(data) ? data : []);
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

  useEffect(() => {
    Promise.all([getProfile(), getDashboard()])
      .then(([user, dashboardData]) => {
        setProfile(user);
        setDashboard(dashboardData);
      })
      .catch(() => {});
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => {
      const next = !current;
      localStorage.setItem("contractiq_sidebar_collapsed", String(next));
      return next;
    });
  };

  const handleSaveContract = async (contract) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        title: contract.name,
        contract_number: contract.contract_id,
        category: contract.category,
        counterparty: contract.party,
        department: contract.department,
        status: contract.status,
        value: contract.value || null,
        expiry_date: contract.expiry || null,
      };
      if (isEditing && contract.id) {
        await updateContract(contract.id, payload);
      } else {
        await createContract(payload);
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

  const handleCreateGeneratedObligation = async (suggestion) => {
    await createObligation(suggestion);
    await fetchContractsData();
  };

  return (
    <div className="app-shell contracts-page-shell">
      <Sidebar
        profile={profile}
        stats={dashboard?.stats}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <div className="app-main">
        <Navbar onNewContract={() => setShowModal(true)} onImportComplete={fetchContractsData} />
        <main className="contracts-content">
          <ContractHeader
            filters={{ status: statusFilter, category: categoryFilter, search: searchTerm }}
            onStatusChange={setStatusFilter}
            onCategoryChange={setCategoryFilter}
          />

          <ContractAIWorkspace
            contracts={contracts}
            onCreateObligation={handleCreateGeneratedObligation}
          />

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
