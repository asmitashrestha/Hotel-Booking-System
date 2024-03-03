import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-600 h-20 p-1">
      <div className="top-bar flex p-3">
        <div className="flex text-center">
          <Link
            to="/"
            className="ml-5 font-bold text-3xl hover:text-green-900"
          >
            TravelHarbor.com
          </Link>
        </div>

        <div className="header ml-[550px]">
          {isLoggedIn ? (
            <div className="navs flex p-2">
              <Link to="/my-bookings" className="mr-4 text-xl font-semibold text-gray-800 hover:text-green-950">
                My Bookings
              </Link>
             <Link to={'/chats'}>ChitChat</Link>
              
              <div className="text-xl p-3 relative bottom-5">
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
