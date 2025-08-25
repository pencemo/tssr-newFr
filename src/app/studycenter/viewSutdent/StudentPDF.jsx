import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import header from "../../../assets/pdfHead.svg";
import logo from "../../../assets/Logo.svg";
import {
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  FileText,
  Award,
  Printer,
} from "lucide-react";
import { format } from "date-fns";
import { formateDateToIST } from "@/lib/formateDate";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const StudentCertificate = forwardRef(({ studentData }, ref) => {
  console.log(studentData);
  return (
    <div
      ref={ref}
      className="bg-white px-3 rounded-2xl max-w-3xl mx-auto min-h-screen"
    >
      <div className="pb-5 border-b-2 border-black/60">
        <img src={header} alt="" />
      </div>

      {/* Student Info Header */}
      <div className="flex  gap-6 items-end mt-10">
      <div className=" ">
          <div className="w-32 h-40 rounded-md overflow-hidden ">
            <img
              className="w-full h-full object-cover"
              src={studentData.profileImage}
              alt=""
            />
          </div>
        </div>
        <div className="w-full  space-y-1">

          <div className="grid grid-cols-8">
            <div className="col-span-2">
              <h2 className=" font-medium text-gray-800">
                Name :{" "}
              </h2>
            </div>
            <div className="col-span-3">
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {studentData.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-8">
            <div className="col-span-2">
              <span className="font-normal text-muted-foreground text-sm">
                Student ID :
              </span>
            </div>
            <div className="col-span-3">
              <p className="text-foreground font-medium text-sm mt-1">
                {" "}
                {studentData.studentId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-8">
            <div className="col-span-2">
              <span className="font-normal text-muted-foreground text-sm">
                Admission No :
              </span>
            </div>
            <div className="col-span-3">
              <p className="text-foreground font-medium text-sm">
                {studentData.admissionNumber}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-8">
            <div className="col-span-2">
              <span className="font-normal text-muted-foreground text-sm">
                Enrolled :
              </span>
            </div>
            <div className="col-span-3">
              <p className="text-foreground font-medium text-sm">
                {formatDate(studentData.enrolledDate)}
              </p>
            </div>
          </div>
        </div>

       

      </div>

      {/* Main Content Grid */}
      <div className=" py-6 border-b border-black/60">
        {/* Personal Information */}
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          <div className="space-y-1 text-sm">
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Age</span>
              <span className="font-medium text-[16px]">: {studentData.age} years</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Gender</span>
              <span className="font-medium text-[16px]">: {studentData.gender}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Date of Birth</span>
              <span className="font-medium text-[16px]">
                : {formateDateToIST(studentData.dateOfBirth)}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Parent/Guardian</span>
              <span className="font-medium text-[16px] capitalize">
                : {studentData.parentName}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-600">Aadhaar Number</span>
              <span className="font-medium text-[16px]">: {studentData.adhaarNumber}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="  pt-5">
        <div className=" grid grid-cols-2 gap-4  ">
        <div className="pr-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 " />
            Contact Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Email</span>
              <span className="font-medium break-all col-span-2">{studentData.email}</span>
            </div>
            <div className="grid grid-cols-3">
            <span className="text-gray-600">Contact No</span>
              <span className="font-medium col-span-2">{studentData.phoneNumber}</span>
            </div>
            <div className="grid grid-cols-3">
            <span className="text-gray-600">Place</span>
              <div className="font-medium col-span-2">
                <p className="capitalize">
                  {studentData.place}, {studentData.district},{" "}
                  {studentData.state}, PIN: {studentData.pincode} 
                </p>
              </div>
            </div>
          </div>
        </div>
          <div className="pb-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
              Academic Information
            </h3>
            <div className="space-y-1 text-sm">
              <div className="grid grid-cols-3 gap-5">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium col-span-2">{studentData.courseName}</span>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <span className="text-gray-600">Batch Month:</span>
                <span className="font-medium col-span-2">{studentData.batchMonth}</span>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <span className="text-gray-600">Study Center:</span>
                <span className="font-medium col-span-2">{studentData.studycenter}</span>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <span className="text-gray-600">Qualification:</span>
                <span className="font-medium col-span-2">{studentData.qualification}</span>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <span className="text-gray-600">Admission Date:</span>
                <span className="font-medium col-span-2">
                  {formatDate(studentData.dateOfAdmission)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
      <h1 className="text-lg font-semibold text-gray-700 ">Student,s Declaration</h1>
            <p className="text-sm text-gray-600 mt-1">Hereby solemnly declare that the above information provided by me are true to the best of my knowledge and belief. I shall obey the rules and regulation of TSSR COUNCIL study centre, now in force and as amended or altered from time to time. I accept all decision of the TSSR COUNCIL authorities in all matters of training conducted discipline are no right of question them in any court of law.</p>
      </div>

      {/* Footer */}
      <div className=" py-6">
        <div className="flex justify-between ">
            <p className="text-sm text-gray-600">
              Studendt Signature : <br />
              Date:
            </p>
            <p className="text-sm text-gray-600">
            Official Seal
            </p>
          
          
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <img className="w-60" src={logo} alt="" />
      </div>
    </div>
  );
});

export default function StudentPDF({ studentData }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `Student ${studentData.name}`,
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
  });
  return (
    <div className="">
      <div className="">
        <div className=" ">
          <Button variant="outline" className={'h-8'} onClick={handlePrint}>
            <Printer className="w-5 h-5 " />
            Print Data
          </Button>
        </div>
        <div className="bg-white rounded-lg sr-only shadow-2xl overflow-hidden">
          {/* <div ref={componentRef}>asdfdf</div> */}
          <StudentCertificate ref={componentRef} studentData={studentData} />
        </div>
      </div>
    </div>
  );
}
