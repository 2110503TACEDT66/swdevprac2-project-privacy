"use client";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import getDentists from "@/libs/getDentists";
import { DentistItem } from "../../interface";

export default function DentistDateReserve({
  onDateChange,
  onDentistChange,
  editAppt,
}: {
  onDateChange: Function;
  onDentistChange: Function;
  editAppt?: { DentistName: string; ApptDate: Date };
}) {
  const [reserveDate, setReserveDate] = useState(dayjs());
  const [dentist, setDentist] = useState("");
  const [dentists, setDentists] = useState<DentistItem[]>([]);

  useEffect(() => {
    if (editAppt) {
      setDentist(editAppt.DentistName);
      setReserveDate(dayjs(editAppt.ApptDate));
    }
    const fetchDentists = async () => {
      try {
        const data = await getDentists();
        setDentists(data.data);
      } catch (error) {
        console.error("Failed to fetch dentists:", error);
      }
    };

    fetchDentists();
  }, []);

  return (
    <div className="flex justify-end space-x-4 relative w-full mb-3">
      <div className="w-[70%]">
        <Select
          name="location"
          id="location"
          value={dentist}
          className="w-full rounded-[16px] h-[52px] my-0 bg-white hover:border-none text-black"
          onChange={(e) => {
            setDentist(e.target.value);
            onDentistChange(e.target.value);
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                width: 400,
              },
            },
          }}
        >
          <MenuItem value={""}>Select Your Dentist</MenuItem>
          {dentists.map((dentist: DentistItem) => (
            <MenuItem key={dentist.id} value={dentist.id}>
              {dentist.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="w-[65%]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="bg-white rounded-[16px]"
            value={reserveDate}
            onChange={(value) => {
              setReserveDate(dayjs(value));
              onDateChange(dayjs(value));
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
