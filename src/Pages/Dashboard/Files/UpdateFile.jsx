import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UpdateFile({idf,level}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false); // State for image uploading
  const [progress, setProgress] = useState(0); // State for progress
  const nb = true
  const url = window.location.href;
  const modifiedUrl = url.replace(/^.*\/\/[^\/]+\/|\/[^\/]+\/[^\/]+$/g, "");

  const { i18n } = useTranslation();

 
  const { id } = useParams();
  const location = useLocation();
  let idValue =
  idf === "office_id"
    ? location.state?.file?.office_id
    : idf === "recent_id"
    ? location.state?.file?.recent_id
    : idf === "geometry_id"
    ? location.state?.file?.geometry_id
    : "";
  const file1 = location.state?.file;
  const nav = useNavigate();

  useEffect(() => {
    if (file1) {
      setTitle(file1.title);
      setText(file1.text);
    } else {
      console.log("err");
    }
  }, [file1]);


  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Please enter the title";
    if (!text) newErrors.text = "Please enter the text";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("_method",'PUT');
    form.append("title", title);
    form.append("text", text);
    form.append("url", file);
    form.append(idf, idValue);

    try {
      await Axios.post(`${baseUrl}/update-file/${id}`, form);
      localStorage.setItem('UpdateC', 'true');
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
  function restFile(){
    setFile("")
    setProgress(0);

  }
  const handleImageUpload = (e) => {
    setIsUploading(true); // Start uploading
    setFile(e.target.files.item(0));
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
          <h3 className="text-center tt" style={{margin:'0',padding:'0'}}>
          <i
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
            class="fa-solid fa-arrow-left"
          ></i>
          {i18n.t("Update file")}{level}
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Text"
              />
              <label>Text</label>
              {errors.text && (
                <small className="text-danger">{errors.text}</small>
              )}
            </div>
            <div className="input-image">
              <label htmlFor="file-input" className="custom-file-upload">
              {i18n.t("Upload File")}
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
                  {file?.name}{file? <i style={{cursor:'pointer'}} onClick={restFile} class="fa-solid fa-xmark"></i> :''}
                  </>
                )}
              </div>
              {errors.file && (
                <div>
                  <small className="text-danger">{errors.file}</small>
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
