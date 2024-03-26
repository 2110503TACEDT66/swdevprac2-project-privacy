interface AppointmentData {
    dentist?: string;
    apptDate?: string;
}

export default async function editmyAppointment(ApptId:string,token:string,options?: { date?: string; dentistId?: string }) {
    const { date, dentistId } = options ?? {}; // ใช้ destructuring และ nullish coalescing operator เพื่อกำหนดค่าเริ่มต้นให้ว่างถ้าไม่ได้รับค่ามา
    console.log("entry edit appt");
    const bodyData:AppointmentData = {};
    if (date) {
        bodyData['apptDate'] = date;
    }
    if (dentistId) {
        bodyData['dentist'] = dentistId;
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments/${ApptId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            apptDate:date,
            dentist:dentistId
        }),
    })
    if(!response.ok) {
        throw new Error("Failed to fetch dentists")
    }
    const data = await response.json();

    return data;
}