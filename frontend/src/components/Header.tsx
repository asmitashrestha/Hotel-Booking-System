import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="bg-blue-800 h-30 p-7">
      <div className="top-bar flex p-3 ">
        <Link to='/' className=" ml-72 font-bold text-3xl hover:text-blue-400">TravelHarbor.com</Link>
         <Link to='/signin' className="ml-96 font-semibold text-xl bg-zinc-400 rounded px-4 py-2 
        hover:bg-blue-400 hover:text-white">Sign In</Link>
      </div>
      <div className="title text-white">
        <h1 className=" text-3xl font-bold ml-72">Find your next stay</h1>
        <p className="ml-72 font-semibold">Search low prices on hotels for your dream vacation...</p>
      </div>
    </div>
  )
}

export default Header
