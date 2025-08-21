// src/app/Routes/AdminRoutes.jsx
import React from "react";
import { Outlet, Route } from "react-router-dom";
import Page from "../admin/page";
import Dashbord from "../admin/dashboard/dashbord";
import { StudyCentre } from "../admin/study centre/studycentre";
import NewStudy from "../admin/study centre/NewStudy";
import EditStudyCen from "../admin/study centre/EditStudyCen";
import Courses from "../admin/Course/Courses";
import AdmissionSection from "../admin/Admission/AdmissionSection";
import ViewStudent from "../studycenter/viewSutdent/viewStudent";
import OneStudent from "../studycenter/viewSutdent/OneStudent";
import StudentsVerification from "../studycenter/viewSutdent/StudentsVerification";
import { EditStudentForm } from "../studycenter/viewSutdent/EditStudentForm";
import ResultPage from "../admin/Result/ResultPage";
import UploadResult from "../admin/Result/UploadResult";
import DownloadFiles from "../studycenter/Downloads/DownloadFiles";
import Gallery from "../admin/Gallery/Gallery";
import Orders from "../admin/Store/Orders";
import Store from "../admin/Store/Store";
import Exams from "../admin/Examination/Exams";
import { CreateExam } from "../../components/admincomp/ExamComp/CreateExam";
import AdminSettings from "../admin/Settings/AdminSettings";
import AdminNotifications from "../admin/Notification/AdminNotifications";
import ManageNotifications from "../../components/studycenterComponents/NotificationComp/ManageNotification";
import ManageStaff from "../admin/Staff/ManageStaff";
import AddNewStaff from "../admin/Staff/AddNewStaff";
import RequestCourse from "../admin/Course/RequestCourse";
import SubjectList from "../admin/Course/SubjectList";
import CenterRequest from "../admin/study centre/CenterRequest";
import FilterContext from "@/Context/FilterContext";

export default function AdminRoutes() {
  return (
    <Route path="/" element={<Page />}>
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
      <Route path="students" element={<FilterContext><Outlet /></FilterContext>}>
        <Route index element={<ViewStudent />} />
        <Route path="verification" element={<StudentsVerification />} />
        <Route path="view" element={<OneStudent />} />
        <Route path="edit" element={<EditStudentForm />} />
      </Route>
      <Route path="results" element={<Outlet />}>
        <Route index element={<ResultPage />} />
        <Route path="upload" element={<UploadResult />} />
      </Route>
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
  );
}
