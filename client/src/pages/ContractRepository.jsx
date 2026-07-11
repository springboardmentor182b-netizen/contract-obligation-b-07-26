import { useState } from "react";
import ContractHeader from "../components/ContractHeader";
import StatusTabs from "../components/StatusTabs";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import ContractTable from "../components/ContractTable";

function ContractRepository() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-container">
      <ContractHeader />
      <StatusTabs />
      <CategoryTabs />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ContractTable searchTerm={searchTerm} />
    </div>
  );
}

export default ContractRepository;
