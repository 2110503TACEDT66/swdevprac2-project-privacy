import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";

export default async function addAppointment(date:string, dentistId: string) {
    
    const { data : session } = useSession();

    try {
        const response = await fetch(`https://privacy-backend.vercel.app/api/v1/dentists/${dentistId}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apptDate: date,
                user: session?.user._id
            }),
        })
        if(!response.ok) {
            throw new Error("Failed to log-in")
        }
    
        return await response.json()
    } catch (error) {
        console.log("error in userLogin is ",error);
    }
    return ({});

}