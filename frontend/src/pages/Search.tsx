import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client'
import { useState } from "react";

const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  console.log(search);

  const searchParams = {
    destination: search.destination,
    page: page.toString()
  }

  const { data: tourData } = useQuery(["searchTour", searchParams] , () =>{
    apiClient.searchTour(searchParams)
  })
  
  return (
    <div>
      search page
    </div>
  )
}

export default Search
