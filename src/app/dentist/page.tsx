import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function hospital(){
    const dentists = getDentists();
    return(
        <main className="p-5 ml-6 flex flex-col items-center justify-center space-y-3">
            <h1 className="text-center text-3xl font-semibold mt-2 mb-5 text-[#107557]">Select Your Dentist</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <DentistCatalog dentistsJson={dentists}/>
            </Suspense>
        </main>
    );
}