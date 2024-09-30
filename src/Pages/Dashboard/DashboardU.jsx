import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TopBarU from "../../Components/DashboardU/TopBarU";
import SideBarU from "../../Components/DashboardU/SideBarU";
export default function DashboardU() {
  const { t } = useTranslation();
  return (
    <>
      {/* <ToastContainer /> */}
      <div className="position-relative dashboard">
        <TopBarU />
        <div className="d-flex gap-1" style={{ marginTop: "70px" }}>
          <SideBarU />
          <Outlet />
        </div>
      </div>
    </>
  );
}
