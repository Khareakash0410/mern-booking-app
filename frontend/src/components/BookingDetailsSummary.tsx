import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({ 
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
    hotel,
}: Props) => {
    return(
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
        <h2 className="text-xl font-bold">
          Your Booking Details
        </h2>
        <div className="border-b py-2">
           Location: 
           <div className="font-bold text-sm">
              {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
           </div>
           <div className="flex justify-between">
                <div>
                    Check-in 
                    <div className="font-bold text-sm">
                         {checkIn.toDateString()}
                    </div>
                </div>

                <div>
                    Check-out 
                    <div className="font-bold text-sm">
                         {checkOut.toDateString()}
                    </div>
                </div>
           </div>
        </div>

        <div className="border-t border-b py-2">
           Total Duration of Stay: 
           <div className="font-bold text-sm">
              {numberOfNights} days & nights
           </div>
        </div>

        <div>
            Guests 
             <div className="font-bold text-sm">
                {adultCount} adults & {childCount} children
             </div>
        </div>
     </div>
    );
   
};

export default BookingDetailsSummary;