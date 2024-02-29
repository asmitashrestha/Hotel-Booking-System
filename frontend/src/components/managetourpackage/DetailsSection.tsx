import { useFormContext } from "react-hook-form"
import { TourFormData } from "./ManagePackageForm"


const DetailsSection = () => {
  const {register, formState:{
    errors
  }} = useFormContext<TourFormData>()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3 text-center mt-2 text-gray-700 font-serif">Tour Details</h1>
   
      <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900 p-4"
                  >
                    City
                  </label>
                </div>
                <div className="mt-2 p-4">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="current-city"
                    {...register("city", {
                      required: "This field is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city && (
                  <span className="text-red-600">{errors.city.message}</span>
                )}
                </div>

                <div className="flex items-center justify-between mt-2 p-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                </div>
                <div className="mt-2 p-4">
                  <textarea
                    id="description"
                    name="description"
                  rows={10}
                  
                    autoComplete="current-description"
                    {...register("description", {
                      required: "This field is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   {errors.description && (
                  <span className="text-red-600">{errors.description.message}</span>
                )}
                </div>

                <div className="flex items-center justify-between mt-2 p-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price 
                  </label>
                </div>
                <div className="mt-2 p-4">
                  <input 
                  type="number"
                    id="price"
                    name="price"  
                    min={1}             
                    autoComplete="current-price"
                    {...register("pricePerPackage", {
                      required: "This field is required",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   {errors.pricePerPackage&& (
                  <span className="text-red-600">{errors.pricePerPackage.message}</span>
                )}
                </div>


                <div className="flex items-center justify-between mt-2 p-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                   Star Rating
                  </label>
                </div>
                <div className="mt-2 p-4  ">
                  <select name="rating" id="rating"
                  {...register("starRating",{
                    required:"This field is required"
                  })} className="text-sm font-bold w-full">
                    <option value="" className="text-sm font-bold ">
                      Select as Rating
                    </option>
                    {
                      [1,2,3,4,5].map((num,index) =>(
                        <option key={index} value={num}>{num}</option>
                      ))
                    }
                    
                  </select>
                   {errors.starRating && (
                  <span className="text-red-600">{errors.starRating.message}</span>
                )}
                </div>

               
</div>

              </div>
    
  )
}

export default DetailsSection
