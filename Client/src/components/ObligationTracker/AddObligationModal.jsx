// import { motion, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AddObligationModal = ({
  onClose,
  onSave,
  editingObligation,
}) => {
   const [formData, setFormData] = useState({
  obligation: "",
  contract: "",
  owner: "",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
  description: "",
});

useEffect(() => {
  if (editingObligation) {
    setFormData(editingObligation);
  } else {
    setFormData({
      obligation: "",
      contract: "",
      owner: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
      description: "",
    });
  }
}, [editingObligation]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
      >
         {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-xl font-semibold">
  {editingObligation ? "Edit Obligation" : "Add New Obligation"}
</h2>



          <button

            onClick={onClose}

            className="text-2xl text-gray-500 hover:text-black"

          >

            ×

          </button>

        </div>



      {/* Body */}
<div className="p-6">

  <div className="grid grid-cols-2 gap-5">

    {/* Obligation Name */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Obligation Name
      </label>

      <input
        value={formData.obligation}
        onChange={(e) =>
          setFormData({
            ...formData,
            obligation: e.target.value,
          })
        }
        className="w-full rounded-lg border p-3 outline-none focus:border-[#D4AF37]"
        placeholder="Enter obligation name"
      />
    </div>

    {/* Contract */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Contract
      </label>

      <input
        value={formData.contract}
        onChange={(e) =>
          setFormData({
            ...formData,
            contract: e.target.value,
          })
        }
        className="w-full rounded-lg border p-3"
        placeholder="Enter contract name"
      />
    </div>

    {/* Owner */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Owner
      </label>

      <input
        value={formData.owner}
        onChange={(e) =>
          setFormData({
            ...formData,
            owner: e.target.value,
          })
        }
        className="w-full rounded-lg border p-3"
        placeholder="Owner"
      />
    </div>

    {/* Due Date */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Due Date
      </label>

      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) =>
          setFormData({
            ...formData,
            dueDate: e.target.value,
          })
        }
        className="w-full rounded-lg border p-3"
      />
    </div>

    {/* Priority */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Priority
      </label>

      <select
        value={formData.priority}
        onChange={(e) =>
          setFormData({
            ...formData,
            priority: e.target.value,
          })
        }
        className="w-full rounded-lg border p-3"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>

    {/* Status */}
    <div>
      <label className="mb-2 block text-sm font-medium">
        Status
      </label>

      <select
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status: e.target.value,
          })
        }
        className="w-full rounded-lg border p-3"
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>

  </div>

  {/* Description */}
  <div className="mt-5">
    <label className="mb-2 block text-sm font-medium">
      Description
    </label>

    <textarea
      rows="4"
      value={formData.description}
      onChange={(e) =>
        setFormData({
          ...formData,
          description: e.target.value,
        })
      }
      className="w-full rounded-lg border p-3"
    />
  </div>

</div>



        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">



          <button

            onClick={onClose}

            className="rounded-lg border px-5 py-2"

          >

            Cancel

          </button>



          <button
  onClick={() => {
    if (
      !formData.obligation ||
      !formData.contract ||
      !formData.owner ||
      !formData.dueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(formData);
  }}
  className="rounded-lg bg-[#D4AF37] px-5 py-2 text-white hover:bg-[#c29a2e]"
>
  Save
</button>



        </div>
      </motion.div>
    </div>
  );
};

export default AddObligationModal;