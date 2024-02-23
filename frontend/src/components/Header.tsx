import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 h-30 p-7">
      <div className="top-bar flex p-3">
        <div>
          <Link
            to="/"
            className="ml-7 font-bold text-3xl hover:text-blue-400"
          >
            TravelHarbor.com
          </Link>
        </div>

        <div>
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="mr-4">
                My Bookings
              </Link>
              <Link to="/get-tour" className="mr-4">
                Get Tour
              </Link>
              <Link to="/chats" className="mr-4">
                ChatChit
              </Link>
              <SignOutButton />
            </>
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
      <div className="title text-white">
        <h1 className="text-3xl font-bold ml-72">Find your next stay</h1>
        <p className="ml-72 font-semibold">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};

export default Header;
