import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ContractStatusChart() {
  // We start with an empty chart
  const [chartData, setChartData] = useState([]);

  // Fetch the real stats from the backend when the component loads
  useEffect(() => {
    fetch('http://127.0.0.1:8000/dashboard/stats/')
      .then(response => response.json())
      .then(data => {
        // Transform the backend data into the exact format the Pie Chart needs
        const realData = [
          { name: 'Active', value: data.active_count || 0, color: '#10b981' }, // Green
          { name: 'In Review', value: data.in_review_count || 0, color: '#3b82f6' }, // Blue
          { name: 'Approved', value: data.approved_count || 0, color: '#f59e0b' }, // Yellow/Orange
          { name: 'Draft', value: data.draft_count || 0, color: '#64748b' } // Gray
        ];
        // Remove any categories that have a value of 0 so the chart looks clean
        setChartData(realData.filter(item => item.value > 0));
      })
      .catch(error => console.error('Error fetching chart data:', error));
  }, []);

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Contract Status</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Distribution by lifecycle stage</p>
      
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* This draws the little legend below the chart with the real numbers */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '10px' }}>
        {chartData.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></div>
            <span>{item.name}: <strong>{item.value}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
}