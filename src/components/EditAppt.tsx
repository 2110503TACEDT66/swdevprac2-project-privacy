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
    const [error, setError] = useState<string>("");
    const editAppointment = async () => {
        setLoading(true);
        if (session) {
            if (bookingDate !== null && bookingDentist !== "") {
              const currentDate = dayjs();
              const selectedDate = dayjs(bookingDate);
              if (selectedDate.isAfter(currentDate, 'day')) { 
                await editmyAppointment(apptId,session.user.token,{date:dayjs(bookingDate).format("YYYY/MM/DD"), dentistId:bookingDentist})
                
              } else {
                setError("Cannot book appointment for past dates.");
                setLoading(false);
                return;
              }
            }
          }
        setLoading(false);
    }

    return (
        <main className="flex flex-col items-center bg-amber-50 bg-opacity-75 p-2 rounded-lg">
            <h1 className="text-[35px] m-auto font-bold text-teal-900 rounded-lg pt-4">Edit an Appointment</h1>
            <form className="w-[60vw] justify-center rounded-lg flex flex-col p-10">
                <div className="flex-grow flex flex-col justify-center ml-14 ">
                    <DentistDateReserve onDateChange={(value:Dayjs) => {setBookingDate(value)}} onDentistChange={(value:string) => {setBookingDentist(value)}} editAppt={editApptkub}/>
                </div>
                <button name='Book Vaccine' type="button" 
                className="font-semibold bg-teal-900 text-amber-50 rounded-md m-3 p-3 hover:bg-teal-700" onClick={editAppointment}>Edit Appointment</button>
                {error && (
            <div className="text-center bg-rose-700 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
            </form>
            <LoadingProgress show={loading} />
        </main>
    )
}