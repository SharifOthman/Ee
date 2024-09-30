import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard() {


  return (
    <>
      {/* <ToastContainer /> */}
      <div className="position-relative dashboard">
        <TopBar />
        <div className="d-flex gap-1" style={{ marginTop: "70px"}}>
          <SideBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
