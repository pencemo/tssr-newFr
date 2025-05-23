import AdhaarVeificationComp from "@/components/studycenterComponents/admissionComponents/AdhaarVeificationComp";
import CourseSelectionComp from "@/components/studycenterComponents/admissionComponents/CourseSelectionComp";
import { EnrollmentFormUI } from "@/components/studycenterComponents/admissionComponents/EnrollmentFormUI";
import React, { useState } from "react";

const AdmissionForStudent = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  console.log(step);
  console.log(userData);

  return (
    <div>
      {step === 1 && (
        <AdhaarVeificationComp setStep={setStep} setUserData={setUserData} />
      )}
      {step === 2 && (
        <EnrollmentFormUI
          userData={userData}
          setStep={setStep}
          setUserData={setUserData}
        />
      )}
      {step === 3 && (
        <CourseSelectionComp userData={userData} setStep={setStep} />
      )}
    </div>
  );
};

export default AdmissionForStudent;
