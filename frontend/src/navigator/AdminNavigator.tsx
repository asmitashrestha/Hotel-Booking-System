import React from 'react';
import {Routes,Route} from "react-router-dom"
import Dashboard from "../components/admin/Dashboard"
import SignIn from '../pages/SignIn';
import NavBar from "../components/admin/NavBar"
import AddTours from '../components/admin/AddTours';
import EditTour from '../pages/EditTour';
import DeleteTour from '../pages/DeleteTour';
import MyBooking from '../pages/MyBooking';

export default function AdminNavigator() {

  return (
    <div className='flex'>
        <NavBar /> 
        <Routes>
            <Route path="/signin" element={<SignIn />} />
        </Routes>

        <div className="flex-1 p-2 max-w-screen-xl">

          <Routes>
              <Route path="/" element={<Dashboard />} />
            {/* <Route path="/search-tour/:tourId/booking" element={<Booking/>}/> */}
              <Route path="/addtour" element={<AddTours />} />
              {/* <Route path="/get-tour" element={<MyTour />} /> */}
              <Route path="/edit-tour/:tourId" element={<EditTour />} />
              <Route path="/delete-tour/:tourId" element={<DeleteTour />} />
              <Route path="/my-bookings" element={<MyBooking/>}/>


              
          </Routes>
        </div>
    </div>
  );
    
}
