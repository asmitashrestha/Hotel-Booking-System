import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import TotalTraveller from "./TotalTraveller";
import ImagesSection from "./ImagesSection";

export type TourFormData = {
  city: string;
  description: string;
  type: string;
  pricePerPackage: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  countPeople: number;
  imageUrls: string[];
};

const ManagePackageForm = () => {
  const formMethods = useForm<TourFormData>();
  const { handleSubmit } = formMethods;
  const onSubmit = handleSubmit((formData:TourFormData)=>{
    // create new formData & call our API
console.log(formData);


  })
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <TotalTraveller />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded bg-blue-700 m-4 hover:text-blue-700 hover:bg-white font-bold text-xl"
          >
            Post
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManagePackageForm;
