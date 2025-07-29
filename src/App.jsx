import React from "react";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import Exams from "./app/admin/Examination/Exams";
import { CreateExam } from "./components/admincomp/ExamComp/CreateExam";
import CenterExams from "./app/studycenter/CenterExams/CenterExams";
import HallTicket from "./components/studycenterComponents/examComponents/hallTicketPDF";
import HallTicketSearch from "./app/studycenter/CenterExams/HallTicketSearch";
import ResetPassword from "./app/Auth/resetPassword";
import Enrollment from "./app/studycenter/Admission/Enrollment";
import ManageStaff from "./app/admin/Staff/ManageStaff";
import { EditStudentForm } from "./app/studycenter/viewSutdent/EditStudentForm";
import ManageNotifications from "./components/studycenterComponents/NotificationComp/ManageNotification";
import CoursesStudyCente from "./app/studycenter/Course/CoursesStudyCente";
import RequestCourse from "./app/admin/Course/RequestCourse";
import StudentsVerification from "./app/studycenter/viewSutdent/StudentsVerification";
import AddNewStaff from "./app/admin/Staff/AddNewStaff";
import PDFDesign from "./components/studycenterComponents/DownloadsFile/PDFDesign";
import CenterRequest from "./app/admin/study centre/CenterRequest";
import Gallery from "./app/admin/Gallery/Gallery";
import HTverification from "./page/HTverification";


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

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
            <Route path="req" element={<CenterRequest />} />
            <Route path="add" element={<NewStudy />} />
            <Route path="edit/:id" element={<EditStudyCen />} />
          </Route>
          <Route path="course" element={<Outlet />}>
            <Route index element={<Courses />} />
            <Route path="subjects" element={<SubjectList />} />
            <Route path="request" element={<RequestCourse />} />
          </Route>
          <Route path="admission" element={<AdmissionSection />} />
          <Route path="students" element={<Outlet />}>
            <Route index element={<ViewStudent />} />
            <Route path="verification" element={<StudentsVerification />} />
            <Route path="view" element={<OneStudent />} />
            <Route path="edit" element={<EditStudentForm />} />
          </Route>
          <Route path="results" element={<NoData />} />
          <Route path="downloads" element={<DownloadFiles />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="orders" element={<Outlet />}>
            <Route index element={<Orders />} />
            <Route path="products" element={<Store />} />
          </Route>
          <Route path="examination" element={<Outlet />}>
            <Route index element={<Exams />} />
            <Route path="create" element={<CreateExam />} />
          </Route>
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notification" element={<Outlet />}>
            <Route index element={<AdminNotifications />} />
            <Route path="manage" element={<ManageNotifications />} />
          </Route>
          <Route path="staff" element={<Outlet />}>
            <Route index element={<ManageStaff />} />
            <Route path="add-staff" element={<AddNewStaff />} />
          </Route>
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
            <Route path="verification" element={<StudentsVerification />} />
            <Route path="view" element={<OneStudent />} />
            <Route path="edit" element={<EditStudentForm />} />
          </Route>
          <Route path="examination" element={<Outlet />}>
            <Route index element={<CenterExams />} />
            <Route path="hallticket" element={<HallTicketSearch />} />
          </Route>
          <Route path="results" element={<NoData />} />
          <Route path="marksheet" element={<NoData />} />
          <Route path="downloads" element={<DownloadFiles />} />
          <Route path="store" element={<Outlet />}>
            <Route index element={<CentreStore />} />
            <Route path="myorders" element={<MyOrders />} />
          </Route>
          <Route path="settings" element={<SettingsCentre />} />
          <Route path="notifications" element={<CenterNotification />} />
          <Route path="courses" element={<CoursesStudyCente />} />
          <Route path="admission" element={<Enrollment />}/>
        </Route>
          <Route path="pdf" element={<PDFDesign />}/>
          <Route path="/ht-verification/:id" element={<HTverification />}/>
      </Routes>
    </Router>
  );
}

export default App
