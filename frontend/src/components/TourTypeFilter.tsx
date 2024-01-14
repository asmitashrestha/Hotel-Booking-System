import {  TourType } from "../config/TourType";

type Props = {
  selectedTourType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TourTypeFilter = ({ selectedTourType, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2 ">Facilities</h4>
      {TourType.map((type, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedTourType.includes(type)}
            onChange={onChange}
          />
          <span>{type} </span>
        </label>
      ))}
    </div>
  );
};

export default TourTypeFilter;
