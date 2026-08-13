const Header = ({ onAdd }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Obligation Tracking
        </h1>

        <p className="mt-1 text-gray-500">
          Track and manage contractual obligations efficiently.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="border rounded-xl px-5 py-2">
          Export
        </button>

        <button
          onClick={onAdd}
          className="rounded-xl bg-[#D4AF37] px-5 py-2 text-white"
        >
            Add Obligation
        </button>
      </div>
    </div>
  );
};

export default Header;