import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";

export type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const mutation = useMutation(apiClient.forgotPassowrd, {
    onSuccess: async () => {
      toast.success("Password reset link sent to your email successfully!", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
      navigate("/signin")
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error("Failure in verifying Email", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    mutation.mutate(data); // Pass the entire form data object
  };

  return (
    <div className='rounded flex justify-center bg-slate-300 h-[1000px]'>
      <div className="m-40 flex h-[250px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2">
            <p className="pt-4 pl-2 font-bold text-xl text-blue-950">Reset Password</p>
            <p className='py-2 px-2 font-sans text-gray-800'>Enter your mail and check your mail</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block pl-2 text-sm font-semibold leading-4 text-gray-800"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <IoIosMail className="absolute top-3 left-2 text-gray-800 text-lg" />
                    <input
                      {...register("email", { required: true })} // Register the input field
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className="block w-[360px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2"
                    />
                  </div>
                </div>
                {errors.email && <p className="text-red-500">Email is required.</p>} {/* Display error message if email is not provided */}
              </div>
              <div className="flex justify-center text-center mt-7 mr-5">
                <button type="submit" className='bg-blue-800 rounded w-[360px] p-3 text-white text-sm hover:text-blue-950 hover:bg-white hover:font-bold'>Send Reset Email</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
