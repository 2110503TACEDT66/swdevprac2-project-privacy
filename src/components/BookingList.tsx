'use client'
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {

    const bookingItems = useAppSelector((state) => state.reduxPersistedReducer.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
        {
            bookingItems.length>0?
            bookingItems.map((item) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={item.id}>
                    <div className="text-xl m-1">{item.name} {item.surname}</div>
                    <div className="text-sm m-1">Id: {item.id}</div>
                    <div className="text-sm m-1">Hospital: {item.hospital}</div>
                    <div className="text-sm m-1">Date: {item.bookDate}</div>
                    <button className='block h-[10%] text-sm rounded-md bg-cyan-800 hover:bg-slate-700 my-2 p-2 text-white shadow-sm' onClick = {() => dispatch(removeBooking(item.id))}>
                        Remove this booking
                    </button>
                </div>
            )) : <div className="m-4 text-cyan-800">No Vaccine Booking</div>
        } 
        </>
    );
}