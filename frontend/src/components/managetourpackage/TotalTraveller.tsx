import { useFormContext } from "react-hook-form"

import { TourFormData } from "./ManagePackageForm"


const TotalTraveller = () => {
  const { register,formState:{
    errors
  } } = useFormContext<TourFormData>()
  return (
    <div className="mt-2 p-4">
      <h2 className="text-2xl font-bold ">Total seats</h2>
      <div>
        <input type="number" min={1} className="border rounded w-full py-2 px-4 font-normal"

        {...register("countPeople",{
          required:"This field is required"
        })}/>
        {
          errors.countPeople ?.message && (
          <span className="text-red-500 font-bold">
            {errors.countPeople?.message}
          </span>)
        } 
        
      </div>
    </div>
  )
}

export default TotalTraveller
