import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import TotalTraveller from "./TotalTraveller";
import ImagesSection from "./ImagesSection";
import { TourType } from "../../../../backend/model/TourModel";
import { useEffect } from "react";

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

type Props = {
  tour?: TourType;
  onSave: (tourFormData: FormData) => void;
  isLoading: boolean;
};

const ManagePackageForm = ({ onSave, isLoading, tour }: Props) => {
  const formMethods = useForm<TourFormData>();

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(tour);
  }, [tour, reset]);

  const onSubmit = handleSubmit((formDataJson: TourFormData) => {
    // create new formData & call our API
    // console.log(formData);
    const formData = new FormData();
    if (tour) {
      formData.append("tourId", tour._id);
    }
    formData.append("city", formDataJson.city);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerPackage", formDataJson.pricePerPackage.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("countPeople", formDataJson.countPeople.toString());
    

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
  });

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
            disabled={isLoading}
            type="submit"
            className="px-6 py-3 rounded bg-blue-700 m-4 hover:text-blue-700 hover:bg-white font-bold text-xl
             disabled:bg-gray-500"
          >
            {isLoading ? "Posting...." : "Post"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManagePackageForm;
