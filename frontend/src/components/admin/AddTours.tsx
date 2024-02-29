import { useMutation } from "react-query";
import ManagePackageForm from "../../components/managetourpackage/ManagePackageForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as apiClient from "../../api-client"
import { useNavigate } from "react-router-dom";

const AddTours = () => {
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation(apiClient.addMyTour, {
    onSuccess: async () => {
      navigate('/')
      toast.success("Tour added successfully")
    },
    onError: () => {
      toast.error("Error occur while adding tour")
    },
  });

  const handleTourPost = (tourFormData : FormData) =>{
mutate(tourFormData)
  }

  return (
    <div>
      <ManagePackageForm  onSave = {handleTourPost} isLoading= {isLoading}/>
      <ToastContainer/>
    </div>
  );
};

export default AddTours;
