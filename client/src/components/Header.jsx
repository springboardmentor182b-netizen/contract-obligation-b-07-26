import "./Header.css";

function Header() {
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
        

        <button className="add-btn">
          + Add Obligation
        </button>

      </div>

    </div>
  );
}

export default Header;