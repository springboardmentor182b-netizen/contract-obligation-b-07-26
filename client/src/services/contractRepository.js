const STORAGE_KEY = "contractiq.repository.contracts";

export function getStoredContracts() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function addStoredContract(contract) {
  const contracts = getStoredContracts();
  const record = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    uploadedAt: new Date().toISOString(),
    status: "Active",
    category: "General",
    ...contract,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...contracts]));
  return record;
}

export function removeStoredContract(id) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(getStoredContracts().filter((contract) => contract.id !== id)),
  );
}

export function updateStoredContract(id, changes) {
  const contracts = getStoredContracts().map((contract) => (
    contract.id === id ? { ...contract, ...changes, updatedAt: new Date().toISOString() } : contract
  ));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
  return contracts.find((contract) => contract.id === id);
}