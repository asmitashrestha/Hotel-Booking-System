import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import TourTypeFilter from "../components/TourTypeFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTourType, setSelectedTourType] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("")
  console.log(search);

  const searchParams = {
    destination: search.destination,
    page: page.toString(),
    stars: selectedStars,
    facilities: selectedFacilities,
    type: selectedTourType,
    sortOption,
  };

  const { data: tourData } = useQuery(["searchTour", searchParams], () => {
    return apiClient.searchTour(searchParams);
  });

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevfacility) =>
      event.target.checked
        ? [...prevfacility, facility]
        : prevfacility.filter((facilities) => facilities !== facility)
    );
  };

  const handleTourTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typetour = event.target.value;

    setSelectedTourType((type) =>
      event.target.checked
        ? [...type, typetour]
        : type.filter((types) => types !== typetour)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />

          <TourTypeFilter
            selectedTourType={selectedFacilities}
            onChange={handleTourTypeChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {tourData?.pagination.total} Tours found
            {search.destination ? `in  ${search.destination}` : ""}
          </span>
        </div>
        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="p-2 border rounded-md "
        >
          <option value="">Sort By</option>
          <option value="starRating">Star Rating</option>
          <option value="pricePerPackageAsc">Price Per Package(Asc)</option>
          <option value="pricePerPackageDesc">Price Per Package(Desc)</option>
        </select>
        {tourData?.data.map((tour, index) => (
          <SearchResultCard key={index} tour={tour} />
        ))}
        <div>
          <Pagination
            page={tourData?.pagination.page || 1}
            pages={tourData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
