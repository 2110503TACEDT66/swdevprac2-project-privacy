'use client'
import { Button, MenuItem, Select, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Appointment } from "../../interface"; 
import DentistDateReserve from "@/components/DentistDateReserve";
import { useSession } from "next-auth/react";
import LoadingProgress from "@/components/LoadingProgress";
import editmyAppointment from "@/libs/editAppointmentDate";
import { useRouter } from "next/navigation";

export default function EditmyAppt({apptId,DentistName,DateAppt,onRefresh}:{apptId:string,DentistName:string,DateAppt:Date,onRefresh:Function}) {
    const { data : session } = useSession();
    const editApptkub = {
        DentistName:DentistName,
        ApptDate:DateAppt
    }
    const [bookingDentist, setBookingDentist] = useState<string>(DentistName);
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(dayjs(DateAppt));
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    
    const editAppointment = async () => {
        setLoading(true);
        if(session){
            if(bookingDate!==null && bookingDentist!==""){
                    var re = await editmyAppointment(apptId,session.user.token,{date:dayjs(bookingDate).format("YYYY/MM/DD"), dentistId:bookingDentist});

                
                console.log(re);
                setLoading(false);
                onRefresh(true)
            }
        }
        setLoading(false);
    }

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-[20px] m-5 font-bold text-[#107557] rounded-lg p-3">Edit an Appointment</h1>
            <form className="w-[40vw] h-auto bg-[#BED7CF] justify-center rounded-lg flex flex-col p-10">
                <DentistDateReserve onDateChange={(value:Dayjs) => {setBookingDate(value)}} onDentistChange={(value:string) => {setBookingDentist(value)}} editAppt={editApptkub}/>
                <button name='Book Vaccine' type="button" 
                className="font-semibold bg-[#107557] text-yellow-100 rounded-md m-3 p-3" onClick={editAppointment}>Book Vaccine</button>
            </form>
            <LoadingProgress show={loading} />
        </main>
    )
}