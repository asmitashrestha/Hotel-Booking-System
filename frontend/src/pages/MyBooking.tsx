// import React from "react";
// import * as apiClient from "../api-client";
// import { useQuery } from "react-query";

// const MyBooking = () => {
//   const { data: tours } = useQuery(
//     "fetchMyBookings",
//     apiClient.fetchMyBookings
//   );

//   if (!tours || tours.length === 0) {
//     return <span>No bookings found</span>;
//   }
//   return (
//     <div className="pb-10 flex flex-wrap justify-center text-center">
//       <div className="flex justify-center text-center p-5 ">
//               <h1 className="text-3xl font-bold ">My Bookings</h1>
//       </div>
//       {tours.map((tour, index) => (
//         <div
//           key={index}
//           className=" mt-20"
//         >
//           <div className="flex">
//            <div className="flex flex-wrap border border-gray-300 p-8 rounded-3xl ">
//              <div className="bl:w-full lg:h-[250px] ">
//             <img
//               src={tour.imageUrls[0]}
//               alt="tour image"
//               className="
//   h-[250px] object-cover object-center mr-10"
//             />
//           </div>
//             <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
//            <div className="text-2xl font-bold">
//             {
//               tour.city
//             }
//            </div>
//            {
//             tour.bookings.map((booking,index)=>(
//               <div key={index}>
//                 <div>
//                   <span className="font-bold mr-2">Dates: </span>
//                   <span>{new Date(booking.bookDate).toDateString()}</span>
//                 </div>
//                 <span className="font-bold mr-2">Guests:</span>
//                 <span>
//                   {
//                     booking.countPeople
//                   }
//                 </span>
//               </div>
//             ))
//           }
//           </div>
//           </div> 
//           </div>
          
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyBooking;



import React from "react";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

const MyBooking = () => {
  const { data: tours } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!tours || tours.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="pb-10 text-center pl-7">
      <div className="p-5">
        <h1 className="text-3xl font-bold">My Bookings</h1>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, index) => (
          <div key={index} className="border border-gray-300 rounded-xl overflow-hidden">
            <img
              src={tour.imageUrls[0]}
              alt="tour image"
              className="h-60 w-full object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{tour.city}</h2>
              {tour.bookings.map((booking, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span className="font-bold">Dates:</span>
                  <span>{new Date(booking.bookDate).toDateString()}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="font-bold">Guests:</span>
                <span>{tour.bookings.reduce((acc, cur) => acc + cur.countPeople, 0)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;


