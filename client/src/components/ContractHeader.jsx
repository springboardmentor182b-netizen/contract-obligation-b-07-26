import "./ContractHeader.css";
import TopActions from "./TopActions";

function ContractHeader() {
  return (
    <div className="header-container">

      <div className="header-left">
        <h1>Contract Management</h1>
        <p>Create, edit, and manage the full contract lifecycle.</p>
        
      </div>
      <TopActions />

    </div>
  );
}

export default ContractHeader;