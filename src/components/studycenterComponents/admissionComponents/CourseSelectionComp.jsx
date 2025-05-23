import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, sub } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAllCourse } from "@/hooks/tanstackHooks/useCourse";
import { useState, useEffect } from "react";
import { useOpenBatchesOfCourse } from "@/hooks/tanstackHooks/useBatch";
import Loader from "@/components/ui/loader";
import {  useCreateEnrollmentAndStudent } from "@/hooks/tanstackHooks/useEnrollment";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CourseSelectionComp = ({ userData, setStep }) => {
  console.log("CourseSelectionComp", userData);
  const [student, setStudent] = useState(userData);
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
  const [year, setYear] = useState(null);
  const [courseError, setCourseError] = useState(false);
  const [batchError, setBatchError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();
  const { data, isLoading } = useAllCourse();
  const { mutate } = useCreateEnrollmentAndStudent();
  const batchResponse = useOpenBatchesOfCourse(course);
  const batches = batchResponse.data?.data || [];
  const courses = data?.data || [];

  // Optional: Sync updated course/batch/year to local state if needed elsewhere
  const [enrollmentData, setEnrollmentData] = useState({
    courseId: null,
    batchId: null,
    studentId: student._id,
    year: null,
  });

  const submissionData = new FormData();

  // Append all simple fields
  submissionData.append("name", userData.name);
  submissionData.append("age", userData.age);
  submissionData.append(
    "dateOfBirth",
    userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString() : null
  );
  submissionData.append("gender", userData.gender);
  submissionData.append("phoneNumber", userData.phoneNumber);
  submissionData.append("email", userData.email);
  submissionData.append("adhaarNumber", userData.adhaarNumber);
  // Append address fields
  submissionData.append("place", userData.place);
  submissionData.append("district", userData.district);
  submissionData.append("state", userData.state);
  submissionData.append("pincode", userData.pincode);

  // Append other fields

  submissionData.append(
    "dateOfAdmission",
    userData.dateOfAdmission
      ? new Date(userData.dateOfAdmission).toISOString()
      : null
  );
  submissionData.append("parentName", userData.parentName);
  submissionData.append("qualification", userData.qualification);

  // Append files
  submissionData.append("profileImage", userData.profileImage); // Must be a File object
  submissionData.append("sslc", userData.sslc);
  submissionData.append("enrollmentData", JSON.stringify(enrollmentData));
  // Sync when selections change
  useEffect(() => {
    setEnrollmentData({
      courseId: course,
      batchId: batch,
      studentId: student._id,
      year: Number(year),
    });
  }, [course, batch, year, student._id]);

  // Inside component

  // handleSubmit with validation
  const handleSubmit = () => {
    let hasError = false;

    if (!course) {
      setCourseError(true);
      hasError = true;
    } else {
      setCourseError(false);
    }

    if (!batch) {
      setBatchError(true);
      hasError = true;
    } else {
      setBatchError(false);
    }

    if (!year) {
      setYearError(true);
      hasError = true;
    } else {
      setYearError(false);
    }

    if (hasError) {
      setValidationError("⚠️ Please select all required fields.");
      return;
    }

    setValidationError("");

    mutate(submissionData, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success("Enrollment successful!");
          navigate("/studycenter");
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  function HandleBack() {
    setCourse(null);
    setBatch(null);
    setYear(null);
    setCourseError(false);
    setStep(1);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10 space-y-6">
      {/* Student Info Card */}
      <Card className="w-full max-w-4xl bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader className="pb-4 border-b border-gray-200 px-6 pt-1">
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Student Details
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Review the student information below before proceeding.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start">
              <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full border border-gray-300 overflow-hidden">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="text-3xl font-semibold bg-gray-200 w-full h-full flex items-center justify-center">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                ["Name", student?.name],
                ["Email", student?.email],
                ["Phone Number", student?.phoneNumber],
                ["Gender", student?.gender],
                ["Adhaar Number", student?.adhaarNumber],
                [
                  "Admission Date",
                  student?.dateOfAdmission
                    ? format(new Date(student.dateOfAdmission), "dd MMM yyyy")
                    : "N/A",
                ],
              ].map(([label, value]) => (
                <div key={label} className="w-full">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={value}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-base text-gray-700 shadow-sm focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Selection Card */}
      <Card className="w-full max-w-4xl bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-gray-800">
            Select Course Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Course Select */}
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Course
              </label>
              <Select
                onValueChange={(value) => {
                  setCourse(value);
                  setCourseError(false);
                }}
              >
                <SelectTrigger
                  className={`w-full ${courseError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courses</SelectLabel>
                    {courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Batch Select */}
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Batch
              </label>
              <Select
                onValueChange={(value) => {
                  setBatch(value);
                  setBatchError(false);
                }}
              >
                <SelectTrigger
                  className={`w-full ${batchError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select a batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Batches</SelectLabel>
                    {batches.map((batch) => (
                      <SelectItem key={batch._id} value={batch._id}>
                        {batch.month}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Year Select */}
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Year
              </label>
              <Select
                onValueChange={(value) => {
                  setYear(value);
                  setYearError(false);
                }}
              >
                <SelectTrigger
                  className={`w-full ${yearError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:justify-between lg:justify-between gap-4 mt-4 w-full">
          <div>
            {validationError && (
              <p className="text-sm text-red-600 text-center w-full">
                {validationError}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={HandleBack}
            >
              Cancel
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleSubmit}>
              Confirm Selection
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseSelectionComp;
