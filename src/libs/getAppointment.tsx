export default async function getAppointment(token:string,apptid:string) {
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${apptid}`,{
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
