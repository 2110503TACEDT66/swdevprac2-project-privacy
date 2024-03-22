import Link from "next/link";
import Card from "./Card";
import { DentistItem, DentistJson } from "../../interface";

export default async function HospitalCatalog({hospitalsJson} : {hospitalsJson:Promise<DentistJson>}) {

    const Hospital = await hospitalsJson;

    return (
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                Hospital.data.map((DentistItem:DentistItem)=>(
                    <Link key={DentistItem.id} href={`/hospital/${DentistItem.id}`} className="w-1/5">
                        <Card hospitalName={DentistItem.name} imgSrc={'/img/doctor.jpg'}/>
                    </Link>
                ))
            }
        </div>
    );
}