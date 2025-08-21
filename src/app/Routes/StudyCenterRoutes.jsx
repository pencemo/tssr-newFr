// src/app/Routes/StudyCenterRoutes.jsx
import React from "react";
import { Outlet, Route } from "react-router-dom";
import PageForStudyCenter from "../studycenter/PageForStudyCenter";
import DashbordStudy from "../studycenter/Dashboard/DashbordStudy";
import ViewStudent from "../studycenter/viewSutdent/viewStudent";
import OneStudent from "../studycenter/viewSutdent/OneStudent";
import StudentsVerification from "../studycenter/viewSutdent/StudentsVerification";
import { EditStudentForm } from "../studycenter/viewSutdent/EditStudentForm";
import CenterExams from "../studycenter/CenterExams/CenterExams";
import HallTicketSearch from "../studycenter/CenterExams/HallTicketSearch";
import NoData from "../../components/ui/noData";
import DownloadFiles from "../studycenter/Downloads/DownloadFiles";
import CentreStore from "../studycenter/Store/CentreStore";
import MyOrders from "../studycenter/Store/MyOrders";
import SettingsCentre from "../studycenter/SettingsCentre/SettingsCentre";
import CenterNotification from "../studycenter/Notifications/CenterNotification";
import CoursesStudyCente from "../studycenter/Course/CoursesStudyCente";
import Enrollment from "../studycenter/Admission/Enrollment";
import MarkSheet from "../studycenter/CenterExams/MarkSheet";
import FilterContext from "@/Context/FilterContext";

export default function StudyCenterRoutes() {
  return (
    <Route path="/" element={<PageForStudyCenter />}>
      <Route index element={<DashbordStudy />} />
      <Route path="students" element={<FilterContext><Outlet /></FilterContext>}>
        <Route index element={<ViewStudent />} />
        <Route path="verification" element={<StudentsVerification />} />
        <Route path="view" element={<OneStudent />} />
        <Route path="edit" element={<EditStudentForm />} />
      </Route>
      <Route path="examination" element={<Outlet />}>
        <Route index element={<CenterExams />} />
        <Route path="hallticket" element={<HallTicketSearch />} />
        <Route path="marklist" element={<MarkSheet />} />
      </Route>
      <Route path="downloads" element={<DownloadFiles />} />
      <Route path="store" element={<Outlet />}>
        <Route index element={<CentreStore />} />
        <Route path="myorders" element={<MyOrders />} />
      </Route>
      <Route path="settings" element={<SettingsCentre />} />
      <Route path="notifications" element={<CenterNotification />} />
      <Route path="courses" element={<CoursesStudyCente />} />
      <Route path="admission" element={<Enrollment />} />
    </Route>
  );
}
