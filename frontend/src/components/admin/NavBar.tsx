import { MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "../SignOutButton";
import Logo from '../../assets/logo.jpeg'
export default function NavBar() {
  return (
    <nav
      className="w-48 min-h-screen bg-[#050505]
   border-r border-gray-300"
    >
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul className="pl-7">
          <li>
            <Link to="/">
              <img src={Logo} alt="logo" className="logo-img h-14 p-2 mt-5 mb-3" />
            </Link>
          </li>

          <li className="text-white">
            <NavItem to="/">Home</NavItem>
          </li>

          <li>
            <NavItem to="/addtour">Add Tours</NavItem>
          </li>

          <li>
            <NavItem to={"/get-tour"}>Get Tour</NavItem>
          </li>
          <li>
            <NavItem to={"/chats"}>ChitChat</NavItem>
          </li>
        </ul>

        <div className="flex flex-col items-start pb-5">
          <div className="flex items-center text-white text-sm hover:text-gray-900 transition space-x-1">
            <MdLogout />
            <span>
              <SignOutButton />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
