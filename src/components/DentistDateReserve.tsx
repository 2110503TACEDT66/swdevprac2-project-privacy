"use client";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, InputLabel } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
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
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [dentist, setDentist] = useState<string>("");
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
    <div>
      <div>
        
        <Select
          
          variant="standard"
          name="location"
          id="location"
          value={dentist}
          className=" w-[398px] h-[52px] my-5 bg-white rounded-xl hover:border-none"
          
          onChange={(e) => {
            setDentist(e.target.value);
            onDentistChange(e.target.value);
          }}
        >
          {dentists.map((dentist: DentistItem) => (
            <MenuItem key={dentist.id} value={dentist.id}>
              {dentist.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="rounded-lg space-x-5 space-y-2 w-full flex flex-row justify-center m-3 text-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="bg-white"
            value={reserveDate ? dayjs(reserveDate) : null}
            onChange={(value) => {
              const selectedDate = dayjs(value);
              setReserveDate(selectedDate);
              onDateChange(selectedDate);
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}