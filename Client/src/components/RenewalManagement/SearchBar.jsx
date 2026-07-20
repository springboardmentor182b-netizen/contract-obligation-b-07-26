import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {

  const handleChange = (e) => {
    onSearch(e.target.value);
  };


  return (

    <div
      className="
        w-full
        bg-white
        rounded-xl
        border
        border-gray-200
        px-5
        py-3
      "
    >

      <div
        className="
          relative
          w-full
        "
      >

        <Search
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
          size={18}
        />


        <input
          type="text"
          placeholder="Search by Contract ID, Status, Notes..."
          onChange={handleChange}
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            py-2.5
            pl-10
            pr-4
            text-sm
            outline-none
            transition
            focus:border-yellow-500
            focus:ring-2
            focus:ring-yellow-200
          "
        />


      </div>


    </div>

  );

};


export default SearchBar;