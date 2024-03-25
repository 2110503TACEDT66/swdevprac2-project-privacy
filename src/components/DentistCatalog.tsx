import Link from "next/link";
import Card from "./Card";
import { DentistItem, DentistJson } from "../../interface";
import { useWindowListener } from "@/hooks/useWindowListener";

export default async function DentistCatalog({
  dentistsJson,
}: {
  dentistsJson: Promise<DentistJson>;
}) {
  const dentist:DentistJson = await dentistsJson;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center w-full gap-x-4 gap-y-6">
      {dentist.data.map((dentistItem: DentistItem) => (
          <Card dentistName={dentistItem.name} dentistDesc = {{dentistExp:dentistItem.years_of_experience,dentistExpertise:dentistItem.area_of_expertise}} imgSrc={"/img/doctor.jpg"} />
      ))}
    </div>
  );
}
