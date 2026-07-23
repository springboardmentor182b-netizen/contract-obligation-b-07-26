import { useState } from "react";
import { Sidebar } from "./layout/Sidebar";
import { Navbar } from "./layout/Navbar";
import { ContractRepository } from "./features/contracts/components/ContractRepository";
import { ContractDetail } from "./features/contracts/components/ContractDetail";
import { NewContractModal } from "./features/contracts/components/NewContractModal";
import { contractsApi } from "./features/contracts/services/contractsApi";

export default function App() {
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [editingContract, setEditingContract] = useState(null);

  async function handleDelete(contract) {
    if (!window.confirm(`Delete "${contract.name}"? This cannot be undone.`)) return;
    await contractsApi.remove(contract.id);
    setSelectedContractId(null);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar title="Contract Repository" subtitle="Contract lifecycle and obligation management" />
        {selectedContractId ? (
          <ContractDetail
            contractId={selectedContractId}
            onBack={() => setSelectedContractId(null)}
            onEdit={setEditingContract}
            onDelete={handleDelete}
          />
        ) : (
          <ContractRepository onSelectContract={setSelectedContractId} />
        )}
        {editingContract && (
          <NewContractModal
            contract={editingContract}
            onClose={() => setEditingContract(null)}
            onCreated={() => setEditingContract(null)}
          />
        )}
      </div>
    </div>
  );
}
