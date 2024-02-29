import React from 'react';
import { MdLogout } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import SignOutButton from '../SignOutButton';

export default function NavBar() {
  return (
  <nav className='w-48 min-h-screen bg-[#272727]
   border-r border-gray-300'>
    <div className='flex flex-col justify-between pl-5 h-screen sticky top-0'>

        <ul className='pl-5'>
            <li>
                <Link to='/'>
                    <img src="#" alt='logo' className='h-14 p-2' />
                </Link>
            </li>

            <li>
                <NavItem to="/">Home</NavItem>
            </li>

            <li>
                <NavItem to="/addtour">Add Tours</NavItem>
            </li>

            <li>
                <NavItem to="/deleTour">Delete Tours</NavItem>
            </li>

        </ul>

        <div className='flex flex-col items-start pb-5'>
                <span className='font-semibold text-white text-xl'>
                    Admin
                </span>
                <div className='flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1'>
                <MdLogout />
                <span>
                    <SignOutButton />
                </span>
                </div>
            </div>
    </div>
  </nav>
  )
}

const NavItem=({children,to})=>{
    const commonClasses= " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
    return(
        <NavLink className={({isActive})=> (isActive?'text-white' :
         'text-gray-400') + commonClasses } to={to}>
            {children}
        </NavLink>
    )
}

