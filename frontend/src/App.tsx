import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import { useAppContext } from "./contexts/AppContext";
// import AddTours from "./pages/AddTours";
// import MyTour from "./pages/MyTour";
// import EditTour from "./pages/EditTour";
// import DeleteTour from "./pages/DeleteTour";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import MyBooking from "./pages/MyBooking";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import AdminNavigator from "./navigator/AdminNavigator";
import HomePage from "./pages/HomePage";


const App = () => {
  const {userData,isLoggedIn} = useAppContext()
  const isAdmin=userData&&userData.user?.role==='admin'
  console.log(isAdmin)
  if(isAdmin) return <AdminNavigator />
  return (
    <div className="">
        <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/signin" element={<SignIn />} />
         <Route path="/searchtour" element={<Search/>} />
         {/* <Route path="/get-tour" element={<MyTour />} /> */}
            {/* <Route path="/details/$"/> */}
            <Route path="/details/:tourId"  element={<Details/>}/>
            <Route path="/search-tour/:tourId/booking" element={<Booking/>}/>

        {isLoggedIn && (
          <>
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chats/:id" element />

          {/* <Route path="/search-tour/:tourId/booking" element={<Booking/>}/> */}
            {/* <Route path="/addtour" element={<AddTours />} /> */}
            {/* <Route path="/get-tour" element={<MyTour />} /> */}
            {/* <Route path="/edit-tour/:tourId" element={<EditTour />} />
            <Route path="/delete-tour/:tourId" element={<DeleteTour />} /> */}
           <Route path="/my-bookings" element={<MyBooking/>}/>
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
