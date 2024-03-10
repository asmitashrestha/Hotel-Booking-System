import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../backend/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useAppContext } from "../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  name: string;
  email: string;
  countPeople: number;
  bookDate: string;
  tourId: string;
  paymentIntentId: string;
  totalCost: number;
};
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { tourId } = useParams();

  const { mutate: bookTour , isLoading} = useMutation(apiClient.createTourBooking, {
    onSuccess: () => {
      toast.success("Tour Booked");
    },
    onError: (error) => {
      toast.error("No seat available");
    console.log("Toast error message",error);
        },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      countPeople: search.countPeople,
      bookDate: search.bookDate.toISOString(),
      tourId: tourId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements ) {
      return;
    } 
    const result = await stripe.confirmCardPayment(paymentIntent.clientsecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
  
    if (result.paymentIntent?.status === "succeeded") {
      bookTour({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border
     border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid mb-4">
        <label className="text-gray-700 text-sm font-bold flex-1 mb-4">
          Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("name")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost:Rs.{(paymentIntent.totalCost*search.countPeople).toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment details</h3>
        <CardElement id="payment-element" className="rounded-md p-2 text-sm" />
      </div>
      <div className="flex justify-end">
        <button
        disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold
           hover:bg-blue-500 disabled:bg-gray-500 "
        >
          {
            isLoading ? "Saving...." : "Confirm Booking"
          }
          
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default BookingForm;
