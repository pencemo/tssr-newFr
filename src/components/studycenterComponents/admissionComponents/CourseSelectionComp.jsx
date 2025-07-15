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
import { format, formatDate, set, sub } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {  useOpenCourseAndBatchOfStudyCenter } from "@/hooks/tanstackHooks/useCourse";
import { useState, useEffect } from "react";
import { useOpenBatchesOfCourse } from "@/hooks/tanstackHooks/useBatch";
import Loader from "@/components/ui/loader";
import {  useCreateEnrollmentAndStudent } from "@/hooks/tanstackHooks/useEnrollment";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "@/lib/s3Service";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CourseSelectionComp = ({ userData, onBack, onBack2, course }) => {
  console.log("COurse :",course);
  const [student, setStudent] = useState({});
  const [isAccept, setAccept] = useState(false)
  const navigate = useNavigate();
  const { mutate , isPending } = useCreateEnrollmentAndStudent();

  // Optional: Sync updated course/batch/year to local state if needed elsewhere
  const [enrollmentData, setEnrollmentData] = useState({
    studentId: student._id,
  });

  useEffect(() => {
    setStudent({
      ...userData,
      ...course
    });
  }, [userData, course]);

  // Sync when selections change
  useEffect(() => {
    setEnrollmentData({
      studentId: student._id,
    });
  }, [student._id]);
 
  console.log(userData);

  // handleSubmit with validation
  const handleSubmit = async() => {
    console.log(course);
    // return console.log(student);
    let studentWithUrls
    if(!userData._id){
      const [profileImageUrl, sslcUrl] = await Promise.all([
        uploadFile(userData.profileImage),
        uploadFile(userData.sslc)
      ]);

      if(!profileImageUrl || !sslcUrl) {
        toast.error("Failed to upload files. Please try again.");
        return;
      }
      studentWithUrls = {
        ...student,
        profileImage: profileImageUrl.url,
        sslc: sslcUrl.url,
      };
    }else{
      studentWithUrls = student
    }
    


    mutate(
      { student: studentWithUrls, course },
      {
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
      }
    );
  };
  const image = student?._id ? student?.profileImage : student?.profileImage ? URL.createObjectURL(student?.profileImage) : 'https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg';
  return (
    <div className=" max-w-4xl mx-auto ">
      {/* Student Info Card */}
      <Card className="w-full shadow-xl rounded-2xl">
        <CardHeader className="pb-4 border-b border-gray-200 px-6 pt-1">
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Student Details
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Review the student information below before proceeding.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col  gap-6">
            {/* Avatar */}
            <div className="flex max-md:flex-col md:items-end gap-5 border-b pb-5">
              <Avatar className="size-28 md:size-32 object-cover rounded-full border border-gray-300 overflow-hidden">
                <AvatarImage
                  src={image}
                  alt="@profile image"
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="text-3xl font-semibold bg-gray-200 w-full h-full flex items-center justify-center">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{student?.name}</h1>
              <h1 className="text-gray-600 text-sm">Mail:  {student?.email}</h1>
              <h1 className="text-gray-600 text-sm">Contact No:  {student?.phoneNumber}</h1>
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailsInfo name="Adhaar Number" value={student?.adhaarNumber} />
              <DetailsInfo name="DOB" value={format(new Date(userData?.dateOfBirth || ''), 'PPP')} />
              <DetailsInfo name="Age" value={student?.age} />
              <DetailsInfo name="Gender" value={student?.gender} />
              <DetailsInfo name="parentName" value={student?.parentName} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h1 className="col-span-full text-lg font-semibold text-gray-700">Address Details</h1>
              <DetailsInfo name="State" value={student?.state} />
              <DetailsInfo name="District" value={student?.district} />
              <DetailsInfo name="Pincode" value={student?.pincode} />
              <DetailsInfo name="Place" value={student?.place} /> 
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h1 className="col-span-full text-lg font-semibold text-gray-700">Acadamic Info</h1>
              <DetailsInfo name="Qualification" value={student?.qualification} />
              <DetailsInfo name="Date Of Admission" value={format(new Date(userData?.dateOfAdmission || ''), 'PPP')} />
            </div>

            <div>
            <div className="mt-5 border-t py-4">
          <h1 className="text-lg font-semibold text-gray-700 ">Student,s Declaration</h1>
            <p className="text-sm text-gray-600 mt-1">Hereby solemnly declare that the above information provided by me are true to the best of my knowledge and belief. I shall obey the rules and regulation of TSSR COUNCIL study centre, now in force and as amended or altered from time to time. I accept all decision of the TSSR COUNCIL authorities in all matters of training conducted discipline are no right of question them in any court of law.</p>
          <div className="flex gap-2 mt-3">
            <Checkbox id="checkbox" checked={isAccept} onCheckedChange={(value)=>setAccept(value)} />
            <Label htmlFor="checkbox">I agree to the declaration above.</Label>
          </div>
        </div>
            </div>

            
          </div>
        </CardContent>
        <CardFooter className="flex justify-end  w-full">
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={()=>{
                userData?._id ? onBack2() : onBack()
              }}
            >
              Back to edit
            </Button>
            <Button disabled={!isAccept} className="w-full sm:w-auto" onClick={handleSubmit}>
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Submit Details"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

    </div>
  );
};

export default CourseSelectionComp;



function DetailsInfo({name, value}) {
  return (
    <div className="space-x-1 grid md:grid-cols-5 border shadow-xs py-2 px-4 rounded-md">
      <h1 className="text-sm font-medium text-gray-600 md:col-span-2">{name} : </h1>
      <h2 className="text-sm font-medium text-gray-800 md:col-span-3">{value}</h2>
    </div>
  )
}

