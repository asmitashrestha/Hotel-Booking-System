import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  console.log(search);

  const searchParams = {
    destination: search.destination,
    page: page.toString(),
  };

  const { data: tourData } = useQuery(["searchTour", searchParams], () => {
     return apiClient.searchTour(searchParams);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {tourData?.pagination.total} Tours found
            {search.destination ? `in  ${search.destination}` : ""}
          </span>
         
        </div>
      {/* Todo operations */}
        {tourData?.data.map((tour,index) => (
          <SearchResultCard key={index} tour={tour} />
        ))}
        <div>
          {/* <Pagination page={tourData?.pagination.page || 1} 
          pages={tourData?.pagination.pages || 1} 
          onPageChange={(page) => setPage(page) }/> */}
          <Pagination page={tourData?.pagination.page || 1} pages={tourData?.pagination.pages || 1} onPageChange={(page) => setPage(page)} />

        </div>
      </div>
    </div>
  );
};

export default Search;
