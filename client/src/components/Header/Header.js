import "./Header.css";
import { exportPDF } from "../../utils/exportPDF";

function Header({ openModal, obligations }) {
  return (
    <div className="header">

      <div className="header-left">

        <div>
          <h1>Obligation Tracker</h1>

          <p>
            Track and manage contractual obligations efficiently.
          </p>
        </div>

      </div>

      <div className="header-right">
        <button

className="export-btn"

onClick={()=>exportPDF(obligations)}

>

Export PDF

</button>

        <button className="add-btn" onClick={openModal}>
          + Add Obligation
        </button>

      </div>

    </div>
  );
}

export default Header;
