export default async function getAppointments(token:string) {

    const response = await fetch("https://privacy-backend.vercel.app/api/v1/appointments",{
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
