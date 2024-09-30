import React from "react";
import { useTranslation } from "react-i18next";
import Ae from "./Layout/AboutL/Ae";
import AAr from "./Layout/AboutL/AAr";
import AG from "./Layout/AboutL/AG";
import AT from "./Layout/AboutL/AT";
import Tabe from "../../Components/Tape/Tabe";

export default function About({ isChecked }) {
  const { t } = useTranslation();
  const {i18n } = useTranslation();
  console.log(i18n.resolvedLanguage)
  const lan = i18n.resolvedLanguage;

  return (
    <>
      <Tabe word={'About Us'} />
      <div className="container text-center my-5">
        <div className="row align-items-center justify-content-start">
          <div className="col-md-6">
            {!isChecked ? (
              <img
                src={require("../../Assets/images/logo1.png")}
                alt="Eye Engineer Logo"
                className="img-fluid"
                height='130px'
                width='380px'
              />
            ) : (
              <img
                src={require("../../Assets/images/Logo_Eye Engineer_Olive.png")}
                alt="Eye Engineer Logo"
                className="img-fluid"
                 height='130px'
                width='380px'
              />
            )}
          </div>
          <div className={`col-md-6 ${lan === 'ar' ?'text-end':'text-start' }`} style={{fontSize:'20px'}} >
           
            {lan === 'en' ? <Ae/> : lan === 'ar' ?  <AAr/> :lan === 'de' ? <AG/> :<AT/>}
           
          </div>
        </div>
      </div>
    </>
  );
}
