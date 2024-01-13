import { Link } from "react-router-dom";
import { TourType } from "../../../backend/model/TourModel";
import { AiFillStar } from "react-icons/ai";
type Props = {
  tour: TourType;
};

const SearchResultCard = ({ tour }: Props) => {
  return (
    <div
      className="grid lg:grid-cols-2 sm:grid-cols-1 xl:grid-cols-[2fr_3fr] border 
    border-slate-300 rounded-lg p-8 gap-52 mt-2"
    >
      <div className=" h-[300px] w-[400px]">
        <img
          src={tour.imageUrls[0]}
          className="w-full h-full
        object-cover object-center"
          alt="image"           
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr] ">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: tour.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{tour.type}</span>
          </div>
          <Link to={`/details/${tour._id}`} className="text-2xl font-bold cursor-pointer ">{tour.city}</Link>
        </div>
        <div className="">
          <div className="line-clamp-4">{tour.description}</div>
          <div className="grid grid-cols-2 items-end whitespace-nowrap">
            <div className="flex gap-1 items-center">
              {tour.facilities.slice(0, 3).map((facility,index) => (
                <span key={index}
                  className="bg-slate-300 p-2 rounded-lg font-bold
        text-xs whitespace-nowrap"
                >
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {tour.facilities.length > 3 &&
                  `
      +${tour.facilities.length - 3} more`}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-bold">Rs.{tour.pricePerPackage}</span>
              <Link to={`/details/${tour._id}`} className="bg-blue-600 text-white h-full p-2 fot-bold  max-w-fit hover:bg-blue-400 rounded-md text-sm">View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
