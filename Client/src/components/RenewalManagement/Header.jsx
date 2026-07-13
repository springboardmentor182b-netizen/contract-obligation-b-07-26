const Header = ({ onAdd }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Renewal Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and monitor all contract renewals.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        + Add Renewal
      </button>
    </div>
  );
};

export default Header;