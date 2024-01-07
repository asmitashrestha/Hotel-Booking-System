import { useFormContext } from "react-hook-form";
import { TourFormData } from "./ManagePackageForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TourFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Upload Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length || 0; // Handle null or undefined
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
