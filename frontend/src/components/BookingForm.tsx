import { useForm } from "react-hook-form";
import { UserType } from "../../../backend/shared/types";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  name: string;
  email: string;
};
const BookingForm = ({ currentUser }: Props) => {
  const { handleSubmit, register } = useForm<BookingFormData>({defaultValues: {
    name:currentUser.name,
    email:currentUser.email,
  }});
  return (
    <form
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
            {
              ...register("name")
            }
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {
              ...register("email")
            }
          />
        </label>
      </div>
    </form>
  );
};

export default BookingForm;
