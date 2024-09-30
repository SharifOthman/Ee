import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import { baseUrl, Url } from "../../../../Api/Api";
import LoadingSubmit from "../../../../Components/Loading/loading";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);


  const { t } = useTranslation();

  const cookies = Cookie();

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = t("Email is required");
      isValid = false;
    }
    if (!password) {
      newErrors.password = t("Password is required");
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
      const response = await axios.post(`${baseUrl}/login`, {
        email: email,
        password: password,
      });
      setLoading(false);
      console.log(response);
      const { token } = response.data.data;
      const { role } = response.data.data;
      const { name } = response.data.data;
      const { id } = response.data.data;
      const { image } = response.data.data;
      cookies.set("token", token, { path: "/" });
      cookies.set("role", role, { path: "/" });
      cookies.set("email", email, { path: "/" });
      cookies.set("name", name, { path: "/" });
      cookies.set("id", id, { path: "/" });
      cookies.set("image", image, { path: "/" });
      localStorage.setItem("login", "true");
      window.location.pathname='/'
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: err.response.data.message,
      }));
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="bodyAuth">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">{t("Sign in")}</h3>
            <div className="input-boxx">
              <input
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
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
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <br />
            <div className="remember-forget">
              <Link className="tcg" to="/forget-password">
                {t("Forgot password?")}
              </Link>
            </div>
            <button className="btn" type="submit">
              {t("Login")}
            </button>

            <div className="register-link">
              <p>
                {t("Don't have an account?")}
                <Link className="tcg" to={"/sign_up"}>
                  {t("Register")}
                </Link>
              </p>
            </div>
            <hr />

            <a href={`${Url}/google_account`} style={{color:'#084B22'}}>
              <i class="fa-brands fa-square-google-plus" style={{fontSize:'40px'}}></i>
            </a>

            {errors.server && (
              <small className="text-danger mt-3 d-block">
                {errors.server}
              </small>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
