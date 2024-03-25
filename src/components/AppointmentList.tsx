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
        <div className="flex flex-col justify-center items-center space-y-4">
          <p className="text-3xl font-bold text-[#107557] py-8">My Appointments</p>
          {bookingItems.length>0? (
            bookingItems.map((item: Appointment) => (
              <div
                className="bg-[#BED7CF] w-[592px] rounded-[17px] px-5 py-4 my-2 flex flex-col sm:flex-row justify-between items-center"
                key={item._id}
              >
                <div className="flex flex-col">
                  <div className="font-semibold text-sm my-1">Name: {item.user.name}</div>
                  <div className="font-semibold text-sm my-1">Dentist: {item.dentist.name}</div>
                  <div className="font-semibold text-sm my-1">Date: {dayjs(item.apptDate).format("YYYY/MM/DD")}</div>
                </div>
                <div className="flex flex-row mt-4 sm:mt-0 space-x-5">
                  <button
                    className="w-[105px] h-[45px]text-sm rounded-md bg-[#D24F4F] hover:bg-slate-700 m-2 p-2 text-white shadow-sm"
                    onClick={() => deletemyAppointment(item._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="w-[105px] h-[45px]text-sm rounded-md bg-[#107557] hover:bg-slate-700 m-2 p-2 text-white shadow-sm"
                    onClick={() => router.replace(`/appointment/${item._id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="m-4 text-cyan-800">No Appointments</div>
          )}
          <LoadingProgress show={loading} />
        </div>
      );
}