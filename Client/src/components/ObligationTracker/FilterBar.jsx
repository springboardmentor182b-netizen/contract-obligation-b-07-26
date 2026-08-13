const FilterBar = () => {
  return (
    <div className="flex justify-between items-center">

      <div className="flex gap-3">

        <input
          placeholder="Search..."
          className="border rounded-full px-4 py-2 w-72"
        />

        <button className="border rounded-full px-5 py-2">
          All Status
        </button>

        <button className="border rounded-full px-5 py-2">
          All Priority
        </button>

        <button className="border rounded-full px-5 py-2">
          All Owners
        </button>

      </div>

      <p className="text-gray-500">
        12 of 12 obligations
      </p>

    </div>
  );
};

export default FilterBar;