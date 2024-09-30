import { useState } from "react";
import { useTranslation } from "react-i18next";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl } from "../../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSubmit from "../../../../Components/Loading/loading";
import { useNavigate } from "react-router-dom";

export default function Reset(){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);
    const { t } = useTranslation();
    const cookie = Cookie();
    const id = cookie.get("id");
    const nav = useNavigate();
    const validate = () => {
        let isValid = true;
        const newErrors = {};
        if (!code) newErrors.code = t("code is required");
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
          const response = await axios.post(`${baseUrl}/reset-password`, {
            id:id,
            code: code,
            new_password: password,
            confirm_password: confirmPassword,
          });
          setLoading(false);
          console.log(response);
          toast.success(t('passwordUpdate'));
          toast.success(t('golo'));
        
        } catch (error) {
          console.error("Error:", error);
          toast.error(t('The code is wrong'));
          setLoading(false);
        }
      };
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const togglePasswordVisibilityC = () => {
        setShowPasswordC(!showPasswordC);
      };
    return(
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
             <div className="input-boxx">
              <input
                type={showPassword ? "text" : "password"}
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
                type={showPasswordC ? "text" : "password"}
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
               {t("Accept")}
             </button>
           </form>
         </div>
       </div>
     </>
    )
}