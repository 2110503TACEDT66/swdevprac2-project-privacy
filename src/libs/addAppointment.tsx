import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";

export default async function addAppointment(date:string, dentistId: string, userId: string, userToken: string) {
    
    try { 
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${dentistId}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({
                apptDate: date,
                user: {userId}
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