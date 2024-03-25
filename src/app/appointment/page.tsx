'use client'
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import DentistDateReserve from "@/components/DentistDateReserve";
import addAppointment from "@/libs/addAppointment";
import { useSession } from "next-auth/react";
import LoadingProgress from "@/components/LoadingProgress";

export default function Booking() {
    const { data : session } = useSession();

    const [bookingDentist, setBookingDentist] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(false);
    
    const makeAppointment = async () => {
        setLoading(true);
        if(session){
            if(bookingDate!==null && bookingDentist!==""){
                await addAppointment(dayjs(bookingDate).format("YYYY/MM/DD"), bookingDentist, session?.user._id, session?.user.token);
                setBookingDate(null); 
                setBookingDentist("");
                setLoading(false);
            }
        }
        setLoading(false);
    }

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-[20px] m-5 font-bold text-[#107557] rounded-lg p-3">Make an Appointment</h1>
            <form className="w-[40vw] h-auto bg-[#BED7CF] justify-center rounded-lg flex flex-col p-10">
                <DentistDateReserve onDateChange={(value:Dayjs) => {setBookingDate(value)}} onDentistChange={(value:string) => {setBookingDentist(value)}}/>
                <button name='Book Vaccine' type="button" 
                className="font-semibold bg-cyan-700 text-yellow-100 rounded-md m-3 p-3" onClick={makeAppointment}>Book Vaccine</button>
            </form>
            <LoadingProgress show={loading} />
        </main>
    )
}