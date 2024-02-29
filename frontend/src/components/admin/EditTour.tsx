import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import * as apiClient from '../../api-client'
import ManagePackageForm from "../../components/managetourpackage/ManagePackageForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTour = () => {
  const navigate = useNavigate()
  const { tourId } = useParams()

  const { data: tour } = useQuery("fetchTourById", () =>
  apiClient.fetchTourById(tourId || ''), {
    enabled: !!tourId,
  })
  const { mutate, isLoading } = useMutation(apiClient.updateMyTourById, {
    onSuccess: ()=>{
      navigate('/')
toast.success("Updated successfully!")
    },
    onError: () =>{
toast.error("Error occured")
    }
  })

  const handleSave =(tourFormData: FormData) =>{
    mutate(tourFormData)
  }



  return (
    <div>
      <ManagePackageForm tour= {tour} onSave={handleSave} isLoading={isLoading}/>
      <ToastContainer/>
    </div>
  )
}

export default EditTour
