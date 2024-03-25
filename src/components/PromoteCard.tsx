'use client'

import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { useWindowListener } from "@/hooks/useWindowListener";

export default function PromoteCard() {

    const [playing, setPlaying] = useState(true);

    // useWindowListener('contextmenu', (e) => {e.preventDefault()})

    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row">
            <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing}/>
            <div className="m-5">Get your vaccine today.
                <button className="block rounded-md bg-cyan-600 hover:bg-cyan-800 mt-3 px-3 py-2 text-sm text-white shadow-sm"
                onClick={()=>{ setPlaying(!playing)}}>
                    {playing? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
}