import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import { useAppContext } from "./contexts/AppContext";
import AddTours from "./pages/AddTours";
import MyTour from "./pages/MyTour";
import EditTour from "./pages/EditTour";
import DeleteTour from "./pages/DeleteTour";
import Search from "./pages/Search";

const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <div className="">
      
        <Header />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn && (
          <>
            <Route path="/addtour" element={<AddTours />} />
            <Route path="/get-tour" element={<MyTour />} />
            <Route path="/edit-tour/:tourId" element={<EditTour />} />
            <Route path="/delete-tour/:tourId" element={<DeleteTour />} />
            <Route path="/searchtour" element={<Search/>} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
