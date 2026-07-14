import api from "./api";

function formatContract(contract) {
  return { ...contract, fileName: contract.fileName ?? contract.document_name, expiryDate: contract.expiryDate ?? contract.expiry_date, uploadedAt: contract.uploadedAt ?? contract.created_at };
}

export async function getStoredContracts() {
  const { data } = await api.get("/contracts");
  return data.map(formatContract);
}

export async function addStoredContract({ file, title, counterparty, category, status, expiryDate }) {
  const { data } = await api.post("/contracts", {
    title: title || file.name.replace(/\.[^/.]+$/, ""),
    counterparty: counterparty || "Not provided",
    category: category || "General",
    status: status || "Active",
    expiry_date: expiryDate || null,
    document_name: file.name,
  });
  return formatContract(data);
}

export async function removeStoredContract(id) {
  await api.delete(`/contracts/${id}`);
}

export async function updateStoredContract(id, changes) {
  const { data } = await api.patch(`/contracts/${id}`, {
    title: changes.title,
    counterparty: changes.counterparty,
    category: changes.category,
    status: changes.status,
    expiry_date: changes.expiryDate || null,
  });
  return formatContract(data);
}
