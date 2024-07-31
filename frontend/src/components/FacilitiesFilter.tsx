import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
    return (
      <div className="pb-5 border-b border-slate-300">
         <h4 className="text-md font-semibold mb-2">Facilities</h4>
         {hotelFacilities.map((facility) => (
            <label className="flex items-center space-x-2">
              <input
                  placeholder=""  
                  type="checkbox" 
                  className="rounded" 
                  value={facility}
                  checked={selectedFacilities.includes(facility)} 
                  onChange={onChange}
              />
              <span>{facility}</span>
            </label>
         ))}
      </div>
    );
  };
  
  export default FacilitiesFilter;