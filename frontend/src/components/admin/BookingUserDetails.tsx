import React, { useState, useEffect } from "react";

const UserDetails = ({ tourId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make an HTTP request to fetch user details for the tour
    const fetchUserDetails = async () => {
      console.log("Tourid", tourId);

      try {
        const response = await fetch(
          `http://localhost:5000/api/booking/tour/user-details`,
          {
            method: "GET",
          }
        );
        console.log("Response", response);

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserDetails(data.userDetails);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserDetails(); // Pass the tourId parameter
  }, [tourId]); // Include tourId in the dependency array

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Userdetails", userDetails);

  return (
    <div className="tour-detail ">
      <h1 className="flex justify-center text-center text-2xl pb-14 pt-1 font-mono text-green-800 font-bold">Booking User Details</h1>
      <div className="flex flex-wrap justify-center" >
        {userDetails &&
        userDetails.map((data, index) => {
          console.log("Data", data);

          if (data.bookings.length === 0) {
            return;
          }
          return (
            <div key={index}  className="">
              <div className="detail-container
               p-5 w-[320px]">
                <img
                  src={`${data.imageUrls[0]}`}
                  alt=""
                  className="tour-img rounded "
                />
                <div className="flex mt-3 justify-between text-sm font-semibold text-gray-900">
                  <p>Name: {data.bookings[0]?.name}</p>
                  <p>Guest: {data.bookings[0]?.countPeople}</p>
                </div>
                <div className="text-sm font-bold mt-1">
                  <p>
                    Email:{" "}
                    <span className="text-green-950">
                      {data.bookings[0]?.email}
                    </span>{" "}
                  </p>
                  <p className="mt-1">
                    Book Date:{" "}
                    <span className="text-green-950">
                      {data.bookings[0]?.bookDate}
                    </span>{" "}
                  </p>
                </div>
                <div className="flex text-sm justify-between font-bold mt-1">
                  <p>Location: {data.city}</p>
                  <p>Total cost: Rs.{data.bookings[0]?.totalCost}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default UserDetails;
