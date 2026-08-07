import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { API_BASE_URL } from '../../config';

// 1. Keep a mapping of colors for specific categories to keep your design consistent
const CATEGORY_COLORS = {
  'Services': '#3b82f6',   // Blue
  'Technology': '#10b981', // Green
  'NDA': '#8b5cf6',        // Purple
  'Procurement': '#f59e0b',// Orange
  'HR': '#22c55e',         // Light Green
  'Other': '#94a3b8'       // Gray
};

export default function CategoryChart() {
  // 2. Create state to hold the dynamically generated chart data
  const [chartData, setChartData] = useState([]);

  // 3. Fetch data and calculate category totals when the component loads
  useEffect(() => {
    fetch(`${API_BASE_URL}/contracts/`)
      .then(response => response.json())
      .then(data => {
        // Count how many contracts exist for each category
        const categoryCounts = {};
        data.forEach(contract => {
          const category = contract.category || 'Other';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Format the counts into the array structure the BarChart requires
        const formattedData = Object.keys(categoryCounts).map(categoryName => ({
          name: categoryName,
          value: categoryCounts[categoryName],
          color: CATEGORY_COLORS[categoryName] || '#94a3b8' // Fallback to gray if category is new
        }));

        setChartData(formattedData);
      })
      .catch(error => console.error('Error fetching category stats:', error));
  }, []);

  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Category Distribution</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Contracts by document type</p>
      
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {/* 4. Pass the new dynamic chartData into the BarChart */}
          <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} allowDecimals={false} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}