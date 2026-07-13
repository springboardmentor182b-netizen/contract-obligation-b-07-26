const AddRenewalModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Add Renewal
        </h2>

        <p className="text-gray-500 mb-6">
          Renewal form will be implemented here.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRenewalModal;