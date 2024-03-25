'use client'
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { ClassNames } from "@emotion/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { Appointment } from "../../../interface";
import DentistDateReserve from "@/components/DentistDateReserve";
import addAppointment from "@/libs/addAppointment";
import { useSession } from "next-auth/react";

export default function Booking() {
    const { data : session } = useSession();

    //For show login user
    // const session = await getServerSession(authOptions)
    // if(!session || !session.user.token) return null;
    // const profile = await getUserProfile(session.user.token);
    // var createdAt = new Date(profile.data.createdAt);

    const dispatch = useDispatch<AppDispatch>();
    const [bookingName, setBookingName] = useState<string>("");
    const [bookingSurname, setBookingSurname] = useState<string>("");
    const [bookingId, setBookingId] = useState<string>("");
    const [bookingDentist, setBookingDentist] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);

    const makeAppointment = () => {
        if(session){
            if(bookingDate!==null && bookingDentist!=="")
                addAppointment(dayjs(bookingDate).format("YYYY/MM/DD"), bookingDentist, session?.user._id, session?.user.token)
        }
    }

    return (
        <main className="flex flex-col items-center">

            {/* show login user
            <table className="table-auto border-separate border-spacing-2 mt-3 bg-slate-100 p-3 rounded">
                <tbody>
                    <tr><td>Name</td><td>{profile.data.name}</td></tr>
                    <tr><td>Email</td><td>{profile.data.email}</td></tr>
                    <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                    <tr><td>Member Since </td><td>{createdAt.toString()}</td></tr>
                </tbody>
            </table> */}

            <h1 className="text-[20px] m-5 font-bold text-cyan-700 rounded-lg p-3">Make an Appointment</h1>
            <form className="w-[40vw] h-auto bg-violet-50 justify-center rounded-lg flex flex-col p-10">
                {/* <TextField name="Name" label="Name" variant="standard" value={bookingName} className="m-3" onChange={(e) => setBookingName(e.target.value)}/>
                <TextField name="Lastname" label="Lastname" variant="standard" value={bookingSurname} className="m-3" onChange={(e) => setBookingSurname(e.target.value)}/>
                <TextField name="Citizen ID" label="Citizen ID" variant="standard" value={bookingId} className="m-3" onChange={(e) => setBookingId(e.target.value)}/> */}
                <DentistDateReserve onDateChange={(value:Dayjs) => {setBookingDate(value)}} onDentistChange={(value:string) => {setBookingDentist(value)}}/>
                <button name='Book Vaccine' type="button" 
                className="font-semibold bg-cyan-700 text-yellow-100 rounded-md m-3 p-3" onClick={makeAppointment}>Book Vaccine</button>
            </form>
            
        </main>
    )
}