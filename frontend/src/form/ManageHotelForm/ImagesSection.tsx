import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();

 const exisitingImageUrls = watch("imageUrls");
const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
   event.preventDefault();
  
   setValue("imageUrls", exisitingImageUrls.filter((url) => url !== imageUrl)
);
};

  return (
     <div>
        <h2 className="text-2xl font-bold mb-3">
            Images
        </h2>
        <div className="border rounded p-4 flex flex-col gap-4">
          {exisitingImageUrls && (
            <div className="grid grid-cols-6 gap-4">

              {exisitingImageUrls.map((url) => (
                <div className="relative group">
                   <img alt="" src={url} className="min-h-full object-cover" />
                   <button 
                       onClick={(event) => handleDelete(event, url)}
                       className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                        Delete
                    </button>
                </div>
              ))}
            </div>
          )}
           <input 
               type="file" 
               multiple 
               accept="image/*"
               className="w-full text-gray-700 font-normal"
               {...register("imageFiles", {
               validate: (imageFiles) => {
              const totalLength = imageFiles.length + (exisitingImageUrls?.length || 0);
              if (totalLength === 0) {
               return "Please add at least one image";
              }
              if (totalLength > 6) {
                return "Images cannot exceeded than 6";
              }
              return true;
            },
           })} />
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