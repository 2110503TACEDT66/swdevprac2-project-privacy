'use client'
import AppointmentList from "@/components/AppointmentList"

export default function MyAppointment() {
    return (
        <div className="w-screen h-screen bg-cover flex items-center justify-center" style={{backgroundImage: "url('/img/apptcover.jpg')"}}>
        <main>
            <AppointmentList></AppointmentList>
        </main>
        </div>
    )
}