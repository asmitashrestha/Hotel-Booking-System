import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TourType } from "../config/TourType";
import { IoLocation } from "react-icons/io5";
import { MdCategory, MdCurrencyRupee  } from "react-icons/md";


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
      <div className="search-bar flex justify-center text-center relative bottom-[35px]">
        <div className="search-container flex">
          <div>
          <IoLocation className='relative top-9 left-5 text-2xl '/>
             <input
            type="text"
            placeholder="Your next destination..."
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="outline-none text-gray-800 bg-white hover:bg-slate-300 ml-4 py-3 px-[25px] rounded-md"
          />
          </div>
         <div>
         <MdCategory className='relative top-9 left-5 text-2xl '/>
           <input
            type="text"
            placeholder="Tour type"
            // define here value and onchange function during implementation
            className="outline-none text-gray-800 bg-white hover:bg-slate-300 ml-4 py-3 px-[25px] rounded-md"
          />
         </div>
         <div className="mr-2">
         <MdCurrencyRupee className='relative top-9 left-5 text-2xl '/>
          <input
            type="number"
            placeholder="Your budget range...."
            // same as above put here value and onchange function ra searchcontext ma define garna parxa hola hai so cnsider that also
            className="outline-none text-gray-800 bg-white hover:bg-slate-300 ml-4 py-3 px-[25px] rounded-md"
          />
         </div>
          
          <div className="">
            <button
              type={"submit"}
              className="outline-none font-bold bg-black text-white text-xl hover:bg-blue-700 px-5 py-[14px] ml-[80px] relative right-[84px] top-6 rounded"
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
