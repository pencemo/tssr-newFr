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
import { Loader2 } from "lucide-react";

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
  const [month, setMonth] = useState('');
  const {mutate, isPending}=useCreateBatch()
  const [error, setError] = useState(null)

  const handelCreateBatch = () => {
    if(month === ''){
        return setError("Month is required")
    }
    mutate({data:{month, isAdmissionStarted: false,}, courseId: id}, {
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
          
        {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handelCreateBatch}>{isPending ? <Loader2 className="animate-spin"/>:"Create batch"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
