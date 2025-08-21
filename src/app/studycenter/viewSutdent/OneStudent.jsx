import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { useOneStudent } from '@/hooks/tanstackHooks/useStudents'
import { format } from 'date-fns'
import { formateDateToIST } from '@/lib/formateDate'
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Mail, MapPin, GraduationCap, FileText, Download, CheckCircle, XCircle, Clock } from "lucide-react"
import { Call02Icon, Location01Icon, MailOpen01Icon, StudentCardIcon } from 'hugeicons-react'
import StudentPDF from './StudentPDF'

function OneStudent() {
  // const {id} = useParams()
  const [searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const isEnrolled = searchParams.get('isEnroll');
  const {data, error, isLoading} = useOneStudent(id, isEnrolled)
  const navigate = useNavigate()

  if(isLoading) return <div className='w-full h-full'><Loader/></div>
  if(error) return <div>Error</div>
  
  const student = data?.data

  const getStatusBadge = (isCompleted, isPassed, isCertificateIssued) => {
    if(typeof isCompleted === "string"){
      return (
        <Badge variant="secondary"  >
        <Clock className="w-3 h-3 mr-1" />
        {isCompleted}
      </Badge>
      )
    }
    if (isCertificateIssued) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Certificate Issued
        </Badge>
      )
    }
    if (isPassed) {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Passed
        </Badge>
      )
    }
    if (isCompleted) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      )
    }
    return (
      <Badge variant="secondary">
        <Clock className="w-3 h-3 mr-1" />
        In Progress
      </Badge>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <Card className="overflow-hidden p-0">
          <div className="bg-primary px-6 py-10 flex max-sm:flex-col gap-2 justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img
                  src={student.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/055/581/121/small_2x/default-profile-picture-icon-avatar-photo-placeholder-illustration-vector.jpg"}
                  alt={student.name}
                  className="w-24 h-24 rounded-full bg-white border-2 border-white/80 object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-white ">{student.name}</h1>
                <p className="text-sm mb-3 text-white ">Admission No: {student.admissionNumber}</p>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(student.isCompleted, student.isPassed, student.isCertificateIssued)}
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    {student.courseName}
                  </Badge>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
            <StudentPDF studentData={student}/>
            <Button onClick={()=>navigate(-1)} className='h-8' variant='outline'>Back</Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-medium">{student?.name?.toUpperCase()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-gray-900 font-medium">{student.age} years</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900 font-medium">{formateDateToIST(student.dateOfBirth, 'PPP')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 font-medium">{student.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Parent/Guardian</label>
                    <p className="text-gray-900 font-medium">{student.parentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Qualification</label>
                    <p className="text-gray-900 font-medium">{student.qualification}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <Call02Icon size={20} className="text-muted-foreground" />
                    <div>
                      <label className="text-sm text-gray-500">Phone Number</label>
                      <p className="text-gray-900 font-medium">{student.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MailOpen01Icon size={20} className="text-muted-foreground" />
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="text-gray-900 font-medium">{student.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Location01Icon size={20} className="text-muted-foreground mt-1" />
                  <div>
                    <label className="text-sm text-gray-500">Address</label>
                    <p className="text-gray-900 font-medium">
                      {student.place}, {student.district}, {student.state} - {student.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <StudentCardIcon size={20} className="text-muted-foreground mt-1" />
                <div>
                  <label className="text-sm text-gray-500">Aadhaar Number</label>
                  <p className="text-gray-900 font-medium">{student.adhaarNumber}</p>
                </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic Information & Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Course</label>
                  <p className="text-gray-900 font-medium">{student.courseName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Batch Month</label>
                  <p className="text-gray-900">
                    {student.batchMonth} {student.year}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date of Admission</label>
                  <p className="text-gray-900">{format(new Date(student.dateOfAdmission), 'PPP')}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Enrolled Date</label>
                  <p className="text-gray-900">{format(new Date(student.enrolledDate), 'PPP')}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Study Center</label>
                  <p className="text-gray-900">{student.studycenter}</p>
                </div>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {typeof student.isCompleted != "string" ?<>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Course Completed</span>
                  {student.isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Examination Passed</span>
                  {student.isPassed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificate Issued</span>
                  {student.isCertificateIssued ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                </>:
                <div>
                <h1 className='text-sm text-muted-foreground'>Waiting for approval
                </h1>
                </div>
                }
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(student.sslc, "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  SSLC Certificate
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(student.profileImage, "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Profile Image
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-500">
              <div>
                <p>Student ID: {student._id}</p>
                {/* <p>Created: {format(new Date(student.createdAt), 'PPP')}</p> */}
              </div>
              <div className="text-right">
                {/* <p>Last Updated: {format(new Date(student.updatedAt), 'PPP')}</p> */}
                <p>Academic Year: {student.year}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
  
  
}

export default OneStudent

