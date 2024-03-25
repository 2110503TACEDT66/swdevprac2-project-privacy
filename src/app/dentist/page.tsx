import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function Hospital() {
    const dentists = getDentists();
    return (
        <div className="w-screen h-screen bg-cover" style={{backgroundImage: "url('/img/apptcover.jpg')"}}>
            <main className="p-5 flex flex-col items-center justify-center space-y-3 h-full overflow-y-auto">
                <h1 className="text-center text-3xl font-semibold mt-2 mb-5 text-[#107557]">Select Your Dentist</h1>
                <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                    <DentistCatalog dentistsJson={dentists}/>
                </Suspense>
            </main>
        </div>
    );
}
