'use client'
import AppointmentList from "@/components/AppointmentList"
import { useSession } from "next-auth/react";

export default function MyAppointment() {
    const { data: session } = useSession();
    if (session?.user.role==='admin') {
        return (
            <div className="h-full overflow-y-auto bg-[url('/img/apptcover.jpg')] bg-cover flex items-center justify-center ">
            <main>
                <AppointmentList></AppointmentList>
            </main>
            </div>
        )
    }
    return (
        <div className="h-screen bg-[url('/img/apptcover.jpg')] bg-cover flex items-center justify-center ">
        <main>
            <AppointmentList></AppointmentList>
        </main>
        </div>
    )
}