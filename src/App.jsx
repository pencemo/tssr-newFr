import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./app/Auth/login";
import Home from "./page/Home";
import Page from "./app/admin/page";
import Dashbord from "./app/admin/dashboard/dashbord";
import { StudyCentre } from "./app/admin/study centre/studycentre";
import NewStudy from "./app/admin/study centre/NewStudy";
import EditStudyCen from "./app/admin/study centre/EditStudyCen";
import Courses from "./app/admin/Course/Courses";
import AdmissionSection from "./app/admin/Admission/AdmissionSection";
import PageForStudyCenter from "./app/studycenter/PageForStudyCenter";
import AdmissionForStudent from "./app/studycenter/Admission/AdmissionForStudent";
import AdmissionUsingExcel from "./app/studycenter/Admission/AdmissionUsingExcel";
import ViewStudent from "./app/studycenter/viewSutdent/viewStudent";
import NoData from "./components/ui/noData";
import OneStudent from "./app/studycenter/viewSutdent/OneStudent";
import Protect from "./Context/ProtectedRoute";
import DownloadFiles from "./app/studycenter/Downloads/DownloadFiles";
import { PDFViewer } from "@react-pdf/renderer";
import PDFView from "./components/studycenterComponents/DownloadsFile/PDFView";
import DashbordStudy from "./app/studycenter/Dashboard/DashbordStudy";
import AdminSettings from "./app/admin/Settings/AdminSettings";
import SettingsCentre from "./app/studycenter/SettingsCentre/SettingsCentre";
import Store from "./app/admin/Store/Store";
import CentreStore from "./app/studycenter/Store/CentreStore";
import Orders from "./app/admin/Store/Orders";
import MyOrders from "./app/studycenter/Store/MyOrders";
import SubjectList from "./app/admin/Course/SubjectList";
import AdminNotifications from "./app/admin/Notification/AdminNotifications";
import CenterNotification from "./app/studycenter/Notifications/CenterNotification";
import StudentPDF from "./app/studycenter/viewSutdent/StudentPDF";


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/pdf"
          element={
            <div className="w-full h-screen flex justify-center items-center">
              <PDFViewer
                width={1000}
                height={500}
                className="w-full min-h-screen"
              >
                {/* <PDFView
                  name={"ATTENDANCE REGISTER"}
                  head={[
                    "Date",
                    "Subject 1",
                    "Subject 2",
                    "Subject 3",
                    "Subject 4",
                    "Subject 5",
                    "Subject 6",
                    "Online / Ofline",
                  ]}
                  data={{
                    success: true,
                    data: [
                      {
                        name: "Jane Smith",
                        registrationNumber: "10511002",
                        year: 2025,
                        enrolledDate: "2025-05-23T00:00:00.000Z",
                        isCompleted: "Not Completed",
                        isPassed: "Not Passed",
                        batchMonth: "December",
                        courseName: "Diploma in mear stack",
                      },
                      {
                        name: "Alex Johnson",
                        registrationNumber: "10511003",
                        year: 2025,
                        enrolledDate: "2025-05-23T00:00:00.000Z",
                        isCompleted: "Not Completed",
                        isPassed: "Not Passed",
                        batchMonth: "December",
                        courseName: "Diploma in mear stack",
                      },
                    ],
                    studycenterName: "Taptune",
                    courseName: "Diploma in mear stack",
                    year: 2025,
                  }}
                /> */}
                <StudentPDF data={{
    "_id": "68403cc44b9290dd089b4ce5",
    "year": 2026,
    "enrolledDate": "2025-06-04T12:32:04.415Z",
    "isCompleted": false,
    "isPassed": false,
    "isCertificateIssued": false,
    "createdAt": "2025-06-04T12:32:04.178Z",
    "updatedAt": "2025-06-04T12:32:04.178Z",
    "__v": 0,
    "name": "sinan",
    "age": 20,
    "dateOfBirth": "2025-06-04T12:29:38.123Z",
    "gender": "Male",
    "phoneNumber": "0123456789",
    "place": "kutiyadi",
    "district": "Dhubri",
    "state": "Assam",
    "pincode": "456543",
    "email": "muhamedsadhin@gmail.com",
    "adhaarNumber": "123456789049",
    "studyCenterId": "68381045170805f690f6997d",
    "registrationNumber": "10521005",
    "dateOfAdmission": "2025-06-04T12:29:38.123Z",
    "parentName": "hai",
    "qualification": "12th Pass",
    "sslc": "https://tssrfiles.s3.amazonaws.com/1749040317406_anshin_internship_1_(1).pdf",
    "profileImage": "https://tssrfiles.s3.amazonaws.com/1749040317406_data_(8).xlsx",
    "studentId": "SIN/789/543",
    "studycenter": "Neptune Mark",
    "batchMonth": "July",
    "ourseName": "BCA Jan"
}}/>
              </PDFViewer>
            </div>
          }
        />

        <Route
          path="/admin"
          element={
            <Protect requiredRole={["admin"]}>
              <Page />
            </Protect>
          }
        >
          <Route index element={<Dashbord />} />
          <Route path="studycentre" element={<Outlet />}>
            <Route index element={<StudyCentre />} />
            <Route path="req" element={<Dashbord />} />
            <Route path="add" element={<NewStudy />} />
            <Route path="edit/:id" element={<EditStudyCen />} />
          </Route>
          <Route path="course" element={<Outlet />}>
            <Route index element={<Courses />} />
            <Route path="subjects" element={<SubjectList />} />
          </Route>
          <Route path="admission" element={<AdmissionSection />} />
          <Route path="students" element={<Outlet />}>
            <Route index element={<ViewStudent />} />
            <Route path="view/:id" element={<OneStudent />} />
          </Route>
          <Route path="examination" element={<Dashbord />} />
          <Route path="results" element={<Dashbord />} />
          {/* <Route path="store" element={<Store />} /> */}
          <Route path="orders" element={<Outlet />}>
            <Route index element={<Orders />} />
            <Route path="products" element={<Store />} />
          </Route>
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notification" element={<AdminNotifications />} />
        </Route>

        {/* Routes for studycenter functionality */}
        <Route
          path="/studycenter"
          element={
            <Protect requiredRole={["studycenter_user"]}>
              <PageForStudyCenter />
            </Protect>
          }
        >
          <Route index element={<DashbordStudy />} />
          <Route path="students" element={<Outlet />}>
            <Route index element={<ViewStudent />} />
            <Route path="view/:id" element={<OneStudent />} />
          </Route>
          <Route path="examination" element={<NoData />} />
          <Route path="results" element={<NoData />} />
          <Route path="marksheet" element={<NoData />} />
          <Route path="downloads" element={<DownloadFiles />} />
          <Route path="store" element={<Outlet />}>
            <Route index element={<CentreStore />} />
            <Route path="myorders" element={<MyOrders />} />
          </Route>
          <Route path="settings" element={<SettingsCentre />} />
          <Route path="notifications" element={<CenterNotification />} />
          <Route path="admission" element={<Outlet />}>
            <Route index element={<AdmissionForStudent />} />
            <Route path="excel" element={<AdmissionUsingExcel />} />
            <Route path="results" element={<Dashbord />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App
