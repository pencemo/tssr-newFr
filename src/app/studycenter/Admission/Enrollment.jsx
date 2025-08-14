import AdhaarVeificationComp from "@/components/studycenterComponents/admissionComponents/AdhaarVeificationComp";
import CourseSelectionComp from "@/components/studycenterComponents/admissionComponents/CourseSelectionComp";
import { EnrollmentFormUI } from "@/components/studycenterComponents/admissionComponents/EnrollmentFormUI";
import ExcelUpload from "@/components/studycenterComponents/admissionExcelComponents/ExcelUpload";
import OpenBatches from "@/components/studycenterComponents/admissionExcelComponents/OpenBatches";
import NotAccess from "@/components/ui/NotAccess";
import { useSettings } from "@/hooks/tanstackHooks/useAuth";
import React, {  useState } from "react";

function Enrollment() {
  const [course, setCourse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [mode, setMode]   = useState("start");
  const {data}=useSettings()

  console.log(data);

const renderStep = () => {
  switch (mode) {
    case "start":
      return (
        <OpenBatches
          onIndividual={() => setMode("aadhaar")}
          onBulk      ={()  => setMode("bulk")}
          setCourse   ={setCourse}
        />
      );

    /* INDIVIDUAL FLOW ------------------------------------------- */
    case "aadhaar":
      return (
        <AdhaarVeificationComp
          onNext={() => setMode("form")}
          onBack={() => setMode("start")}
          onFinel={()=> setMode("course")}
          setUserData={setUserData}
          course={course}
        />
      );

    case "form":
      return (
        <EnrollmentFormUI
          userData={userData}
          onBack={() => setMode("aadhaar")}
          onNext={() => setMode("course")}
          setUserData={setUserData}
        />
      );

    case "course":
      return (
        <CourseSelectionComp
          course={course}
          userData={userData}
          onBack2={() => setMode("aadhaar")}
          onBack={() => setMode("form")}
          onDone={() => setMode("start")}     // or whatever makes sense
        />
      );

    /* BULK FLOW -------------------------------------------------- */
    case "bulk":
      return (
        <ExcelUpload
          course={course}
          setCourse={setCourse}
          onBack={() => setMode("start")}
        />
      );

    default:
      return null;
  }
};

if(!data?.data?.admissionPermission){
  return <NotAccess/>
}

return <div className="w-full h-full">{renderStep()}</div>;
}

export default Enrollment;
