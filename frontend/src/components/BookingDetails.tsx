import { TourType } from "../../../backend/model/TourModel";

type Props = {
  bookDate: Date;
  countPeople: number;
  tour: TourType;
};

const BookingDetails = ({ bookDate, countPeople, tour }: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold ">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <span className="font-bold">{`${tour.city}`}</span>
      </div>
      <div className="flex">
        Book Date:
        <div className="font-semibold">{bookDate.toDateString()}</div>
      </div>
      <div className="flex">
        Total Person:
        <div className="font-semibold">{countPeople}</div>
      </div>
    </div>
  );
};

export default BookingDetails;
