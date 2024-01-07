import { useFormContext } from "react-hook-form";
import { TourFacilities } from "../../config/TourType";
import { TourFormData } from "./ManagePackageForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TourFormData>();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Facilities</h2>
      <div className="grid grid-cols-3 gap-3">
        {TourFacilities.map((facility,index) => (
          <label key={index} className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
