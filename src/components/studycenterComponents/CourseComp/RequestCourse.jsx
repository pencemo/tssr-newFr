import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Label } from "@/components/ui/label";
import {
  useCourseForRequest,
  useRequestCourse,
} from "@/hooks/tanstackHooks/useRequest";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function RequestCourse() {
  const { data, isLoading } = useCourseForRequest();
  const [courseId, setCourseId] = useState(null);
  const { mutate, isPending } = useRequestCourse();

  const handleSubmit = async () => {
    mutate(
      { courseId },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            setCourseId(null);
          } else {
            toast.error(data.message);
          }
        },
        onError: (error) => {
          toast.error("Sumthing went wrong, please try again later");
        },
      }
    );
  };
  return (
    <Dialog>
      <div>
        <DialogTrigger asChild>
          <Button variant="outline">Request course</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request course</DialogTitle>
            <DialogDescription>
              Select a course to request access to the course
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-3">
              <Label htmlFor="name-1">Courses</Label>
              {isLoading ? <div>Loading</div>:<Select onValueChange={(value) => setCourseId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    {data?.data?.map((course) => {
                      return (
                        <SelectItem key={course._id} value={course._id}>
                          {course.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Request course"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
