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

export default function TopMenu() {
  // const session = await getServerSession(authOptions)

  const [isLogout, setIsLogout] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className=" h-[50px] text-cyan-800 bg-teal-900 fixed top-0 left-0 right-0 z-30 flex flex-row">

      <div className="flex flex-row flex-start absolute left-3 h-full text-center my-auto font-sans text-xs text-gray">
      {session ? (
            <TopMenuItem title={`Sign-Out of ${session.user.name}`} onLogout={() => setIsLogout(!isLogout)}/>
          ) : (
            <>
              <TopMenuItem title="Sign-In" pageRef="/login" />
              <TopMenuItem title="Sign-Up" pageRef="/register" />
            </>
          )}
      </div>

      <div  className="justify-center h-[50px] text-cyan-800 bg-teal-900 fixed top-0 left-0 right-0 z-30 flex">
        <Link href={"/"}>
          <Image src={"/img/logo.png"} className="h-full w-auto p-1" alt="logo" width={0} height={0} sizes="100vh"/>
        </Link>
      </div>

      <div className="justify-end h-[50px] text-cyan-800 bg-teal-900 fixed top-0 left-0 right-0 z-30 flex">
        <TopMenuItem title="Appointment" pageRef="/appointment" />
        <TopMenuItem title="My Appointment" pageRef="/myappointment" />
        <div className="flex flex-row absolute left-3 h-full text-center my-auto font-sans text-xs text-gray">
          {session ? (
            <TopMenuItem title={`Sign-Out of ${session.user.name}`} onLogout={() => setIsLogout(!isLogout)}/>
          ) : (
            <>
              <TopMenuItem title="Sign-In" pageRef="/login" />
              <TopMenuItem title="Sign-Up" pageRef="/register" />
            </>
          )}
        </div>

        <ConfirmLogout show={isLogout} onCancel={() => setIsLogout(false)} 
        onConfirm={() => { setIsLogout(false); signOut({ redirect: false })}}/>
      </div>
    </div>
  );
}
