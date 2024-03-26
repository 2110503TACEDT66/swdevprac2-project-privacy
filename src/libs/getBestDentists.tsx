export default async function getBestDentist() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/bestdentists`)
    if(!response.ok) {
        throw new Error("Failed to fetch best dentist")
    }
    const data = await response.json();

    return data;
}