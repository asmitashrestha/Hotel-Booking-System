import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation,useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../contexts/AppContext";

export type EmailVerificationFormData = {
  userId: string; // Including userId in form data
  OTP: string;
};

const EmailVerification = () => {
  const { userData } = useAppContext();
  const userId = userData?.user?.id || "";
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const { register, handleSubmit, formState: { errors } } = useForm<EmailVerificationFormData>();

  const mutation = useMutation(apiClient.verifyUserEmail, {
    onSuccess: async () => {
      console.log("Email Verified Successfully");
      await queryClient.invalidateQueries("validateToken");
      toast.success("Email verified successfully!", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
      navigate( "/");
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


  const onSubmit = async (data: EmailVerificationFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="rounded flex justify-center bg-slate-300 h-[1000px]">
      <div className="m-40 flex h-[240px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="pt-4 pl-2 font-bold text-xl text-blue-950">
                Email Verification
              </p>
              <div className="">
                {/* Hidden input for userId */}
                <input
                  type="hidden"
                  name="userId"
                  {...register("userId")}
                  value={userId}
                />
                <label
                  htmlFor="OTP"
                  className="block pl-2 mt-2 text-sm font-semibold leading-4 text-gray-800"
                >
                  Enter OTP
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <input
                      id="OTP"
                      name="OTP"
                      type="text"
                      placeholder="Enter your OTP"
                      required
                      {...register("OTP", { required: true })}
                      className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2"
                    />
                  </div>
                  {errors.OTP && <span className="text-red-600">This field is required</span>}
                  <div>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 ml-7 "
                    >
                      Verify Account
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 ml-8 mr-2">Resend OTP</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
