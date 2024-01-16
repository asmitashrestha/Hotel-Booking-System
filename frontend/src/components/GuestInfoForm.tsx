import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import { useSearchContext } from "../contexts/SearchContext";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {
  tourId: string;
  pricePerPackage: number;
};

type GuestInfoFormData = {
  bookDate: Date;
  countPeople: number;
};

const GuestInfoForm = ({ tourId, pricePerPackage }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      countPeople: search.countPeople,
      bookDate: search.bookDate,
    },
  });

  const checkIn = watch("bookDate");
  const minDate = new Date();

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues("", data.countPeople, data.bookDate);
    navigate("/signin", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues("", data.countPeople, data.bookDate);
    navigate(`/search-tour/${tourId}/booking`);
  };

  return (
    <div className="fixed left-2/3 bottom-16 flex flex-col p-4 bg-blue-200 gap-4 rounded-lg shadow-lg">
      <h3 className="text-md font-bold">Rs.{pricePerPackage}</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit): handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("bookDate", date as Date)}
              selectStart
              startDate={checkIn}
              minDate={minDate}
              placeholderText="Enter today date"
              className="min-w-full p-2 bg-white focus:outline-none border border-gray-300 rounded"
              wrapperClassName="min-w-full"
            />
          </div>
          <label className="items-center flex">
            Total People:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
              {...register("countPeople", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one people",
                },
                valueAsNumber: true,
              })}
            />
          </label>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-200 hover:text-black">
              Book Now
            </button>
          ) : (
            <Link
              to={"/signin"}
              className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-200 hover:text-black"
            >
              Sign in to Book
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
