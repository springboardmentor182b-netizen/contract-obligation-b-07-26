import React, { useEffect, useState } from "react";

// We create a shorthand for React.createElement to make the code cleaner
const e = React.createElement;

const ComplianceDashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await fetch("http://localhost:8000/dashboard/metrics");
      
      if (!response.ok) {
        throw new Error("Backend endpoint not ready yet.");
      }
      
      const data = await response.json();

      setMetrics([
        { id: 1, title: "Overall Compliance", value: data.overallCompliance + "%", color: "#22C55E" },
        { id: 2, title: "Missed Deadlines", value: data.missedDeadlines, color: "#EF4444" },
        { id: 3, title: "Risk Flags", value: data.riskFlags, color: "#F59E0B" },
        { id: 4, title: "Audits Completed", value: data.auditsCompleted, color: "#3B82F6" },
      ]);
    } catch (error) {
      console.warn("API not found, showing empty data state:", error.message);
      // Fallback empty state
      setMetrics([
        { id: 1, title: "Overall Compliance", value: "N/A", color: "#22C55E" },
        { id: 2, title: "Missed Deadlines", value: "0", color: "#EF4444" },
        { id: 3, title: "Risk Flags", value: "0", color: "#F59E0B" },
        { id: 4, title: "Audits Completed", value: "0", color: "#3B82F6" },
      ]);
    }
  };

  // 1. Build the Header
  const headerTitle = e("h1", { style: { fontSize: "1.875rem", fontWeight: "bold", margin: "0 0 0.5rem 0" } }, "Compliance Dashboard");
  const headerDate = e("p", { style: { color: "#6B7280", margin: "0" } }, new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
  const headerSection = e("div", { style: { marginBottom: "2rem" } }, headerTitle, headerDate);

  // 2. Build the KPI Cards Grid
  const kpiCards = metrics.map((item) => 
    e("div", { 
        key: item.id, 
        style: { 
          padding: "1.5rem", 
          backgroundColor: "white", 
          borderLeft: `4px solid ${item.color}`, 
          borderRadius: "0.5rem", 
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
        } 
      },
      e("h3", { style: { margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "#6B7280", textTransform: "uppercase" } }, item.title),
      e("p", { style: { margin: "0", fontSize: "1.875rem", fontWeight: "bold", color: "#111827" } }, item.value)
    )
  );
  
  const kpiGrid = e("div", { 
    style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" } 
  }, ...kpiCards);

  // 3. Build the Placeholders for the missing charts
  const placeholderStyle = { padding: "3rem", backgroundColor: "#F3F4F6", borderRadius: "0.5rem", textAlign: "center", color: "#6B7280" };
  const chart1 = e("div", { style: placeholderStyle }, "Department Chart (Component Missing)");
  const chart2 = e("div", { style: placeholderStyle }, "Risk Trend Chart (Component Missing)");
  
  const chartGrid = e("div", { 
    style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" } 
  }, chart1, chart2);

  // 4. Return the main container wrapping everything
  return e("div", { 
    style: { padding: "2rem", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" } 
  }, headerSection, kpiGrid, chartGrid);
};

export default ComplianceDashboard;