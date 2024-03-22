'use client'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function DateReserve({onDateChange} : {onDateChange:Function}) {

    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null)
    return(
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-[100] flex flex-row justify-center m-3 text-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-full" value={bookingDate} onChange={(value) => {setBookingDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}