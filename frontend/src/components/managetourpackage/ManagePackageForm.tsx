import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

export type TourFormData = {
  city:string;
  description:string;
  type:string;
  pricePerPackage:number;
  starRating:number;
  facilities:string[];
  imageFiles: FileList;
  countPeople:number;
}

const ManagePackageForm = () => {
  const formMethods = useForm<TourFormData>();

  return (

      <FormProvider {...formMethods}>
        <form >
      <DetailsSection/>
      <TypeSection/>
      
      <div>
      
  <label htmlFor="facilities" >Facilities</label>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
        <input type="checkbox" id="facilities" name="facilities" value='Free Wifi'/>
      </div>
    </form>
      </FormProvider>
    
   
  )
}

export default ManagePackageForm
