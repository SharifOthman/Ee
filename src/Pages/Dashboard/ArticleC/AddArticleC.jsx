import { useEffect, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

export default function AddArticleC({ idf,level }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { i18n } = useTranslation();
  const [isUploading, setIsUploading] = useState(false); // State for image uploading
  const [progress, setProgress] = useState(0); // State for progress

  const nb = true;
  const urlpath = window.location.href;
  const modifiedUrl = urlpath.replace(/^.*\/\/[^\/]+\/|\/[^\/]*$/g, "");

  const nav = useNavigate();
  const location = useLocation();

  let idValue =
    idf === "office_id"
      ? location.state?.idValue
      : idf === "recent_id"
      ? location.state?.idValue
      : idf === "geometry_id"
      ? location.state?.idValue
      : "";

  console.log(idValue);
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Please enter the title";
    if (!text) newErrors.text = "Please enter the text";
    if (!image) newErrors.image = "Please select an image";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("text", text);
    form.append("image", image);
    form.append(idf, idValue);

    try {
      await Axios.post(`${baseUrl}/add-article`, form);
      localStorage.setItem("AddC", "true");
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
  function restImage(){
    setImage("")
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
              {i18n.t("Add Article")}{level}
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
                placeholder="Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <label>Text</label>
              {errors.text && (
                <small className="text-danger">{errors.text}</small>
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
                  {image?.name}{image? <i style={{cursor:'pointer'}} onClick={restImage} class="fa-solid fa-xmark"></i> :''}
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
