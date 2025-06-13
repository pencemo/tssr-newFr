import React, { forwardRef, useRef } from "react";
import head from "../../../assets/pdfHead.svg"
import logo from '../../../assets/logo.svg'
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const HallTicket = forwardRef(({studentData}, ref)=> {
  
  return (
    <div ref={ref} className="flex items-center justify-center ">
      {/* A4-sized container (210mm x 297mm) */}
      <div className="w-[200mm] h-[280mm] relative border border-black p-8 pt-5 bg-white">
      <div className="relative z-10">
        
        <div>
          <img src={head} alt="" />
        </div>

        {/* Main Title */}
        <div className="border-b-2 border-black mb-6 pb-3 relative">
          <h2 className="text- font-medium text-center">
            Office of the TSSR Council Central Board of Examination
          </h2>
          <h2 className="text-xl font-bold uppercase text-center">
            Hall Ticket for the Examination
          </h2>
          
        </div>

        {/* Student Information */}
        <div className="grid grid-cols-7 gap-4">
        <div className="space-y-2.5 mb-8 col-span-5">
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Reg. No:</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
              : {studentData?.registrationNo}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Name Of Student</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
            : {studentData?.studentName}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Course</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
            : {studentData?.courseName}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Study Centre</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
              : {studentData?.studyCenter}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Examination Centre</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
              : {studentData?.examCenter}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Date of Examination</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
              : {format(new Date(studentData?.examDate.from || 0), "PPP")} to {format(new Date(studentData?.examDate.to || 0), "PPP")}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3  text-[0.940rem]">Examination Time</div>
            <div className="w-2/3 text-[0.940rem] font-medium ">
              : {studentData?.examTime.from} to {studentData?.examTime.to}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-2 col-span-2 ">
          <img className="w-32 h-40  object-cover border-2 " src={studentData?.profileImage} alt="" />
            <img className="w-28" src="https://images.seeklogo.com/logo-png/21/1/qr-code-logo-png_seeklogo-217342.png" alt="" />
          
        </div>
        </div>

        {/* Instructions */}
        <div className="mb-5">
          <h3 className="font-bold text-[17px] border-b inline-block pb-1 mb-3">
            INSTRUCTION FOR THE CANDIDATES APPEARING ON EXAMINATION
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-[13px] ">
            <li>
              This hall ticket is valid only if the candidates photograph and
              signature images are legible.
            </li>
            <li>
              Candidates will be permitted to appear for the examination ONLY
              after their credentials are verified by centre official.
            </li>
            <li>
              Candidates should take their places in the examination hall at
              least 10 minutes before the commencement of the examination.
            </li>
            <li>
              Candidates presenting themselves half an hour after the appointed
              time will not be admitted to the examination hall.
            </li>
            <li>
              Candidates should bring with them their hall ticket each day of the
              examination for inspection.
            </li>
            <li>
              Candidates should fill the facing sheet of the answer book in block
              letters.
            </li>
            <li>
              No candidates will be allowed to leave the examination hall till
              the expiry of half an hour after the commencement of the
              examination.
            </li>
            <li>
              Candidates are prohibited from bringing into the examination hall
              any book or portion of book, manuscript or paper and from
              communicating with any person inside or outside. copying or other
              unfair practices by the candidates is strictly prohibited.
            </li>
            <li>
              When the candidate need supplemental sheets or any other assistance
              he/she should stand up in the place.
            </li>
            <li>
              When the candidate has finished writing he/she shall stand up in
              the place may collect the answer book.
            </li>
          </ul>
        </div>

        {/* Signatures */}
        <div className="flex justify-between mt-10 text-sm text-muted-foreground">
            <p>Student Signature</p>
            <p>Principal Signature</p>
            <img className="absolute  right-0 bottom-16  size-32 -rotate-45  mix-blend-multiply" src="https://t3.ftcdn.net/jpg/02/13/36/08/360_F_213360849_ZGrvvcEdAa3ak8taibQXCFMpFHdq2kER.jpg"  alt="" />
            <div className="relative  ">
            <p>TSST Council</p>
            </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs mt-8 border-2 ring ring-offset-2 border-gray-900 p-2">
          <p>
            ISSUED BY TSSR COUNCIL, OFFICE OF THE CENTRAL BOARD OF EXAMINATION,
          </p>
          <p>CENTRAL ADMINISTRATIVE OFFICE, CALICUT, KERALA</p>
        </div>
        </div>
        <div className="absolute z-0 opacity-10  inset-0 flex justify-center items-center">
          <img className="size-60" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
});




export default function HallTicketPDF({studentData}) {
  const componentRef = useRef(null)
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `Student_Certificate`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.3in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  })

  

  return (
      <div className="border py-6 rounded-2xl flex flex-col items-center justify-center gap-3">
        <div className=" ">
          <Button
            onClick={handlePrint}
          >
            Print Hall Ticket
          </Button>
        </div>
        <div className="bg-white w-full overflow-auto">
          <HallTicket ref={componentRef} studentData={studentData} />
        </div>
      </div>
  )
}