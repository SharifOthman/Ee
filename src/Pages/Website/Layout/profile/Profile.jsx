import { Url } from "../../../../Api/Api";
import Cookie from "cookie-universal";
import 'react-toastify/dist/ReactToastify.css';
import './pro.css'
import Logout from "../../../../Components/Logout/Logout";
import DeleteUser from "../../../../Components/DeleteUser/DeleteUser";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function Profile() {
  const cookie = Cookie();
  const name = cookie.get("name");
  const token = cookie.get("token");
  const email = cookie.get("email");
  const image = cookie.get("image");

  console.log(token)

  // useEffect(() => {
  //   const uu = localStorage.getItem("UpdateUser");
   
  //   if (uu === "true") {
  //     toast.success(t("Profile modified successfully"));

  //     setTimeout(() => {
  //       localStorage.removeItem("UpdateUser");
  //     }, 100);
  //   }
  // }, []);
  const { t } = useTranslation();


  return (
    <>
    <ToastContainer />
      <div className="bodyAuth">
        <div className="wrapper">
        <div className="imgpro">
            {image ? (
              <img
                src={`${Url}/${image}`}
                alt="placeholder"
                className="card-img-top"
                height='300px'
                
              />
            ) : (
              <img
                src={require("../../../../Assets/images/user3.png")}
                alt="placeholder"
                className="card-img-top"
                 height='300px'
              />
            )}
        </div>
        <h3 className="text-center">{name}</h3>
        <h5 className="text-center">{email}</h5>
        <div className="hlo">
            <Logout/>
            <DeleteUser/>
            <Link className='btn rounded-pill main-btn' to='/update_profile' >{t("Edit")}</Link>
        </div>
        </div>
      </div>
    </>
  );
}
