import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const MyTour = () => {
  const { data: tourData } = useQuery("fetchTours", apiClient.fetchTours, {
    onError: () => {},
  });
  if (!tourData) {
    return <span>No tour found</span>;
  }
  return (
    <div className="bg-cyan-50 mt-0">
      <div className="pt-10 ">
      <span className="">
        <h1 className="text-3xl font-bold flex justify-center text-center mb-20">My Tour</h1>
      </span>
      <div className=" flex flex-wrap ">
        {tourData.map((tour, index) => (
          <div
            key={index}
            className=" bg-gray-300 flex-wrap mt-2 ml-4 
            rounded border-cyan-100"
          >
            <div className="p-4">
              <img src={`${tour.imageUrls[0]}`} alt="" className="image-tour w-80 rounded" />
              <div className="flex justify-between ">
                <p className="font-semibold mt-1">Location:{tour.city}</p>
              <p className="font-semibold mt-1">Price : {tour.pricePerPackage}</p>
              </div>
              
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
              <div className="flex justify-between mt-2">
                
                <Link to={`/edit-tour/${tour._id}`} className="bg-green-800 text-white font-semibold text-xl px-8 py-2 rounded">
                  Edit
                </Link>
                <Link to={`/delete-tour/${tour._id}`} className="bg-red-900 text-white font-semibold text-xl px-8 py-2 rounded">Delete</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default MyTour;