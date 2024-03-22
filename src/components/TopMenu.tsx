import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TopMenu() {
    
    const session = await getServerSession(authOptions);

    return (
        <div className='h-[50px] text-cyan-800 bg-white fixed top-0 left-0 right-0 z-30 border-y border-solid border-gray-200 flex flex-row-reverse'>
            <Image src={'/img/logo.png'} className='h-full w-auto' alt='logo' width={0} height={0} sizes="100vh"/>
            <TopMenuItem title='Booking' pageRef='/booking'/>
            <div className='flex flex-row absolute left-3 h-full text-center my-auto font-sans text-xs text-gray'>
                {
                    session? 
                    <TopMenuItem title={`Sign-Out of ${session.user?.name}`} pageRef='/api/auth/signout'/>
                    : <TopMenuItem title="Sign-In" pageRef='/api/auth/signin'/>
                }
                <TopMenuItem title="My Booking" pageRef='/mybooking'/>
            </div>
        </div>
    );
}