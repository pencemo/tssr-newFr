"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateSubjects } from "@/hooks/tanstackHooks/useSubjects";

const AddSubjects = ({
  open,
  setOpen,
  subjectName,
  setSubjectName,
  subjectCode,
  setSubjectCode,
}) => {
  // Initialize mutation hook
    const { mutate , isPending} = useCreateSubjects();
    

    const handleSave = () => {
        if (subjectName == '' || subjectCode == '') {
        return toast.error("Please fill both subject name and code.");
        }
    if (subjectName.trim() && subjectCode.trim()) {
        mutate({ name: subjectName, code: subjectCode }, {
            onSuccess: () => {
                toast.success("Subject created successfully!");
                setSubjectName("");
                setSubjectCode("");
                setOpen(false);
              },
              onError: (error) => {
                toast.error("Failed to create subject: " + error.message);
              },
        }
      );
    } else {
      toast.error("Please fill both subject name and code.");
    }
  };

  const handleClose = () => {
    setSubjectName("");
    setSubjectCode("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Enter the subject name and code to create a new subject entry.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Subject Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Physics"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Subject Code
            </label>
            <Input
              id="code"
              placeholder="e.g. PHYS101"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjects;
