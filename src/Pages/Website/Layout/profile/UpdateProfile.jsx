import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookie from "cookie-universal";
import LoadingSubmit from "../../../../Components/Loading/loading";
import { baseUrl } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isUploading, setIsUploading] = useState(false); // State for image uploading
  const [progress, setProgress] = useState(0); // State for progress


  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const nav = useNavigate();
  const cookie = Cookie();
  const id = cookie.get("id");
  const role = cookie.get("role");

  const Name= cookie.get("name");
  const Email= cookie.get("email");


  useEffect(() => {
    setUserName(Name)
    setEmail(Email)
  }, []);

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
    setErrors(newErrors);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function restImage() {
    setImage("");
  }

  const handleGoBack = () => {
    nav(-1);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("_method", "PUT");
    form.append("email", email);
    form.append("name", userName);
    if (image) {
      form.append("image", image);
    }
    form.append("role", role);
    form.append("password", password);

    try {
    const response = await Axios.post(`${baseUrl}/update-user/${id}`, form);
      // localStorage.setItem("UpdateUser", "true");
      const { image } = response.data.data;
      cookie.set("image", image, { path: "/" });
      cookie.set("name", userName, { path: "/" });
      cookie.set("email", email, { path: "/" });

      window.location.pathname = `/profile`;
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: err.response.data.message,
      }));
    } finally {
      setLoading(false);
    }
  }
  function resetImage() {
    setImage("");
    setProgress(0);
  }

  const handleImageUpload = (e) => {
    setIsUploading(true); // Start uploading
    setImage(e.target.files.item(0));
    setProgress(0); // Reset progress

    // Simulate an image upload progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false); // Stop uploading once progress reaches 100%
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10 every 100ms
      });
    }, 100); // Adjust the interval duration to simulate upload speed
  };
  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="bodyAuth">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {" "}
              <i
                style={{ cursor: "pointer" }}
                onClick={handleGoBack}
                class="fa-solid fa-arrow-left"
              ></i>
              {t("Edit Profile")}
            </h3>
            <div className="input-boxx">
              <input
                type="text"
                placeholder={t("User Name")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.userName && (
                <div className="error">{errors.userName}</div>
              )}
            </div>
            <div className="input-boxx">
              <input
              disabled
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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

            <div className="input-image">
              <label htmlFor="file-input" className="custom-file-upload">
                {i18n.t("Upload Image")}
              </label>
              <input onChange={handleImageUpload} type="file" id="file-input" />
              <div className="image_span" style={{ marginLeft: "2px", marginTop: "4px" }}>
                {isUploading ? (
                  <>
                    <span>{i18n.t("Uploading...")} {progress}%</span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progress}%`,backgroundColor:'#0F7638' }}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </>
                ) : (
                  <>
                    {image?.name}{" "}
                    {image && (
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={resetImage}
                        className="fa-solid fa-xmark"
                      ></i>
                    )}
                  </>
                )}
              </div>
              {errors.image && (
                <div>
                  <small className="text-danger">{errors.image}</small>
                </div>
              )}
            </div>

            <button className="btn" type="submit">
              {t("Accept")}
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
