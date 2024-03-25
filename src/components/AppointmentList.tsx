'use client'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Appointment, Appointments, DentistItem } from "../../interface";
import getAppointments from "@/libs/getAppointments";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import deleteAppointment from "@/libs/deleteAppointment";
import LoadingProgress from "./LoadingProgress";
import { useRouter } from "next/navigation";

export default function AppointmentList() {

    const [bookingItems , setBookingItems] = useState<Appointment[]>([]);
    const {data:session} = useSession()
    const [loading, setLoading] = useState(false);
    const [refresh , setRefresh] = useState(false);
    const router = useRouter()
    const [check,setCheck] = useState(false)
    const deletemyAppointment = async(ApptId:string)=>{
      setLoading(true);
      try {
        if(session){
          const res = await deleteAppointment(ApptId,session?.user.token)
          console.log(res);
          setLoading(false);
          setRefresh(!refresh)
        }
      } catch (error) {
        console.log(error);
        setLoading(false)

      }
    }
    useEffect(() => {
        if(session){
            const fetchAppointments = async () => {
              try {
                const data = await getAppointments(session.user.token);
                if(data) setCheck(true);
                setBookingItems(data.data);
                console.log(data.data);
              } catch (error) {
                console.error("Failed to fetch dentists:", error);
              }
            };
        
            fetchAppointments();
        }
      }, [refresh]);

    return (
        <>
        {
            check?
            bookingItems.map((item:Appointment) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={item._id}>
                    <div className="text-xl m-1"></div>
                    <div className="text-sm m-1">Name: {item.user.name}</div>
                    <div className="text-sm m-1">Dentist: {(item.dentist).name}</div>
                    <div className="text-sm m-1">Date: {dayjs(item.apptDate).format("YYYY/MM/DD")}</div>
                    <button className='h-[10%] text-sm rounded-md bg-cyan-800 hover:bg-slate-700 m-2 p-2 text-white shadow-sm' onClick = {() => deletemyAppointment(item._id)}>
                        Remove
                    </button>
                    <button className='h-[10%] text-sm rounded-md bg-cyan-800 hover:bg-slate-700 m-2 p-2 text-white shadow-sm' onClick = {() => router.replace(`/appointment/${item._id}`)}>
                        Edit
                    </button>
                </div>
            )) : <div className="m-4 text-cyan-800">No Appointment</div>
        } 
        <LoadingProgress show={loading} />
        </>
    );
}