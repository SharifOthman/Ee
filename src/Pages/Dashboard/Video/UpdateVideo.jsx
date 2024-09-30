import { useEffect, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

export default function UpdateVideo() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { i18n } = useTranslation();


  const { id } = useParams();
  const location = useLocation();
  const vid = location.state?.vid;

  useEffect(() => {
    if (vid) {
      setTitle(vid.title);
    } else {
      console.log("err");
    }
  }, [vid]);

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Please enter the title";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nav = useNavigate();

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("_method",'PUT');
    form.append("title", title);
   
    try {
      await Axios.post(`${baseUrl}/update-show/${id}`, form);
      localStorage.setItem('UpdateC', 'true');
      nav("/dashboard/educational_videos");
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", err.response.data);
        if (
          err.response.data.errors?.title?.includes(
            "The title has already been taken."
          )
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            title: "The title has already been taken.",
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


  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="bodyAuthf">
        <div className="wrapperf">
          <form onSubmit={handleSubmit}>
          <h3 className="text-center tt" style={{margin:'0',padding:'0'}}>
          <i
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
            class="fa-solid fa-arrow-left"
          ></i>
          {i18n.t("Update Video")}
        </h3>
            <div className="input-box">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />
              <label>Title</label>
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
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
