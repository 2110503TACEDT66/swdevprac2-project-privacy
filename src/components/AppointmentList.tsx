'use client'
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { useEffect, useState } from "react";
import { Appointment, Appointments, DentistItem } from "../../interface";
import getAppointments from "@/libs/getAppointments";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

export default function AppointmentList() {
    const [bookingItems , setBookingItems] = useState<Appointment[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const {data:session} = useSession()
    useEffect(() => {
        if(session){
            const fetchAppointments = async () => {
              try {
                const data = await getAppointments(session.user.token);
                setBookingItems(data.data);
                console.log(data.data);
              } catch (error) {
                console.error("Failed to fetch dentists:", error);
              }
            };
        
            fetchAppointments();
        }
      }, []);

    return (
        <>
        {
            bookingItems.length>0?
            bookingItems.map((item:Appointment) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={item._id}>
                    <div className="text-xl m-1"></div>
                    <div className="text-sm m-1">Id: {item._id}</div>
                    <div className="text-sm m-1">Dentist: {(item.dentist).name}</div>
                    <div className="text-sm m-1">Date: {dayjs(item.apptDate).format("YYYY/MM/DD")}</div>
                    <button className='h-[10%] text-sm rounded-md bg-cyan-800 hover:bg-slate-700 m-2 p-2 text-white shadow-sm' onClick = {() => dispatch(removeBooking(item._id))}>
                        Remove
                    </button>
                    <button className='h-[10%] text-sm rounded-md bg-cyan-800 hover:bg-slate-700 m-2 p-2 text-white shadow-sm' onClick = {() => dispatch(removeBooking(item._id))}>
                        Edit
                    </button>
                </div>
            )) : <div className="m-4 text-cyan-800">No Appointment</div>
        } 
        </>
    );
}