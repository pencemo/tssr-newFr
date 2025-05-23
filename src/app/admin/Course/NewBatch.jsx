import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useCreateBatch } from "@/hooks/tanstackHooks/useBatch";
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

export function NewBatch({ name, id }) {
    const [modelOpen, setModelOpen]=useState(false)
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('');
  const {mutate}=useCreateBatch()
  const [error, setError] = useState(null)

  const handelCreateBatch = () => {
    if(month === ''){
        return setError("Month is required")
    }
    mutate({data:{month, isAdmissionStarted: open,}, courseId: id}, {
      onSuccess: (data) => {
        if (data.success) {
          toast("Batch created", {
            description: "Batch created successfully",
          });
          setError(null)
          setModelOpen(false)
        } else {
          toast("Somthing went wrong", {
            description: data.message,
          });
          setError(data.message);
        }
      },
    });
  };

  return (
    <Dialog open={modelOpen} onOpenChange={setModelOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add batch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New batch</DialogTitle>
          <DialogDescription>Create a new batch for <span className="text-foreground">{name}</span></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            
            <Select onValueChange={(value)=>setMonth(value)}>
              <SelectTrigger className="w-full shadow-none py-5">
                <SelectValue placeholder="Select a month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Months</SelectLabel>
                  {monthNames.map((month) => {
                    return <SelectItem value={month}>{month}</SelectItem>;
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <div className="w-full border py-2 px-3 flex items-center justify-between rounded-xl">
                <div>
                    <h1 className="font-medium">Admission</h1>
                    <p className="text-sm text-muted-foreground">
                        Make it on to take admission
                    </p>
                </div>
                <Switch checked={open} onCheckedChange={(value)=>setOpen(value)} />
            </div>
          </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handelCreateBatch}>Create batch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
