export default async function getDentists() {
    const response = await fetch("https://privacy-backend.vercel.app/api/v1/dentists")
    if(!response.ok) {
        throw new Error("Failed to fetch dentists")
    }
    const data = await response.json();

    return data;
}