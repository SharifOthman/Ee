import { useEffect, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0); 
  const { id } = useParams();
  const location = useLocation();

  const user = location.state?.user;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      console.log("err");
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Please enter the name";
    if (!email) newErrors.email = "Please enter the email";
    if (!password) newErrors.password = "Please select a password";
    if (!role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nav = useNavigate();
  const { i18n } = useTranslation();

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("_method", "PUT");
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    if (image) {
      form.append("image", image);
    }
    form.append("role", role);

    try {
      await Axios.post(`${baseUrl}/update-user/${id}`, form);
      localStorage.setItem('UpdateC', 'true');
      nav("/dashboard/users");
    } catch (err) {
      if (err.response) {
        console.log("Error response:", err.response.data);
        if (
          err.response.data.errors?.email?.includes(
            "The email has already been taken."
          )
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "The email has already been taken.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            server: err.response.data.message,
          }));
        }
      } else {
        // Other errors
        console.log("Error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  }
  const handleGoBack = () => {
    nav(-1);
  };
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
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="bodyAuthf"  style={{marginTop:'20px'}}>
        <div className="wrapperf">
          <form onSubmit={handleSubmit}>
          <h3 className="text-center tt" style={{margin:'0',padding:'0'}}>
          <i
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
            class="fa-solid fa-arrow-left"
          ></i>
           {i18n.t("Update User")}
        </h3>
            <div className="input-box">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <label>Name</label>
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                style={{ display: "block", cursor: "pointer" }}
              ></i>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <div className="input-box">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
                id="role"
                name="role"
              >
                <option value=""> {i18n.t("Choose A Role")}</option>
                <option value="admin">{i18n.t("Admin")}</option>
                <option value="user"> {i18n.t("User")}</option>
              </select>
              {errors.role && (
                <small className="text-danger">{errors.role}</small>
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
