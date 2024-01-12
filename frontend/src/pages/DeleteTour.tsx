import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManagePackageForm from '../components/managetourpackage/ManagePackageForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DeleteTour = () => {
  const navigate = useNavigate()
  const { tourId } = useParams();

  // Fetch the tour by its ID using React Query's useQuery
  const { data: tour } = useQuery('fetchTourById', () =>
    apiClient.fetchTourById(tourId || ''),
    {
      enabled: !!tourId,
    }
  );

 
  const { mutate, isLoading } = useMutation(apiClient.deleteMyTourById, {
    onSuccess: () => {
      navigate('/')
      toast.success("Tour deleted successfully!")
      console.log('Tour deleted successfully!');
      
    },
    onError: () => {
      toast.error("Something went wrong")
      console.log("Error occur can't delete");
      
    },
  });

  // Callback function to trigger the mutation with the necessary data
  const handleSave = (tourFormData: FormData) => {
    mutate(tourFormData);
  };

  return (
    <div>
      {/* Pass the fetched tour, save callback, and loading state to the ManagePackageForm */}
      <ManagePackageForm tour={tour} onSave={handleSave} isLoading={isLoading} />
      <ToastContainer/>
    </div>
  );
};

export default DeleteTour;
