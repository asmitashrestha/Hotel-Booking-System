import React, { useState, useEffect } from 'react';

const UserDetails = ({ tourId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make an HTTP request to fetch user details for the tour
    const fetchUserDetails = async () => {
      console.log("Tourid",tourId);
      
      try {
        const response = await fetch(`http://localhost:5000/api/booking/tour/user-details`,{
          method:"GET",
        });
        console.log("Response",response);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
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

  console.log("Userdetails",userDetails);

  return (
    <div>
      {userDetails && userDetails.map((data, index) => {
console.log("Data",data);

       if(data.bookings.length === 0){
        return
       }
       return (
        <div key={index}>
          <p>Name: {data.bookings[0]?.name}</p>
          <p>Name: {data.bookings[0]?.email}</p>
          <p>Total people:{data.bookings[0]?.countPeople}</p>
          <p>Total people:{data.bookings[0]?.bookDate}</p>
          <img src={`${data.imageUrls[0]}`} alt="" />
        </div>
      )

       }
      )}
    </div>
  );
};

export default UserDetails;
