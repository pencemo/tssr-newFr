import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/Auth/login";
import Home from "./page/Home";
import ResetPassword from "./app/Auth/resetPassword";
import HTverification from "./page/HTverification";
import PDFDesign from "./components/studycenterComponents/DownloadsFile/PDFDesign";
import Protect from "./Context/ProtectedRoute";
import AdminRoutes from "./app/Routes/AdminRoutes";
import StudyCenterRoutes from "./app/Routes/StudyCenterRoutes";
import DownloadPdf from "./app/studycenter/viewSutdent/DownloadPdf";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <Protect requiredRole={["admin"]}>
              <Routes>
                {AdminRoutes()}
              </Routes>
            </Protect>
          }
        />

        {/* Study Center Routes */}
        <Route
          path="/studycenter/*"
          element={
            <Protect requiredRole={["studycenter_user"]}>
              <Routes>
                {StudyCenterRoutes()}
              </Routes>
            </Protect>
          }
        />

        <Route path="/ht-verification/:id" element={<HTverification />} />
        <Route path="/pdf" element={<DownloadPdf />} />
        {/* <Route path="pdf" element={<PDFDesign />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
