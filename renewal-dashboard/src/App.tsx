function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "250px",
          background: "#1f2937",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>ContractIQ</h2>

        <p>🏠 Dashboard</p>
        <p>📄 Contracts</p>
        <p>📁 Repository</p>
        <p>🔄 Renewal</p>
        <p>✅ Compliance</p>
        <p>📊 Reports</p>
        <p>👤 Users</p>
        <p>⚙ Settings</p>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="Search"
    style={{ padding: "8px", width: "250px" }}
  />
  <button>Export Report</button>
</div>
<div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px", width: "180px" }}>
    <h3>120</h3>
    <p>Total Contracts</p>
  </div>

  <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px", width: "180px" }}>
    <h3>18</h3>
    <p>Expiring Soon</p>
  </div>

  <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px", width: "180px" }}>
    <h3>95</h3>
    <p>Active Contracts</p>
  </div>
</div>
        <h1>Renewal Dashboard</h1>
        <p>Manage all contract renewal schedules.</p>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
  <thead>
    <tr style={{ background: "#f5f5f5" }}>
      <th style={{ padding: "10px", border: "1px solid #ddd" }}>Contract</th>
      <th style={{ padding: "10px", border: "1px solid #ddd" }}>Client</th>
      <th style={{ padding: "10px", border: "1px solid #ddd" }}>Renewal Date</th>
      <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>Software License</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>ABC Pvt Ltd</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>15 Aug 2026</td>
      <td style={{ padding: "10px", border: "1px solid #ddd" }}>Active</td>
    </tr>
  </tbody>
</table>
<div
  style={{
    background: "#2563eb",
    color: "white",
    width: "280px",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  }}
>
  <h3>Renewal Calendar</h3>
  <p>June 2026</p>

  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "8px" }}>
    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
    <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
    <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
    <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
    <span>29</span><span>30</span>
  </div>
</div>
<div style={{ marginTop: "20px" }}>
  <h3 style={{ textAlign: "center" }}>
  Upcoming Renewals
</h3>

<ul
  style={{
    width: "300px",
    margin: "20px auto",
    textAlign: "left",
  }}
>
  <li>Microsoft License - 15 Aug 2026</li>
  <li>Adobe Subscription - 20 Aug 2026</li>
  <li>AWS Cloud Contract - 28 Aug 2026</li>
</ul>
</div>
      </div>
    </div>
  );
}

export default App;
