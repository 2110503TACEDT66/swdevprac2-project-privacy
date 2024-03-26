'use client'
import AppointmentList from "@/components/AppointmentList"

export default function MyAppointment() {
    return (
        <div className="h-screen overflow-y-auto bg-[url('/img/apptcover.jpg')] bg-cover flex items-center justify-center ">
        <main>
            <AppointmentList></AppointmentList>
        </main>
        </div>
    )
}