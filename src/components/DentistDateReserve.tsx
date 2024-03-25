"use client";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import { Dayjs } from "dayjs";
import getDentists from "@/libs/getDentists";
import { DentistItem } from "../../interface";

export default function DentistDateReserve({
  onDateChange,
  onDentistChange,
}: {
  onDateChange: Function;
  onDentistChange: Function;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [dentist, setDentist] = useState<string>("");
  const [dentists, setDentists] = useState<DentistItem[]>([]);

  useEffect(() => {
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
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          value={reserveDate}
          onChange={(value) => {
            setReserveDate(value);
            onDateChange(value);
          }}
        />
      </LocalizationProvider>

      <Select
        variant="standard"
        name="location"
        id="location"
        value={dentist}
        onChange={(e) => {
          setDentist(e.target.value);
          onDentistChange(e.target.value);
        }}
        className="h-[2em] w-[200px]"
      >
        {dentists.map((dentist: DentistItem) => (
          <MenuItem key={dentist.id} value={dentist.id}>
            {dentist.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
