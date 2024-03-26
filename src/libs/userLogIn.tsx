export default async function userLogin(userEmail:string, userPassword:string) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            }),
        })
        if(!response.ok) {
            throw new Error("Failed to log-in")
        }
    
        return await response.json()
    } catch (error) {
        console.log("error in userLogin is ",error);
    }

}