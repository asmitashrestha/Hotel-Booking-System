
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { FaLocationDot } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { data: tourData } = useQuery("fetchTours", apiClient.fetchTours, {
    onError: () => {},
  });
  if (!tourData) {
    return <span>No tour found</span>;
  }
  return (
    <div className="space-y-5 p-4">
      <h1 className="text-3xl font-bold justify-center text-center text-gray-900">Tour Available</h1>
      <Link to={"/searchtour"}>
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
                  <div>
                    <button className="font-semibold bg-green-900 rounded px-3 py-2 text-white">View More</button>
                  </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Link>
      <ToastContainer/>
    </div>
  );
};

export default Home;
