// import SearchMenu from "../components/SearchMenu"

// const Home = () => {
//   return (
//     <div>
//       <SearchMenu/>
//       Home Page
//     </div>
//   )
// }

// export default Home

import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { FaLocationDot } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchMenu from "../components/SearchBar";

const Home = () => {
  const { isLoggedIn } = useAppContext();
  const { data: tourData } = useQuery("fetchTours", apiClient.fetchTours, {
    onError: () => {},
  });
  if (!tourData) {
    return <span>No tour found</span>;
  }
  return (
    <div className="space-y-5 p-4">
      <SearchMenu/>
      <h1 className="text-3xl font-bold justify-center text-center text-gray-900">Tour Available</h1>

      <div className="m-4 flex flex-wrap justify-center">
        {tourData.map((tour, index) => (
          <div
            key={index}
            className=" bg-teal-100 flex-wrap mt-2 ml-4 rounded border-cyan-100"
          >
            <div className="p-4">
              <img src={tour.imageUrls[0]} alt="" className="w-80 h-64" />
              <h2 className="font-bold mt-1 flex"> 
              <span className="mt-1 mr-4"><FaLocationDot /></span> 
              <span>{tour.city}</span>
              </h2>
              <p className="text-sm font-semibold text-gray-800">
                {tour.description}
              </p>

              <div className="flex justify-between ">
                <p>
                  {" "}
                  <span className="font-bold text-gray-700">
                    Total seats:
                  </span>{" "}
                  {tour.countPeople}
                </p>
                <p>
                  {" "}
                  <span className="font-bold text-green-950">Rating :</span>
                  <span className="font-semibold text-gray-900">
                    {tour.starRating}
                  </span>
                </p>
              </div>
              <div className="flex justify-between mt-2 ">
                <p>
                  <span className="font-bold text-gray-900">Price :</span>
                  <span className="font-semibold text-[15px]">
                    {" "}
                    {tour.pricePerPackage}
                  </span>
                </p>
                {/* {isLoggedIn ? (
                  <Link
                    to={"/details-page"}
                    className="bg-blue-600 p-2 rounded"
                  >
                    View Details
                  </Link>
                ) : (
                  <button onClick={()=> toast.warning("Register to view more details")}>
                     <Link to={"/signin"} className="bg-blue-600 p-2 rounded">
                    SignIn
                  </Link>
                  </button>
                 
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Home;
