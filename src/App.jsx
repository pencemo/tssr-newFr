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


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<Page />}>
          <Route index element={<Dashbord />} />
          <Route path="studycentre" element={<Outlet />}>
            <Route index element={<StudyCentre />} />
            <Route path="req" element={<Dashbord />} />
            <Route path="add" element={<NewStudy />} />
            <Route path="edit/:id" element={<EditStudyCen />} />
          </Route>
          <Route path="course" element={<Outlet />}>
            <Route index element={<Courses />} />
          </Route>
          <Route path="admission" element={<AdmissionSection />} />
          <Route path="students" element={<Dashbord />} />
          <Route path="hallticket" element={<Dashbord />} />
          <Route path="results" element={<Dashbord />} />
        </Route>
        {/* Routes for studycenter functionality */}
        <Route path="/studycenter" element={<PageForStudyCenter />}>
          <Route index element={<Dashbord />} />
          <Route path="students" element={<ViewStudent />} />
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
