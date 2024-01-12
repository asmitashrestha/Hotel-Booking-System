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
    <div className="space-y-5 p-4">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Tour</h1>
        <Link
          to={"/addtour"}
          className="flex bg-blue-600 text-white font-bold p-3 hover:bg-blue-200"
        >
          Add Tour
        </Link>
      </span>
      <div className="m-4 flex flex-wrap justify-center">
        {tourData.map((tour, index) => (
          <div
            key={index}
            className=" bg-teal-100 flex-wrap mt-2 ml-4 rounded border-cyan-100"
          >
            <div className="p-4">
              {/* <img src={tour.imageUrls} alt="" className="w-80" /> */}
              <h2 className="font-bold mt-1">Location {tour.city}</h2>
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
              <div className="flex justify-between mt-2">
                <p>Price : {tour.pricePerPackage}</p>
                <Link to={`/edit-tour/${tour._id}`} className="bg-blue-600 p-2 rounded">
                  View Details
                </Link>
                <Link to={`/delete-tour/${tour._id}`} className="bg-gray-900 text-white  p-2 rounded">Delete Tour</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTour;
