import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate()

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
      console.log("Signout!");
      toast.success("signout!", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
      navigate('/')
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error("Signout Failed", {
        position: toast.POSITION.TOP_RIGHT, // Adjust based on your desired position
        autoClose: 500, // Adjust the duration the toast is displayed
        hideProgressBar: false,
      });
    },
  });

  const handleClick = ()=>{
    mutation.mutate()
  }
  
  return (
    <div>
      <button onClick={handleClick} className="text-blue-500 px-3 font-bold bg-white hover;bg-gray-100">Sign Out</button>
      <ToastContainer/>
    </div>
  )
}

export default SignOutButton
