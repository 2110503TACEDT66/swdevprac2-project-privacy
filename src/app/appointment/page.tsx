'use client'
import DentistDateReserve from "@/components/DentistDateReserve";
import addAppointment from "@/libs/addAppointment";
import { useSession } from "next-auth/react";
import LoadingProgress from "@/components/LoadingProgress";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import getAppointment from "@/libs/getAppointment";
import getAppointments from "@/libs/getAppointments";
import { LinearProgress, dividerClasses } from "@mui/material";

export default function Appointment() {
  const { data: session } = useSession();

  const [bookingDentist, setBookingDentist] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [apptItem, setApptItem] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loadingData, setLoadingData] = useState(true);
  const [checkMake, setCheckMake] =useState(true)
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoadingData(true)
      if (session) {
        try {
          const data = await getAppointments(session.user.token);
          setApptItem(data.count);
          setLoadingData(false)
          console.log({ data });
          console.log(session);
        } catch (error) {
          console.error("Failed to fetch appointment:", error);
          setLoadingData(false)
        }
      }
    };

    fetchAppointments();
  }, [session, apptItem, checkMake]);

  if (session?.user.role === "user" && apptItem === 1) {
    return <div className="w-screen h-screen text-[20px] font-bold text-neutral-50 p-80 text-center bg-cover bg-[url('/img/apptcover.jpg')]">
        <h1 className="bg-teal-950 rounded-sm p-3">You have already made an appointment</h1>
    </div>;
  }

  const makeAppointment = async () => {
    setLoading(true);
    
    if (session) {
      if (bookingDate !== null && bookingDentist !== "") {
        const currentDate = dayjs();
        const selectedDate = dayjs(bookingDate);
        if (selectedDate.isAfter(currentDate, 'day')) { 
          await addAppointment(
            selectedDate.format("YYYY/MM/DD"),
            bookingDentist,
            session?.user._id,
            session?.user.token
          );
          if(session?.user.role==='user') setCheckMake(false);
        } else {
          setError("Cannot book appointment for past dates.");
          setLoading(false);
          return;
        }
      }
    }
    setLoading(false);
    
  };

  return (
    <div className="w-screen h-screen bg-cover flex items-center justify-center" style={{backgroundImage: "url('/img/apptcover.jpg')"}}>
      <main>
        {!checkMake && <div className="w-screen h-screen text-[20px] font-bold text-neutral-50 p-80 text-center bg-[url('/img/apptcover.jpg')]">
        <h1 className="bg-teal-950 rounded-sm p-3">You have already made an appointment</h1>
    </div>}
    {loadingData && <LoadingProgress show={true} />}
        {!loadingData && <form className="w-[60vw] bg-amber-50 bg-opacity-75 justify-center rounded-lg flex flex-col p-10">
          <h1 className="text-[35px] m-auto font-bold text-teal-900 rounded-lg p-3 mb-6">
            Make an Appointment
          </h1>
          <div className="flex-grow flex flex-col justify-center ml-14 ">
            <DentistDateReserve
              onDateChange={(value: Dayjs) => {
                setBookingDate(value);
              }}
              onDentistChange={(value: string) => {
                setBookingDentist(value);
              }}
            />
          </div>
          <button
            name="Book Vaccine"
            type="button"
            className="font-semibold bg-teal-900 text-amber-50 rounded-md m-3 p-3 hover:bg-teal-700"
            onClick={makeAppointment}
          >
            Make Appointment
          </button>
          {error && (
            <div className="text-center bg-rose-700 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>}
        <LoadingProgress show={loading} />
      </main>
    </div>
  );
}
