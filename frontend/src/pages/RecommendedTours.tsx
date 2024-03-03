import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import { fetchRecommendedTours } from "../api-client";

const Search = () => {
  const search = useSearchContext();
  const [recommendedTours, setRecommendedTours] = useState<any[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetchRecommendedTours(search.location, search.tourType, search.budget);
        if (response.success) {
          setRecommendedTours(response.recommendations.map(item => item.tour));
        } else {
          console.error('Error fetching recommended tours:', response);
        }
      } catch (error) {
        console.error("Error fetching recommended tours:", error);
      }
    };

    fetchTours();
  }, [search.location, search.tourType, search.budget]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">
          {recommendedTours.length} Recommended Tours
        </span>
      </div>
      {recommendedTours.map((tour, index) => (
        <SearchResultCard key={index} tour={tour} />
      ))}
    </div>
  );
};

export default Search;
