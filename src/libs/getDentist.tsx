export default async function getDentist(hid:string) {

    const response = await fetch(`https://privacy-backend.vercel.app/api/v1/dentists/${hid}`)

    if(!response.ok) {
        throw new Error("Failed to fetch dentist")
    }

    return await response.json();
}