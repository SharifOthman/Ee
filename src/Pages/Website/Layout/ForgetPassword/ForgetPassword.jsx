import { useState } from "react";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import LoadingSubmit from "../../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const { t } = useTranslation();
  const cookies = Cookie();

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = t("Email is required");
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
      const response = await axios.post(`${baseUrl}/forgot-password`, {
        email: email,
      });
      setLoading(false);
    //   console.log(response.data.data)
      const { id } = response.data.data;
      cookies.set("id", id, { path: "/" });
      nav('/reset-password')
    } catch (error) {
        console.error("Error:", error);
        toast.error(t('The Email not found'));
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
            <h3 className="text-center">{t("Enter your email")}</h3>
            <div className="input-boxx">
              <input
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              {errors.server && (
                <small className="text-danger mt-3 d-block">
                  {errors.server}
                </small>
              )}
                
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
