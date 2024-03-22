import CardPanel from "@/components/CardPanel";
import HospitalCatalog from "@/components/HospitalCatalog";
import getHospitals from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function hospital(){
    const hospitals = getHospitals();
    return(
        <main className="p-5">
            <h1 className="text-center text-xl font-medium text-cyan-700">Select Your Hospital</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <HospitalCatalog hospitalsJson={hospitals}/>
            </Suspense>
        </main>
    );
}