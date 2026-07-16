import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ContractHeader from "../components/ContractHeader";
import StatusTabs from "../components/StatusTabs";
import CategoryTabs from "../components/CategoryTabs";
import ContractTable from "../components/ContractTable";
import NewContractModal from "../components/NewContractModal";
import "./ContractRepository.css";

const initialContracts = [
  {
    id: "CTR-001",
    category: "Service Agreements",
    name: "Enterprise SaaS License Agreement",
    party: "Salesforce Inc.",
    dept: "IT",
    status: "Active",
    value: "$240,000",
    expiry: "2026-01-14",
    version: "v3.1",
  },
  {
    id: "CTR-002",
    category: "Lease Agreements",
    name: "Office Lease - HQ Tower 14F",
    party: "Brookfield Properties",
    dept: "Operations",
    status: "Active",
    value: "$1,800,000",
    expiry: "2027-05-31",
    version: "v1.2",
  },
  {
    id: "CTR-003",
    category: "Service Agreements",
    name: "Annual HR Consulting Retainer",
    party: "Meridian HR Group",
    dept: "HR",
    status: "Active",
    value: "$96,000",
    expiry: "2025-12-31",
    version: "v2.0",
  },
  {
    id: "CTR-004",
    category: "Purchase Agreements",
    name: "Manufacturing Supply Agreement",
    party: "Apex Components Ltd.",
    dept: "Procurement",
    status: "Active",
    value: "$3,200,000",
    expiry: "2025-09-09",
    version: "v4.3",
  },
  {
    id: "CTR-005",
    category: "Confidentiality Agreements",
    name: "NDA - Strategic Partnership",
    party: "Vertex Technologies",
    dept: "Legal",
    status: "Approved",
    value: "-",
    expiry: "2027-06-14",
    version: "v1.0",
  },
  {
    id: "CTR-006",
    category: "Employment Contracts",
    name: "Senior Software Engineer Employment",
    party: "Marcus Chen",
    dept: "HR",
    status: "Active",
    value: "$185,000",
    expiry: "2028-07-31",
    version: "v1.0",
  },
  {
    id: "CTR-007",
    category: "Service Agreements",
    name: "Cloud Infrastructure Services",
    party: "AWS Commercial",
    dept: "IT",
    status: "Under Review",
    value: "$420,000",
    expiry: "2026-06-30",
    version: "v2.1",
  },
  {
    id: "CTR-008",
    category: "Vendor Contracts",
    name: "Vendor Distribution Agreement",
    party: "Nortek Distribution EMEA",
    dept: "Procurement",
    status: "Active",
    value: "$700,000",
    expiry: "2025-09-30",
    version: "v3.0",
  },
  {
    id: "CTR-009",
    category: "Service Agreements",
    name: "Legal Services Engagement Letter",
    party: "Harrington & Wolfe LLP",
    dept: "Legal",
    status: "Active",
    value: "$150,000",
    expiry: "2025-12-31",
    version: "v5.2",
  },
  {
    id: "CTR-010",
    category: "Partnership Agreements",
    name: "Franchise Partnership Agreement",
    party: "GlobalBrand Holdings",
    dept: "Strategy",
    status: "Draft",
    value: "$500,000",
    expiry: "2030-12-31",
    version: "v0.3",
  },
  {
    id: "CTR-011",
    category: "Lease Agreements",
    name: "Warehouse Lease - Memphis Hub",
    party: "Prologis Realty Trust",
    dept: "Operations",
    status: "Expired",
    value: "$360,000",
    expiry: "2024-12-31",
    version: "v2.0",
  },
  {
    id: "CTR-012",
    category: "Service Agreements",
    name: "Cybersecurity Assessment SOW",
    party: "CipherShield Consulting",
    dept: "IT",
    status: "Terminated",
    value: "$75,000",
    expiry: "2024-07-31",
    version: "v1.0",
  },
];

const ContractRepository = () => {
  const [contracts, setContracts] = useState(initialContracts);

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
const handleSaveContract = (contract) => {
  const newContract = {
    ...contract,
    id: `CTR-${String(contracts.length + 1).padStart(3, "0")}`,
  };

  setContracts((prevContracts) => [...prevContracts, newContract]);

  setShowModal(false);
};
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content-wrapper">
        <Navbar onNewContract={() => setShowModal(true)} />

        <main className="main-content">
          <ContractHeader />

          <StatusTabs
            selectedStatus={statusFilter}
            setSelectedStatus={setStatusFilter}
          />

          <CategoryTabs
            selectedCategory={categoryFilter}
            setSelectedCategory={setCategoryFilter}
          />

          <div className="table-container-wrapper">
            <ContractTable
              contracts={contracts}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </main>
      </div>

      <NewContractModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveContract}
      />
    </div>
  );
};

export default ContractRepository;