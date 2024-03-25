export default async function getAppointment(token:string,apptid:string) {
    
    const response = await fetch(`https://privacy-backend.vercel.app/api/v1/appointments/${apptid}`,{
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    if(!response.ok) {
        throw new Error("Failed to fetch dentists")
    }
    const data = await response.json();

    return data;
}
