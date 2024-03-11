import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../components/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetails from "../components/BookingDetails";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { tourId } = useParams();
  // const [numberOfDay, setNumberOfDay] = useState<number>(0)
  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () => apiClient.createPaymentIntent(tourId as string),

    {
      enabled: !!tourId,
    }
  );

  const { data: tour } = useQuery(
    "fetchTourById",
    () => apiClient.fetchTourById(tourId as string),
    {
      enabled: !!tourId,
    }
  );

  const { data: currentUser } = useQuery(
    "bookingDetailsUser",
    apiClient.bookingDetailsUser
  );
  // console.log(currentUser?.email);

  if (!tour) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] p-7">
      <div className="bg-slate-400 w-[500px] mr-4 rounded-md">
        {currentUser && (
          <BookingDetails
            bookDate={search.bookDate}
            countPeople={search.countPeople}
            tour={tour}
          />
        )}
      </div>
      {currentUser && paymentIntentData && (
        //
        <Elements stripe={stripePromise}>
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
