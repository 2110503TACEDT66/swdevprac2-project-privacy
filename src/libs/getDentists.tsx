export default async function getDentists() {

    await new Promise((resolve)=>{
        setTimeout(resolve,1000);
    })

    const response = await fetch("http://localhost:5050/api/v1/dentists")
    if(!response.ok) {
        throw new Error("Failed to fetch dentists")
    }
    const data = await response.json();

    return data;
}