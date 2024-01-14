import { useForm } from "react-hook-form";

type Props = {
  tourId: string;
  pricePerPackage: number;
};

type GuestInfoFormData = {
  bookDate: Date;
  countPeople: number;
};

const GuestInfoForm = ({ tourId, pricePerPackage }: Props) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>();

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">Rs.{pricePerPackage}</h3>
      <form>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date as Date)}
              selectStart
              startDate={checkIn}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Enter today date"
              className="min-w-full bg-white p-2 focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
