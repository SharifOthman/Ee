import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Axios } from "../../../../Api/axios";
import { baseUrl } from "../../../../Api/Api";
import LoadingSubmit from "../../../../Components/Loading/loading";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
 
  const { t } = useTranslation();

  const cookie = Cookie();
  const id = cookie.get("id");
  const nav = useNavigate();


  const validate = () => {
    const newErrors = {};
    if (!code) newErrors.code = t("code is required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const response = await Axios.post(`${baseUrl}/verify-code`, {
        code: code,
        id:id
      });
      setLoading(false);
      console.log(response);
      const { token } = response.data.data;
      cookie.set("token", token, { path: "/" });
      localStorage.setItem('SignUp', 'true');
       nav('/')
    } catch (error) {
      console.error("Error:", error);
      toast.error(t('The code is wrong'));
      setLoading(false);
    }
  };


  return (
    <>
       <ToastContainer />
      {loading && <LoadingSubmit />}
      <div className="bodyAuth">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <p className="text-center">{t("checkcode")}</p>
            <div className="input-boxx">
              <input
                type="text"
                placeholder={t("Code")}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && <p className="error-message">{errors.code}</p>}
            </div>
         
            <button className="btn" type="submit">
              {t("Accept")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
