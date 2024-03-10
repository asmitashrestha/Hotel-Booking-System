import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  


  const mutation = useMutation(apiClient.register, {
    onSuccess:async () => {
      console.log("Registration successful!");
      await queryClient.invalidateQueries("validateToken")
      toast.success("Registration successful!", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
      navigate('/verify-email')
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error("User already exists", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
    },
  });
  

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <>
      <div className="">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="current-username"
                    {...register("name", {
                      required: "This field is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="current-email"
                    {...register("email", {
                      required: "This field is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="current-password"
                    {...register("confirmPassword", {
                      validate: (val) => {
                        if (!val) {
                          return "This field is required";
                        } else if (watch("password") !== val) {
                          return "Your password do not match";
                        }
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
                <ToastContainer/>
              </div>
            </form>
          </div>

          <div className="register flex justify-center">
            <p className="mt-7 mr-2">Already have an account</p>
            <Link to="/signin" className="pt-7 text-blue-900 ">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
