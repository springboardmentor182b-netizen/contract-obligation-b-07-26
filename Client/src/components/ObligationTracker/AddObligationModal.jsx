import { motion, AnimatePresence } from "framer-motion";


const AddObligationModal = ({ onClose }) => {
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

            Add New Obligation

          </h2>



          <button

            onClick={onClose}

            className="text-2xl text-gray-500 hover:text-black"

          >

            ×

          </button>

        </div>



        {/* Body */}

        <div className="space-y-5 p-6">



          <div>

            <label className="mb-2 block text-sm font-medium">

              Obligation Name

            </label>



            <input

              className="w-full rounded-lg border p-3 outline-none focus:border-[#D4AF37]"

              placeholder="Enter obligation name"

            />

          </div>



          <div className="grid grid-cols-2 gap-5">



            <div>

              <label className="mb-2 block text-sm font-medium">

                Owner

              </label>



              <input

                className="w-full rounded-lg border p-3"

                placeholder="Owner"

              />

            </div>



            <div>

              <label className="mb-2 block text-sm font-medium">

                Due Date

              </label>



              <input

                type="date"

                className="w-full rounded-lg border p-3"

              />

            </div>



          </div>



          <div>

            <label className="mb-2 block text-sm font-medium">

              Description

            </label>



            <textarea

              rows="4"

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

            className="rounded-lg bg-[#D4AF37] px-5 py-2 text-white"

          >

            Save

          </button>



        </div>
      </motion.div>
    </div>
  );
};

export default AddObligationModal;