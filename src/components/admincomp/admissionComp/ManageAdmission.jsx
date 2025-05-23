import { DatePickerWithRange } from "@/components/ui/rangePicker";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOpenAdmission } from "@/hooks/tanstackHooks/useAdmission";
import { toast } from "sonner";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ManageAdmission() {
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  const [month, setMonth] = useState("");
  const { mutate } = useOpenAdmission();
  const [error, setError] = useState(null)
  const [modelOpen, setModelOpen] = useState(false);

  const handleOpenAdmission = () => {
    if(!date.from || !date.to || !month) {
      toast("Please fill all the fields", {
        description: "Please fill all the fields",
      });
      setError("Please fill all the fields")
      return;
    }
     
    mutate(
      { data: { month, date } },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast("New admissin opened", {
              description: "New admissin opened successfully",
            });
            setModelOpen(false);
            setDate({
              from: null,
              to: null,
            });
            setMonth("");
            setError(null)
          } else {
            toast("Somthing went wrong", {
              description: data.message,
            });
          }
        },
      }
    );
  };

  return (
    <div className="w-full  flex justify-between max-sm:flex-col gap-2 items-center border-b pb-4">
      <h1 className="text-xl md:text-2xl font-bold">Manage Admission</h1>
      <Popover open={modelOpen} onOpenChange={setModelOpen}>
        <PopoverTrigger asChild>
          <Button variant="">Open Admission</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Open Admission</h4>
              <p className="text-sm text-muted-foreground">
                Select from and to date and batch month to open admission
              </p>
            </div>

            <div className="grid gap-3">
              <DatePickerWithRange date={date} setDate={setDate} error={error} />
              <Select onValueChange={(value) => setMonth(value)}>
                <SelectTrigger className={`w-full bg-background shadow-none py-5 ${error && month === '' ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Months</SelectLabel>
                    {monthNames.map((month) => {
                      return <SelectItem key={month} value={month}>{month}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                onClick={handleOpenAdmission}
                className="py-5 shadow-none"
              >
                Apply admission
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ManageAdmission;
