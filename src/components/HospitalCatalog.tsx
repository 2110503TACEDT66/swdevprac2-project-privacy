import Link from "next/link";
import Card from "./Card";
import { DentistItem, DentistJson } from "../../interface";
import { useWindowListener } from "@/hooks/useWindowListener";

export default async function HospitalCatalog({
  hospitalsJson,
}: {
  hospitalsJson: Promise<DentistJson>;
}) {
  const Hospital = await hospitalsJson;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center w-full gap-x-4 gap-y-6">
      {Hospital.data.map((DentistItem: DentistItem) => (
        <Link
          key={DentistItem.id}
          href={`/hospital/${DentistItem.id}`}
          className="w-full"
        >
          <Card hospitalName={DentistItem.name} dentistDesc = {{dentistExp:DentistItem.years_of_experience,dentistExpertise:DentistItem.area_of_expertise}} imgSrc={"/img/doctor.jpg"} />
        </Link>
      ))}
    </div>
  );
}
