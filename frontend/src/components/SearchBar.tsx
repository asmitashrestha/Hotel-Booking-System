import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchMenu = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  // local state to global state in saveSearchValues
  const [destination, setDestination] = useState<string>(search.destination);
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination);
    navigate("/searchtour");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="search-bar flex justify-center text-center">
        <div className="search-container p-4 ">
          <MdTravelExplore size={25} className={"mr-2"} />
          <input
            type="text"
            placeholder="Your next destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="outline-none bg-slate-400 ml-4 py-3  px-4 rounded-md "
          />

          <div className="">
            <button
              type={"submit"}
              className="outline-none font-bold bg-blue-400 ml-4 p-3 relative bottom-11 left-[135px] rounded"
            >
              <FaSearchLocation />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchMenu;
