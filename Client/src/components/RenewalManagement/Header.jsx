import { PlusCircle } from "lucide-react";

const Header = ({ onAdd }) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        w-full
      "
    >

      {/* Title Section */}
      <div>

        <h1
          className="
            text-2xl
            md:text-3xl
            font-bold
            text-gray-800
          "
        >
          Renewal Dashboard
        </h1>


        <p
          className="
            mt-1
            text-sm
            text-gray-500
          "
        >
          Manage, track and monitor all contract renewals from one place.
        </p>

      </div>



      {/* Add Button */}
      <button
        onClick={onAdd}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-yellow-500
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition
          hover:bg-yellow-600
        "
      >

        <PlusCircle size={19} />

        Add Renewal

      </button>


    </div>
  );
};

export default Header;