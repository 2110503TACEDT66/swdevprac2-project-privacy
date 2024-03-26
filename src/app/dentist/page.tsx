import BestDentists from "@/components/BestDentists";
import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function Hospital() {
    const dentists = getDentists();
    return (
            <main className="flex flex-col items-center justify-center space-y-3 h-full overflow-y-auto bg-[url('/img/apptcover.jpg')]">
                <h1 className="text-center text-3xl font-semibold mt-5 mb-4 text-teal-900 bg-white bg-opacity-60 w-[100%] p-4">Our Dentists</h1>
                <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                    <BestDentists/>
                    <DentistCatalog dentistsJson={dentists}/>
                </Suspense>
            </main>
    );
}
 