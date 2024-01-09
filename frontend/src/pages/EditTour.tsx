import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManagePackageForm from "../components/managetourpackage/ManagePackageForm"

const EditTour = () => {
  const { tourId } = useParams()

  const { data: tour } = useQuery("fetchTourById", () =>
  apiClient.fetchTourById(tourId || ''), {
    enabled: !!tourId,
  })
  const { mutate, isLoading } = useMutation(apiClient.updateMyTourById, {
    onSuccess: ()=>{

    },
    onError: () =>{

    }
  })

  const handleSave =(tourFormData: FormData) =>{
    mutate(tourFormData)
  }



  return (
    <div>
      <ManagePackageForm tour= {tour} onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default EditTour
