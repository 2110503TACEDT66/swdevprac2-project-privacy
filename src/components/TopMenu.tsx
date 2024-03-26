"use client";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { Link as MUILINK } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import ConfirmLogout from "./ConfirmLogout";
import { useWindowListener } from "@/hooks/useWindowListener";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export default function TopMenu() {
  // const session = await getServerSession(authOptions)

  const [isLogout, setIsLogout] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter()
  return (
    <div className="flex flex-row h-[50px] bg-teal-900 z-30 fixed top-0 right-0 left-0">

      <div className="flex flex-row justify-start h-[50px] w-1/3 ml-2">
      {session ? (
            <TopMenuItem title={`Sign-Out of ${session.user.name}`} onLogout={() => setIsLogout(!isLogout)}/>
          ) : (
            <div className="flex flex-row h-[50px]">
              <TopMenuItem title="Sign-In" pageRef="/login" />
              <TopMenuItem title="Sign-Up" pageRef="/register" />
            </div>
          )}
      </div>

      <div  className="flex flex-row justify-center h-[50px] w-1/3">
        <Link href={"/"}>
          <Image src={"/img/logo.png"} className="h-full w-auto p-1" alt="logo" width={0} height={0} sizes="100vh"/>
        </Link>
      </div>

      <div className="flex flex-row justify-end h-[50px] w-1/3 mr-2">
        <TopMenuItem title="Appointment" pageRef="/appointment" />
        <TopMenuItem title="My Appointment" pageRef="/myappointment" />
      </div>
      
      <ConfirmLogout show={isLogout} onCancel={() => setIsLogout(false)} 
      onConfirm={() => { setIsLogout(false); signOut({ redirect: false }); router.replace('/')}}/>
    </div>
  );
}
