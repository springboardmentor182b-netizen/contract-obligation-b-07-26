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

function CategoryTabs() {
  return (
    <div className="category-tabs">
      {categories.map((category, index) => (
        <button
          key={category}
          className={`tab-btn ${index === 0 ? "active" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;