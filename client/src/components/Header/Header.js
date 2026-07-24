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
import "./Header.css";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { exportDashboard } from "../../api/headerApi";

function Header() {

    return (

        <div className="header">

            <div className="header-left">

                <h1>

                    Compliance Monitoring

                </h1>

                <p>

                    Track, monitor, and manage compliance across all obligations.

                </p>

            </div>

            <div className="header-right">

                <button

                    className="export-btn"

                    onClick={exportDashboard}

                >

                    <ArrowDownTrayIcon

                        className="export-icon"

                    />

                    Export Dashboard

                </button>

            </div>

        </div>

    );

}

export default Header;
import "./Header.css";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { exportDashboard } from "../../api/headerApi";

function Header() {

    return (

        <div className="header">

            <div className="header-left">

                <h1>

                    Compliance Monitoring

                </h1>

                <p>

                    Track, monitor, and manage compliance across all obligations.

                </p>

            </div>

            <div className="header-right">

                <button

                    className="export-btn"

                    onClick={exportDashboard}

                >

                    <ArrowDownTrayIcon

                        className="export-icon"

                    />

                    Export Dashboard

                </button>

            </div>

        </div>

    );

}

export default Header;
