import React from "react";
import "./CategoryTabs.css";

const categories = [
  "All",
  "Service Agreements",
  "Lease Agreements",
  "Employment Contracts",
  "Vendor Contracts",
  "Purchase Agreements",
  "Partnership Agreements",
  "Confidentiality Agreements",
];

const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-tabs-container">
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;