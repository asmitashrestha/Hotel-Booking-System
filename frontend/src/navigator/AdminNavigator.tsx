import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import SignIn from "../pages/SignIn";
import NavBar from "../components/admin/NavBar";
import AddTours from "../components/admin/AddTours";
import EditTour from "../pages/EditTour";
import DeleteTour from "../pages/DeleteTour";
import MyBooking from "../pages/MyBooking";
import MyTour from "../pages/MyTour";
import Booking from "../pages/Booking";
import { useAppContext } from "../contexts/AppContext";
import UserDetails from "../components/admin/BookingUserDetails";
import '../index.css'
import ChatPage from "../components/chatPage";
export default function AdminNavigator() {
  const {isLoggedIn} = useAppContext()
  return (
    <div className="flex">
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      <div className="flex-1 p-2 max-w-screen-xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/search-tour/:tourId/booking" element={<Booking/>}/> */}
          <Route path="/addtour" element={<AddTours />} />
          <Route path="/get-tour" element={<MyTour />} />
          <Route path="/edit-tour/:tourId" element={<EditTour />} />
          <Route path="/delete-tour/:tourId" element={<DeleteTour />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          {
            isLoggedIn && <>
             <Route path="/fetch-user-details" element={<UserDetails tourId={''} />} />
          <Route path="/search-tour/:tourId/booking" element={<Booking />} />
          <Route path="/chats" element={<ChatPage/>}/>
            </>
          }
         
        </Routes>
      </div>
    </div>
  );
}
