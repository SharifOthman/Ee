import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UpdateLink({ idf, level }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const nb = true;
  const { i18n } = useTranslation();

  const urll = window.location.href;
  const modifiedUrl = urll.replace(/^.*\/\/[^\/]+\/|\/[^\/]+\/[^\/]+$/g, "");
  const { id } = useParams();
  const location = useLocation();
  let idValue =
    idf === "office_id"
      ? location.state?.link?.office_id
      : idf === "recent_id"
      ? location.state?.link?.recent_id
      : idf === "geometry_id"
      ? location.state?.link?.geometry_id
      : "";

  const link = location.state?.link;
  const nav = useNavigate();

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
    } else {
      console.log("err");
    }
  }, [link]);

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Please enter the title";
    if (!url) newErrors.url = "Please enter the url";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("_method", "PUT");
    form.append("title", title);
    form.append("url", url);
    form.append(idf, idValue);

    try {
      await Axios.post(`${baseUrl}/update-link/${id}`, form);
      localStorage.setItem("UpdateC", "true");
      nav(`/${modifiedUrl}`, { state: { idValue, nb } });
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
            <h3
              className="text-center tt"
              style={{ margin: "0", padding: "0" }}
            >
              <i
                style={{ cursor: "pointer" }}
                onClick={handleGoBack}
                class="fa-solid fa-arrow-left"
              ></i>
              {i18n.t("Update Link")}
              {level}
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
            <div className="input-box">
              <input
                type="text"
                placeholder="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <label>Url</label>
              {errors.url && (
                <small className="text-danger">{errors.url}</small>
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
