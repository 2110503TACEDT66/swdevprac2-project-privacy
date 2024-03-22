import Link from "next/link";
import Card from "./Card";
import { HospitalItem, HospitalJson } from "../../interface";

export default async function HospitalCatalog({hospitalsJson} : {hospitalsJson:Promise<HospitalJson>}) {

    const Hospital = await hospitalsJson;

    return (
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                Hospital.data.map((HospitalItem:HospitalItem)=>(
                    <Link key={HospitalItem.id} href={`/hospital/${HospitalItem.id}`} className="w-1/5">
                        <Card hospitalName={HospitalItem.name} imgSrc={HospitalItem.picture}/>
                    </Link>
                ))
            }
        </div>
    );
}