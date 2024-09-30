import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./content.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../Api/Api";

export default function Content() {
  const { t } = useTranslation();
  const [Services, setServices] = useState([]);

  // Get All Services
  useEffect(() => {
    axios
      .get(`${baseUrl}/home`)
      .then((data) => {
        setServices(data.data.data.services);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="blog pt-5 pb-5">
      <div className="container">
        <div className="row justify-content-center">
          {Services[1] && Services[1].show_able === 1 ? (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card d-flex flex-column align-items-center p-3">
                <h3 className="m-0 cg">{t("Geometries")}</h3>
                <div className="d-flex align-items-center m-0">
                  <img
                    src={require("../../../Assets/images/Main/هندسة-زيتي.png")}
                    alt=""
                    width="100px"
                    height="100px"
                    className="mr-2"
                  />
                  <span className="text-black-80">
                    {t("GeometriesDescription")}
                  </span>
                </div>
                <Link
                  to="/geometries"
                  className="btn rounded-pill main-btn m-0"
                >
                  {t("View")}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {Services[2] && Services[2].show_able === 1 ? (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card d-flex flex-column align-items-center p-3">
                <h3 className="m-0 cg">{t("Educational Videos")}</h3>
                <div className="d-flex align-items-center m-0">
                  <img
                    src={require("../../../Assets/images/Main/فيديوهات تعليمية-زيتي.png")}
                    alt=""
                    width="100px"
                    height="100px"
                    className="mr-2"
                  />
                  <span className="text-black-80">
                    {t("EducationalVideosDescription")}
                  </span>
                </div>
                <Link to="/shows" className="btn rounded-pill main-btn m-0">
                  {t("View")}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
           {Services[7] && Services[7].show_able === 1 ? (
             <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
             <div className="card d-flex flex-column align-items-center p-3">
               <h3 className="m-0 cg">{t('Engineering Articles')}</h3>
               <div className="d-flex align-items-center m-0">
                 <img
                   src={require("../../../Assets/images/Main/مقالات هندسية-زيتي.png")}
                   alt=""
                   width="100px"
                   height="100px"
                   className="mr-2"
                 />
                 <span className="text-black-80">
                   {t('EngineeringArticlesDescription')}
                 </span>
               </div>
               <Link to='/engineering_articles' className="btn rounded-pill main-btn m-0">{t('View')}</Link>
             </div>
           </div>
          ) : (
            ""
          )}
        
          {Services[3] && Services[3].show_able === 1 ? (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card d-flex flex-column align-items-center p-3">
                <h3 className="m-0 cg">{t("Recents")}</h3>
                <div className="d-flex align-items-center m-0">
                  <img
                    src={require("../../../Assets/images/Main/إدارة مشاريع-زيتي.png")}
                    alt=""
                    width="100px"
                    height="100px"
                    className="mr-2"
                  />
                  <span className="text-black-80">
                    {t("RecentsDescription")}
                  </span>
                </div>
                <Link to="/recents" className="btn rounded-pill main-btn m-0">
                  {t("View")}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {Services[4] && Services[4].show_able === 1 ? (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card d-flex flex-column align-items-center p-3">
                <h3 className="m-0 cg">{t("Terminologies")}</h3>
                <div className="d-flex align-items-center m-0">
                  <img
                    src={require("../../../Assets/images/Main/مصطلحات هندسية-زيتي.png")}
                    alt=""
                    width="100px"
                    height="100px"
                    className="mr-2"
                  />
                  <span className="text-black-80">
                    {t("TerminologiesDescription")}
                  </span>
                </div>
                <Link
                  to="/terminologies"
                  className="btn rounded-pill main-btn m-0"
                >
                  {t("View")}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {Services[5] && Services[5].show_able === 1 ? (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card d-flex flex-column align-items-center p-3">
                <h3 className="m-0 cg">{t("Offices")}</h3>
                <div className="d-flex align-items-center m-0">
                  <img
                    src={require("../../../Assets/images/Main/جديد-زيتي1.png")}
                    alt=""
                    width="100px"
                    height="100px"
                    className="mr-2"
                  />
                  <span className="text-black-80">
                    {t("OfficesDescription")}
                  </span>
                </div>
                <Link to="/offices" className="btn rounded-pill main-btn m-0">
                  {t("View")}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {Services[6] && Services[6].show_able === 1 ? (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <div className="card d-flex flex-column align-items-center p-3">
                <h3 className="m-0 cg">{t("valuation_title")}</h3>
                <div className="d-flex align-items-center m-0">
                  <img
                    src={require("../../../Assets/images/Main/تقييم عقاري-زيتي.png")}
                    alt=""
                    width="100px"
                    height="100px"
                    className="mr-2"
                  />
                  <span className="text-black-80">
                    {t("valuationDescription")}
                  </span>
                </div>
                <Link to="/valuation" className="btn rounded-pill main-btn m-0">
                  {t("View")}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
