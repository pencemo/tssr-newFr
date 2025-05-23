import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export function CourseCard({ batch, setStep, setCourse }) {
  const courseDetails = batch?.courseId;
  const { name, category, duration } = courseDetails;
  function handleEnroll() {
    setCourse({
      courseId: courseDetails._id,
      batchId: batch._id,
    });
    setStep(2);
  }
  return (
    <Card className="w-full max-w-sm bg-white pt-0 rounded-2xl shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md">
      <CardHeader className="bg-primary text-white rounded-t-2xl p-5">
        <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-white/80 mt-1 text-sm">
          Boost your skills in {category} domain.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Category</span>
          <span className="text-gray-800 font-semibold">{category}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Duration</span>
          <span className="text-gray-800 font-semibold">{duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Batch</span>
          <span className="text-gray-800 font-bold text-xl">{batch.month}</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground flex justify-between">
          Enrollment open till:{" "}
          <span className="font-medium text-primary text-sm">
            {format(new Date(batch.endDate), "PPP")}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t flex justify-end items-center">
        <Button className=" px-6 text-sm" onClick={handleEnroll}>
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}
