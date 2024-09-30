import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./footer.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../Api/Api";

export default function Footer({ isChecked }) {
  const { t } = useTranslation();
  const [Services, setServices] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // متغير لحفظ البريد الإلكتروني المُدخل
  const Mode = localStorage.getItem("mode");
  console.log(Mode);

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

  // Function to handle sending email
  const handleSendEmail = () => {
    if (userEmail) {
      // Use mailto to send email
      window.location.href = `mailto:info@eyeengineer.com?subject=Message from ${userEmail}&body=Hello, I would like to contact you.`;
    } else {
      alert("Please enter your email.");
    }
  };
  return (
    <div
      className={`footer  ${
        !isChecked ? "footer7" : "footer6"
      } pt-5 pb-5 text-white-50 text-center text-md-start`}
    >
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="info mb-5">
              {!isChecked ? (
                <img
                  src={require("../../../Assets/images/logo1.png")}
                  width="250px"
                  height="100px"
                  alt=""
                  className="mb-4"
                />
              ) : (
                <img
                  src={require("../../../Assets/images/Logo_Eye Engineer_Olive.png")}
                  width="250px"
                  height="100px"
                  alt=""
                  className="mb-4"
                />
              )}
              {/* <p
                className={`mb-5 ${!isChecked ? "fpf7" : "fpf6"}`}
                style={{ color: "#084B22",marginTop:'0',marginBottom:'0' }}
              >
                {t("FooterDescription")}
              </p> */}
              <div style={{marginTop:'0',marginBottom:'0'}}>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder={t("Enter your email")}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              {/* Button to send email */}
              <button
                className="btn rounded-pill main-btn w-100"
                onClick={handleSendEmail}
              >
                {t("Send Message")}
              </button>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="links">
              <h5 className={`${!isChecked ? "h7" : "h6"} text-light`}>
                {t("Useful Links")}
              </h5>
              <ul
                className={`list-unstyled  ${
                  !isChecked ? "list-unstyled7" : "list-unstyled6"
                } lh-lg`}
              >
                <NavLink to={"/"}>
                  <li>{t("Home")}</li>
                </NavLink>
                <NavLink to={"/about_us"}>
                  <li>{t("About Us")}</li>
                </NavLink>
                <NavLink to={"/capabilities"}>
                  <li>{t("Capabilities")}</li>
                </NavLink>
                <NavLink to={"/contact_us"}>
                  <li>{t("Contact Us")}</li>
                </NavLink>
                {Services[5] && Services[5].show_able === 1 ? (
                  <NavLink to={"/offices"}>
                    <li>{t("Reserve Office")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[4] && Services[4].show_able === 1 ? (
                  <NavLink to={"/terminologies"}>
                    <li>{t("Intelligent Translator")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                <NavLink to={"/privacy-policy"}>
                  <li>{t("Privacy Policy")}</li>
                </NavLink>
                <NavLink to={"/articles-policy"}>
                  <li>{t("Articles Policy")}</li>
                </NavLink>
                <NavLink to={"/questions-policy"}>
                  <li>{t("Questions Policy")}</li>
                </NavLink>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="links">
              <h5 className={`${!isChecked ? "h7" : "h6"} text-light`}>
                {t("Our Services")}
              </h5>
              <ul
                className={`list-unstyled ${
                  !isChecked ? "list-unstyled7" : "list-unstyled6"
                }  lh-lg`}
              >
                {Services[1] && Services[1].show_able === 1 ? (
                  <NavLink to={"/geometries"}>
                    {" "}
                    <li>{t("Geometries")}</li>{" "}
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[2] && Services[2].show_able === 1 ? (
                  <NavLink to={"/shows"}>
                    <li>{t("Educational Videos")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[3] && Services[3].show_able === 1 ? (
                  <NavLink to={"/recents"}>
                    <li>{t("Recents")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[7] && Services[7].show_able === 1 ? (
                  <NavLink to={"/engineering_articles"}>
                    <li>{t("Engineering Articles")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[6] && Services[6].show_able === 1 ? (
                  <NavLink to={"/valuation"}>
                    <li>{t("Property Valuation")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[5] && Services[5].show_able === 1 ? (
                  <NavLink to={"/offices"}>
                    <li>{t("Offices")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
                {Services[4] && Services[4].show_able === 1 ? (
                  <NavLink to={"/terminologies"}>
                    <li>{t("Terminologies")}</li>
                  </NavLink>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="contact">
              <h5
                className={`${!isChecked ? "h7" : "h6"} text-light`}
                style={{ marginBottom: "20px" }}
              >
                {t("Contact Us")}
              </h5>
              <ul
                className={`list-unstyled  ${
                  !isChecked ? "list-unstyled7" : "list-unstyled6"
                } lh-lg`}
              >
              
                  <li>
                    <a
                      className={`d-block text-light csi ${
                        !isChecked ? "ii7" : "ii6"
                      }`}
                      title="facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/eyeengineer?mibextid=ZbWKwL"
                    >
                      <i
                        className={`fa-brands ${
                          !isChecked ? "i7" : "i6"
                        } fa-facebook`}
                        style={{ marginRight: "8px", marginLeft: "8px" }}
                      ></i>
                      Facebook <span style={{ visibility: "hidden" }}>.</span>
                    </a>
                  </li>
              
                  <li>
                    <a
                      className={`d-block text-light csi ${
                        !isChecked ? "ii7" : "ii6"
                      }`}
                      title="instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/eyeengineer/"
                    >
                      <i
                        className={`fa-brands ${
                          !isChecked ? "i7" : "i6"
                        } fa-instagram`}
                        style={{ marginRight: "8px", marginLeft: "8px" }}
                      ></i>
                      Instagram
                    </a>
                  </li>
              
                  <li>
                    <a
                      title="tiktok"
                      className={`d-block text-light csi ${
                        !isChecked ? "ii7" : "ii6"
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.tiktok.com/@eye_engineer?_t=8oZFJF5ApO5&_r=1"
                    >
                      <i
                        className={`fa-brands ${
                          !isChecked ? "i7" : "i6"
                        } fa-tiktok`}
                        style={{ marginRight: "8px", marginLeft: "8px" }}
                      ></i>
                      Tiktok{" "}
                      <span style={{ visibility: "hidden" }}>.......</span>
                    </a>
                  </li>
              
                  <li>
                    <a
                      title="teams"
                      className={`d-block text-light csi ${
                        !isChecked ? "ii7" : "ii6"
                      }`}
                      href="https://teams.microsoft.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className={`fa-brands ${!isChecked ? "i7" : "i6"} fa-t`}
                        style={{ marginRight: "8px", marginLeft: "8px" }}
                      ></i>
                      Teams{" "}
                      <span style={{ visibility: "hidden" }}>.......</span>
                    </a>
                  </li>
              
                  <li>
                    <a
                      title="email"
                      className={`d-block text-light csi ${
                        !isChecked ? "ii7" : "ii6"
                      }`}
                      href="mailto:info@eyeengineer.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className={`fa-solid ${
                          !isChecked ? "i7" : "i6"
                        } fa-envelope`}
                        style={{ marginRight: "8px", marginLeft: "8px" }}
                      ></i>
                      Email{" "}
                      <span style={{ visibility: "hidden" }}>.......</span>
                    </a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Floating WhatsApp Icon */}
      {Services[0] && Services[0].show_able === 1 ? (
        <a
          href="https://wa.me/963984944832"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-floating-icon"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
