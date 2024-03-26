import getBestDentists from "@/libs/getBestDentists";
import { DentistItem } from "../../interface";
import Card from "./Card";

export default async function BestDentists() {
    const dentists = await getBestDentists();
    return (
            <main className="bg-teal-950 py-4 px-8 rounded-xl bg-opacity-75">
                <h1 className="text-center text-2xl mt-2 mb-5 text-amber-50">
                    Dentists who has the most appointments
                </h1>
                <div className="flex flex-row justify-items-center w-full gap-x-4 gap-y-6">
                    {dentists.data.map((dentistItem: DentistItem) => (
                        <Card dentistName={dentistItem.name} dentistDesc = {{dentistExp:dentistItem.years_of_experience,dentistExpertise:dentistItem.area_of_expertise}} imgSrc={"/img/doctor.jpg"} />
                    ))}
                </div>
                
                {/* <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                    <DentistCatalog dentistsJson={dentists}/>
                </Suspense> */}
            </main>
    );
}