// EditApptPage.tsx
'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getAppointment from "@/libs/getAppointment";
import EditmyAppt from "@/components/EditAppt";
import { Appointment } from "../../../../interface";

export default function EditApptPage({ params }: { params: { apptid: string } }) {
  const [apptItem, setApptItem] = useState<Appointment>();
  const { data: session } = useSession();
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const fetchAppointments = async () => {
        try {
          const data = await getAppointment(session.user.token, params.apptid);
          setApptItem(data.data);
        } catch (error) {
          console.error("Failed to fetch appointment:", error);
        }
      };
      fetchAppointments();
    }
  }, [refresh, session]);

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <>
      {apptItem && (
        <EditmyAppt
          apptId={apptItem?._id}
          DentistName={apptItem.dentist.id}
          DateAppt={apptItem.apptDate}
          onRefresh={handleRefresh}
        />
      )}
    </>
  );
}
