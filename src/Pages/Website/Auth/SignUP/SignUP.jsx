import React, { useState } from "react";
import "./auth.css";
import Cookies from "cookie-universal";
import axios from "axios";
import { baseUrl, Url } from "../../../../Api/Api";
import LoadingSubmit from "../../../../Components/Loading/loading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordC, setShowPasswordC] = useState(true);

  const { t } = useTranslation();
  const cookies = Cookies();

  const nav = useNavigate();

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = t("User Name is required");
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = t("Email is required");
      isValid = false;
    }
    if (!password) {
      newErrors.password = t("Password is required");
      isValid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = t("Confirm Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t("Passwords do not match");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors
    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/register`, {
        name: userName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        role: "user",
      });
      setLoading(false);
      console.log(response.data.data);
      const { id } = response.data.data;
      const { role } = response.data.data;
      cookies.set("id", id, { path: "/" });
      cookies.set("role", role, { path: "/" });
      cookies.set("email", email, { path: "/" });
      cookies.set("name", userName, { path: "/" });
      nav("/verify_code");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const serverErrors = error.response.data.errors;
        if (serverErrors.email) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: t("The email has already been taken."),
          }));
        }
      } else {
        console.error(error);
        // handle other errors
      }
    }
  };
 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityC = () => {
    setShowPasswordC(!showPasswordC);
  };

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="bodyAuth">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">{t("Create an Account")}</h3>
            <div className="input-boxx">
              <input
                type="text"
                placeholder={t("User Name")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {/* <i className="fa-solid fa-user"></i> */}
              {errors.userName && (
                <div className="error">{errors.userName}</div>
              )}
            </div>
            <div className="input-boxx">
              <input
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <i className="fa-solid fa-envelope"></i> */}
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input-boxx">
              <input
                type={!showPassword ? "text" : "password"}
                placeholder={t("Password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{ display: "block", cursor: "pointer" }}
              ></i>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <div className="input-boxx">
              <input
                type={!showPasswordC ? "text" : "password"}
                placeholder={t("Confirm Password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={`fa-solid ${
                  showPasswordC ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibilityC}
                style={{ display: "block", cursor: "pointer" }}
              ></i>
              {errors.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </div>
            <button className="btn" type="submit">
              {t("SignUp")}
            </button>
            <hr />
            <a href={`${Url}/google_account`} style={{color:'#084B22'}}>
              <i class="fa-brands fa-square-google-plus" style={{fontSize:'40px'}}></i>
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
