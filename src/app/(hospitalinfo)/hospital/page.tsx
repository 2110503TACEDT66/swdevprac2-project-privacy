import CardPanel from "@/components/CardPanel";
import HospitalCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function hospital(){
    const hospitals = getDentists();
    return(
        <main className="p-5 ml-16 flex flex-col items-center justify-center space-y-3">
            <h1 className="text-center text-3xl font-semibold mt-2 mb-5 text-[#107557]">Select Your Hospital</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <HospitalCatalog hospitalsJson={hospitals}/>
            </Suspense>
        </main>
    );
}