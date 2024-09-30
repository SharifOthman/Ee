import { useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
export default function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const { i18n } = useTranslation();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Please enter the email";
    if (!password) newErrors.password = "Please select a password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("username", email);
    form.append("password", password);

    try {
      const res = await Axios.post(`${baseUrl}/update-env`, form);
      if (res.status === 200) {
        toast.success("done Successfully");
      }
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: err.response.data.message,
      }));
    } finally {
      setLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      {loading && <LoadingSubmit />}

      <div className="bodyAuthf" style={{ marginTop: "20px" }}>
        <div className="wrapperf">
          <form onSubmit={handleSubmit}>
            <h3
              className="text-center tt"
              style={{ margin: "0", padding: "0" }}
            >
              {i18n.t("Change Email")}
            </h3>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{padding:'0 70px 0 10px'}}
              />
              <label>Email</label>
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
            <div className="input-box">
              <input
                type={!showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{padding:'0 70px 0 10px'}}
              />
              <label>password</label>
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{ display: "block", cursor: "pointer",direction:"rtl" }}
              ></i>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <button className="btn" type="submit">
              {i18n.t("Save")}
            </button>
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
