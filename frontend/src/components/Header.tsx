import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import Logo from '../assets/logo.jpeg'
const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-600 h-20 p-1">
      <div className="top-bar flex p-3">
        <div className="flex text-center">
          <img src={Logo} alt="" className="logo-imgs"/>
          <Link
            to="/"
            className="ml-1 mt-1 text-white font-bold text-3xl hover:text-green-900"
          >
            Travel<span className="text-green-900">Harbor</span>
          </Link>
          <Link to={'/services'} className=" text-xl font-semibold text-white relative top-3 left-[200px]">Services</Link>
         
        </div>

        <div className="header ml-[550px]">
          {isLoggedIn ? (
            <div className="navs flex p-2 text-white">
              <Link to="/my-bookings" className="mr-4 text-lg font-semibold  hover:text-green-950">
                My Bookings
              </Link>
             <Link to={'/chats'}  className="mr-4 text-lg font-semibold  hover:text-green-950">ChitChat</Link>
              
              <div className="text-xl p-2 relative bottom-5">
                <SignOutButton/>
              </div>
              
            </div>
          ) : (
            <Link
              to="/signin"
              className="ml-auto font-semibold text-xl bg-zinc-400 rounded px-4 py-2 hover:bg-blue-400 hover:text-white"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;