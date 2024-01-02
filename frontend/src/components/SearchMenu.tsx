
const SearchMenu = () => {
  return (
    <div className=''>
      <div className="search-bar bg-gray-300 flex justify-center text-center">
        <div className="search-container p-4 ">
          <input type="text" value="Mustang" className="outline-none bg-slate-400 ml-4 px-4 py-2 rounded-md"/>
        <input type="text" value="check-in/check-out date" className="outline-none bg-slate-400 ml-4
        px-4 py-2 rounded"/>
        <input type="text" value="0  adult 0 children" className="outline-none bg-slate-400 ml-4 px-4 py-2 rounded"/>
        <button className="outline-none font-bold bg-blue-400 ml-4 px-4 py-2 rounded">Search</button>
        </div>
        
      
      </div>
    </div>
  )
}

export default SearchMenu
