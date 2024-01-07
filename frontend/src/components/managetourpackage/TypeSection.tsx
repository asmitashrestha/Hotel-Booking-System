import { useFormContext } from 'react-hook-form';
import { TourType } from '../../config/TourType';
import { TourFormData } from './ManagePackageForm';

const TypeSection = () => {
  const { register, watch, formState:{
    errors
  } } = useFormContext<TourFormData>();
  const typeWatch =watch('type')

  return (
    <div className='mt-7 p-4'>
      <h2 className='text-2xl font-bold mb-3'>Type</h2>
      <div className='grid grid-cols-5 gap-2'>
        {TourType.map((type, index) => (
          <label key={index} className={
            typeWatch === type ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-3 font-semibold ":"cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2"
          }
       >
            <input
            className='hidden'
              type="radio"
              value={type}
              {...register('type', {
                required: 'This field is required',
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {
        errors.type && (
          <span className='text-red-500 text-sm font-bold'>
            {errors.type.message}
          </span>
        )
      }
    </div>
  );
};

export default TypeSection;
