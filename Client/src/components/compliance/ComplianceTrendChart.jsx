import React from "react";

const DEFAULT_TRENDS = [
  { month: "Jan", rate: 82 },
  { month: "Feb", rate: 85 },
  { month: "Mar", rate: 88 },
  { month: "Apr", rate: 90 },
  { month: "May", rate: 93 },
  { month: "Jun", rate: 95 },
];

export default function ComplianceTrendChart(props) {
  // Extract data or points safely regardless of how the prop was named
  const chartData = 
    props?.data ?? 
    props?.trends ?? 
    props?.history ?? 
    DEFAULT_TRENDS;

  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#1F2937]">Compliance Rate Trend</h3>
      <div className="mt-6 flex h-48 items-end gap-3 pt-4">
        {Array.isArray(chartData) && chartData.map((item, index) => {
          const val = item?.rate ?? item?.value ?? 0;
          return (
            <div key={item?.month || index} className="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-semibold text-[#475467]">{val}%</span>
              <div 
                className="w-full rounded-t-md bg-[#12805C] transition-all duration-300"
                style={{ height: `${val}%` }}
              />
              <span className="text-xs text-[#98A2B3]">{item?.month || `M${index + 1}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}