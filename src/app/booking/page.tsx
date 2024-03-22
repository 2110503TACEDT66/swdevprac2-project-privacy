'use client'
import { Button, MenuItem, Select, TextField } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { ClassNames } from "@emotion/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";

export default function Booking() {

    //For show login user
    // const session = await getServerSession(authOptions)
    // if(!session || !session.user.token) return null;
    // const profile = await getUserProfile(session.user.token);
    // var createdAt = new Date(profile.data.createdAt);

    const dispatch = useDispatch<AppDispatch>();
    const [bookingName, setBookingName] = useState<string>("");
    const [bookingSurname, setBookingSurname] = useState<string>("");
    const [bookingId, setBookingId] = useState<string>("");
    const [bookingHospital, setBookingHospital] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);

    const makeBooking = () => {
        if (bookingName.trim()!=='' && bookingSurname.trim()!=='' && bookingId.trim()!=='' && bookingHospital.trim()!=='' && bookingDate) {
            const item:BookingItem= {
                name: bookingName,
                surname: bookingSurname,
                id: bookingId,
                hospital: bookingHospital,
                bookDate: dayjs(bookingDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item));
            //console.log(item);
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

            <h1 className="text-[20px] m-5 font-bold text-cyan-700 rounded-lg p-3">Vaccine Booking</h1>
            <form className="w-[40vw] h-auto bg-violet-50 justify-center rounded-lg flex flex-col p-10">
                <TextField name="Name" label="Name" variant="standard" value={bookingName} className="m-3" onChange={(e) => setBookingName(e.target.value)}/>
                <TextField name="Lastname" label="Lastname" variant="standard" value={bookingSurname} className="m-3" onChange={(e) => setBookingSurname(e.target.value)}/>
                <TextField name="Citizen ID" label="Citizen ID" variant="standard" value={bookingId} className="m-3" onChange={(e) => setBookingId(e.target.value)}/>
                <Select variant='standard' name='hospital' id='hospital' value={bookingHospital} className="h-[2em] w-[100] m-3" onChange={(e) => setBookingHospital(e.target.value)}>
                    <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                    <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                    <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
                </Select>
                <DateReserve onDateChange={(value:Dayjs) => {setBookingDate(value)}}/>
                <button name='Book Vaccine' type="button" className="font-semibold bg-cyan-700 text-yellow-100 rounded-md m-3 p-3" onClick={makeBooking}>Book Vaccine</button>
            </form>
            
        </main>
    )
}