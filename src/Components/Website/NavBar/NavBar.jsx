import React, { useEffect, useCallback } from "react";
import Cookies from "cookie-universal";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = ({ isChecked, handleToggle }) => {
  const { i18n } = useTranslation();
  const cookies = Cookies();
  const token = cookies.get("token");
  const role = cookies.get("role");

  // dark mode

  // end dark mode

  const changeLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem("language", lng);
      document.body.dir = lng === "ar" ? "rtl" : "ltr";
    },
    [i18n]
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    changeLanguage(savedLanguage);
  }, [changeLanguage]);

  return (
    <nav
      className={`navbar ${
        !isChecked ? "navbar7" : "navbar6"
      } navbar-expand-lg sticky-top ${i18n.language === "ar" ? "rtl" : "ltr"}`}
    >
      {!isChecked ? (
        <div className="navbar-brand">
          <img
            src={require("../../../Assets/images/logo1.png")}
            width="150px"
            height="60px"
            alt=""
          />
        </div>
      ) : (
        <div className="navbar-brand">
          <img
            src={require("../../../Assets/images/Logo_Eye Engineer_Olive.png")}
            width="150px"
            height="60px"
            alt=""
          />
        </div>
      )}
      <button
        className={`navbar-toggler  ${
          !isChecked ? "navbar-toggler7" : "navbar-toggler6"
        }`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main"
        aria-controls="main"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="main">
        <ul
          className={`navbar-nav ms-auto mb-2 mb-lg-0 ${
            i18n.language === "ar" ? "ms-0" : ""
          }`}
        >
          <li className="nav-item">
            <NavLink
              className={`nav-link  ${
                !isChecked ? "nav-link7" : "nav-link6"
              } p-2 p-lg-3 active`}
              aria-current="page"
              to={"/"}
            >
              {i18n.t("Home")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link  ${
                !isChecked ? "nav-link7" : "nav-link6"
              } p-2 p-lg-3 active`}
              to={"about_us"}
            >
              {i18n.t("About Us")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link  ${
                !isChecked ? "nav-link7" : "nav-link6"
              } p-2 p-lg-3 active`}
              to={"Capabilities"}
            >
              {i18n.t("Capabilities")}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link  ${
                !isChecked ? "nav-link7" : "nav-link6"
              } p-2 p-lg-3 active`}
              to={"contact_us"}
            >
              {i18n.t("Contact Us")}
            </NavLink>
          </li>
          <li>
            <div
              className="dlm"
              onClick={handleToggle}
              style={{ cursor: "pointer", fontSize: "20px", color: "#ED7200" }}
            >
              {isChecked ? (
                <i className="fa-solid fa-moon"></i>
              ) : (
                <i class="fa-solid fa-sun"></i>
              )}
            </div>
          </li>
        </ul>
        {/* <DropdownButton
          id="dropdown-basic-button"
          title={
            <i
              style={{ fontSize: "20px", marginLeft: "5px" }}
              className="fa-solid fa-language"
            ></i>
          }
          className="btn bb"
          variant="secondary"
        >
          <Dropdown.Item onClick={() => changeLanguage("en")}>
            {" "}
            {i18n.t("English")}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeLanguage("ar")}>
            {i18n.t("Arabic")}
          </Dropdown.Item>
        </DropdownButton> */}
        <div class="paste-button">
          <button class="button">
            {" "}
            <i
              style={{ fontSize: "20px", marginLeft: "5px" }}
              className="fa-solid fa-language"
            ></i>{" "}
            &nbsp; ▼
          </button>
          <div class="dropdown-content">
            <a id="top" onClick={() => changeLanguage("en")}>
            {i18n.t("English")}
            </a>
            <a id="mid"  onClick={() => changeLanguage("ar")}>
            {i18n.t("Arabic")}
            </a>
            <a id="mid" onClick={() => changeLanguage("tr")}>
            {i18n.t("Turkish")}
            </a>
            <a id="bottom"  onClick={() => changeLanguage("de")}>
            {i18n.t("German")}
            </a>
          </div>
        </div>
        {/* darkmode & light mode */}
        {/* <div className="modeds">
          <label className="theme-switch">
            <input
              type="checkbox"
              className="theme-switch__checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            <div
              className={`theme-switch__container ${
                isChecked ? "theme-switch--dark" : ""
              }`}
            >
              <div className="theme-switch__clouds"></div>
              <div className="theme-switch__stars-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 144 55"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069ZM55.8313 44.0069C55.0551 44.8503 54.1114 45.2995 53 45.3545C54.1114 45.4095 55.0551 45.8587 55.8313 46.7112C56.6075 47.5546 56.9956 48.563 56.9956 49.7273C56.9956 48.9572 57.172 48.2513 57.5248 47.5913C57.8864 46.9312 58.3716 46.3995 58.9802 46.0053C59.5976 45.602 60.2679 45.3911 61 45.3545C59.8798 45.2903 58.9361 44.8503 58.16 44.0069C57.384 43.1635 56.996 42.1642 56.996 41C56.996 42.1642 56.6075 43.1635 55.8313 44.0069Z"
                    fill="#F8F8F8"
                  />
                </svg>
              </div>
              <div className="theme-switch__moon"></div>
              <div className="theme-switch__sun"></div>
            </div>
          </label>
        </div> */}

        {/* end  */}
        {!token ? (
          <>
            <Link className="btn rounded-pill main-btn" to={"/sign_up"}>
              {i18n.t("Sign Up")}
            </Link>
            <Link className="btn rounded-pill main-btn" to={"/login"}>
              {i18n.t("Login")}
            </Link>
          </>
        ) : (
          <Link className="btn rounded-pill main-btn" to={"/profile"}>
            {i18n.t("profile")}
          </Link>
        )}
        {role === "admin" ? (
          <Link className="btn rounded-pill main-btn" to={"/dashboard/info"}>
            {i18n.t("Dashboard")}
          </Link>
        ) : (
          ""
        )}
        {role === "user" ? (
          <Link
            className="btn rounded-pill main-btn"
            to={"/dashboard-user/my-offices"}
          >
            {i18n.t("Dashboard")}
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default NavBar;
