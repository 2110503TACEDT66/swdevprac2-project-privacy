"use client";
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
  const [bookingItems, setBookingItems] = useState<Appointment[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const [check, setCheck] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const deletemyAppointment = async (ApptId: string) => {
    setLoading(true);
    try {
      if (session) {
        const res = await deleteAppointment(ApptId, session?.user.token);
        console.log(res);
        setLoading(false);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const fetchAppointments = async () => {
        setLoadingData(true);
        try {
          const data = await getAppointments(session.user.token);
          if (data) setCheck(true);
          setBookingItems(data.data);
          setLoadingData(false);
          console.log(data.data);
        } catch (error) {
          console.error("Failed to fetch dentists:", error);
          setLoadingData(false);
        }
      };

      fetchAppointments();
    }
  }, [session, refresh]);

  return (
    <div className="w-[60vw] justify-center text-center rounded-lg flex flex-col p-10">
      <p className="text-3xl font-bold text-neutral-50 py-8">My Appointment</p>
      {loadingData && <div className="w-screen h-screen"><LoadingProgress show={true} /></div>}
      {!loadingData && bookingItems.length === 0 && (
        <div className="text-amber-50 text-l">No Appointments</div>
      )}
      {bookingItems
        ? bookingItems.map((item: Appointment) => (
            <div className="flex justify-between self-center bg-lime-50 w-[500px] h-[150px] rounded-[17px] px-7 py-4 my-2">
              <div className="w-40 flex flex-col text-left mr-4 text-teal-900 justify-center">
                <div className="font-semibold text-sm my-1">
                  Name: {item.user.name}
                </div>
                <div className="font-semibold text-sm my-1">
                  Dentist: {item.dentist.name}
                </div>
                <div className="font-semibold text-sm my-1">
                  Date: {dayjs(item.apptDate).format("YYYY/MM/DD")}
                </div>
              </div>
              <div className="w-60 flex flex-row justify-between items-center">
                <div className="flex flex-row space-x-5">
                  <button
                    className="w-[105px] h-[45px]text-sm rounded-md bg-rose-900 hover:bg-rose-600 m-2 p-2 text-white shadow-sm"
                    onClick={() => deletemyAppointment(item._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="w-[105px] h-[45px]text-sm rounded-md bg-teal-900 hover:bg-green-600 m-2 p-2 text-white shadow-sm"
                    onClick={() => router.replace(`/appointment/${item._id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}
      <LoadingProgress show={loading} />
    </div>
  );
}