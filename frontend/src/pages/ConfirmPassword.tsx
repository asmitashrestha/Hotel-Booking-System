import React from 'react';
import { RiLockPasswordFill } from "react-icons/ri";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ConfirmPasswordFormData = {
  newPassword: string;
  userId: string;
};

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');

  const { register, handleSubmit, formState: { errors } } = useForm<ConfirmPasswordFormData>({
    defaultValues: { userId } // Set the default value for userId
  });

  const mutation = useMutation(apiClient.confirmPassword, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Password changed successfully!", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      })
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message , {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      }); // Display the error message from the backend
    },
  });

  const onSubmit = async (data: ConfirmPasswordFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className='rounded flex justify-center bg-slate-300 h-[1000px]'>
      <div className="m-40 flex h-[250px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2 ">
            <p className="pt-4 pl-2 font-bold text-xl text-blue-950">Change Password</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register("userId")} /> {/* Hidden input field for userId */}
              
              <div className='mt-3'>
                <label
                  htmlFor="new-password"
                  className="block pl-2 text-sm font-semibold leading-4 text-gray-800"
                >
                  New password
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <RiLockPasswordFill className="absolute top-3 left-3 text-gray-800 text-lg" />
                    <input
                      {...register("newPassword", { required: true })}
                      id="new-password"
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter your new password"
                      required
                      className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2"
                    />
                  </div>
                </div>
                {errors.newPassword && <p className="text-red-500">New password is required.</p>}
              </div>
              

              <div className="flex justify-center text-center mt-7 mr-5">
                <button type="submit" className='bg-blue-800 rounded w-[350px] p-3 text-white text-sm hover:text-blue-950 hover:bg-white hover:font-bold ml-2'>Change Account Password</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
