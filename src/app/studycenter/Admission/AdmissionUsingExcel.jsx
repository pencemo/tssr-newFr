import ExcelUpload from '@/components/studycenterComponents/admissionExcelComponents/ExcelUpload'
import OpenBatches from '@/components/studycenterComponents/admissionExcelComponents/OpenBatches'
import React, { use, useState } from 'react'

const AdmissionUsingExcel = () => {
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState(null)
  return (
    <div>
      {step === 1 && <OpenBatches setStep={setStep} setCourse={setCourse} />}
      {step === 2 && (
        <ExcelUpload
          setStep={setStep}
          course={course}
          setCourse={setCourse}
        />
      )}
    </div>
  );
}

export default AdmissionUsingExcel
