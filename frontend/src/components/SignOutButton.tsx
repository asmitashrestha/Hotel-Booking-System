import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      console.log("Signout!");
      toast.success("signout!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
      });
      navigate('/');
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error("Signout Failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
        hideProgressBar: false,
      });
    },
  });
  


  const handleClick = ()=>{
    mutation.mutate()
  }
  
  return (
    <div>
      <button onClick={handleClick} className="text-gray-800 px-3 py-[9px] rounded-lg font-semibold text-xl bg-white hover:bg-gray-500">Sign Out</button>
      <ToastContainer/>
    </div>
  )
}

export default SignOutButton
