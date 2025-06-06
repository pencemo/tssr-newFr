import React, { forwardRef, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import header from '../../../assets/pdfHead.svg'
import logo from '../../../assets/logo.svg'
import { User, Phone, Mail, MapPin, GraduationCap, FileText, Award, Printer } from "lucide-react"
import { format } from "date-fns"



const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}


const StudentCertificate = forwardRef(({studentData}, ref)=> {
  return (
    <div ref={ref} className="bg-white  rounded-2xl max-w-3xl mx-auto min-h-screen">
    
    <div className="pb-5 border-b border-black/60">
      <img src={header} alt="" />
    </div>

    {/* Student Info Header */}
    <div className="flex items-center px-3 justify-between my-6">
    <div className="">
        <div className="grid grid-cols-5">
          <div className="col-span-2">
          <h2 className="text-lg font-medium text-gray-800 capitalize">Name : </h2>
          </div>
          <div className="col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{studentData.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-2">
          <span className="font-normal text-muted-foreground text-sm">Student ID :</span>
          </div>
          <div className="col-span-3">
          <p className="text-foreground font-medium text-sm mt-1"> {studentData.studentId}</p>
          </div>
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-2">
          <span className="font-normal text-muted-foreground text-sm">Registration No :</span> 
          </div>
          <div className="col-span-3">
          <p className="text-foreground font-medium text-sm">{studentData.registrationNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-2">
          <span className="font-normal text-muted-foreground text-sm">Enrolled :</span> 
          </div>
          <div className="col-span-3">
          <p className="text-foreground font-medium text-sm">{formatDate(studentData.enrolledDate)}</p>
          </div>
        </div>
        
      </div>
      <div className="mr-10">
        
        <div className="w-32 h-40 rounded-md overflow-hidden ">
          <img className="w-full h-full object-cover" src={studentData.profileImage} alt="" />
        </div>
      </div>
      
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-2 gap-8  p-3 border-black/60 border-t">
      {/* Personal Information */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Age:</span>
            <span className="font-medium">{studentData.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Gender:</span>
            <span className="font-medium">{studentData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date of Birth:</span>
            <span className="font-medium">{formatDate(studentData.dateOfBirth)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Parent/Guardian:</span>
            <span className="font-medium capitalize">{studentData.parentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Aadhaar Number:</span>
            <span className="font-medium">{studentData.adhaarNumber}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2 " />
          Contact Information
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-gray-500" />
            <span className=" break-all">{studentData.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            <span className="">{studentData.phoneNumber}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1" />
            <div className="">
              <p className="capitalize">{studentData.place}, {studentData.district}, {studentData.state}</p>
              <p>PIN: {studentData.pincode}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Academic Information */}

      
    </div>

    <Card className=' mt-2 shadow-none border-l-4  border-black/60 '>
      <CardContent className='space-y-5 divide-y divide-black/60'>
      <div className="pb-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
          Academic Information
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Course:</span>
            <span className="font-medium">{studentData.ourseName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Batch Month:</span>
            <span className="font-medium">{studentData.batchMonth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Study Center:</span>
            <span className="font-medium">{studentData.studycenter}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Qualification:</span>
            <span className="font-medium">{studentData.qualification}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Admission Date:</span>
            <span className="font-medium">{formatDate(studentData.dateOfAdmission)}</span>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-orange-600" />
          Status Information
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Completed:</span>
            <span className={`font-medium ${studentData.isCompleted ? "text-green-600" : "text-red-600"}`}>
              {studentData.isCompleted ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Examination Passed:</span>
            <span className={`font-medium ${studentData.isPassed ? "text-green-600" : "text-red-600"}`}>
              {studentData.isPassed ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Certificate Issued:</span>
            <span className={`font-medium ${studentData.isCertificateIssued ? "text-green-600" : "text-red-600"}`}>
              {studentData.isCertificateIssued ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
      </CardContent>
    </Card>

    {/* Footer */}
    <div className="  border-gray-200 pt-6">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-600">Generated on: {format(new Date(), "PPP")}</p>
        </div>
        <div className="text-right">
          <div className="w-28 rounded-2xl h-14 border border-dashed border-gray-300 flex items-center justify-center mb-2">
            <span className="text-xs text-gray-500">Official Seal</span>
          </div>
          {/* <p className="text-xs text-gray-600">Authorized Signature</p> */}
        </div>
      </div>
    </div>

    {/* Watermark */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
      <img className="w-60" src={logo} alt="" />
    </div>
  </div>
  )
})



export default function StudentPDF({studentData}) {
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
    <div className="">
      <div className="">
        <div className=" ">
          <Button
            variant='outline'
            onClick={handlePrint}
          >
            <Printer className="w-5 h-5 mr-2" />
            Print Data
          </Button>
        </div>
        <div className="bg-white rounded-lg sr-only shadow-2xl overflow-hidden">
          {/* <div ref={componentRef}>asdfdf</div> */}
          <StudentCertificate ref={componentRef} studentData={studentData} />
        </div>
      </div>
    </div>
  )
}


