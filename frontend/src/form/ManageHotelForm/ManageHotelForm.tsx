import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    contact: number;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
};

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;


    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);
    
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        //  create new form data object and call our api
        const formData = new FormData();

        if (hotel) {
          formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("contact", formDataJson.contact.toString());
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("type", formDataJson.type);
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        });
// [image1.jpg, image2.jpg, imnage3.jpg] => user delete 2
//  imageUrls =  [image1.jpg]
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
            formData.append(`imageUrls[${index}]`, url);
            });
           
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile)
        });

        onSave(formData);
    });
   
    return (
   <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
           <button 
               disabled={isLoading}
               type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-lg disabled:bg-gray-500">
                {isLoading ? "Saving" : "Save"}
            </button>
        </span>
      </form>
   </FormProvider>
    
  );
};

export default ManageHotelForm;