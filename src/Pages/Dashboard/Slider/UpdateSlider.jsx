import { useEffect, useState } from "react";
import "./slider.css";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

export default function UpdateSlider() {
  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false); // State for image uploading
  const [progress, setProgress] = useState(0); // State for progress

  const { i18n } = useTranslation();


  const { id } = useParams();
  const location = useLocation();
  const slide = location.state?.slide;

  // useEffect(() => {
  //   if (slide) {
  //     setTitle(slide.title);
  //     setText(slide.text);
  //     // setImage(slide.image);
  //   } else {
  //     console.log("err");
  //   }
  // }, [slide]);

  const validate = () => {
    const newErrors = {};
    // if (!title) newErrors.title = "Please enter the title";
    // if (!text) newErrors.text = "Please enter the text";
    // if (!image) newErrors.image = "Please select an image";
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
    // form.append("title", title);
    // form.append("text", text);
    if (image) {
      form.append("image", image);
    }
    try {
      await Axios.post(`${baseUrl}/update-slide/${id}`, form);
      localStorage.setItem('UpdateC', 'true');
      nav("/dashboard/slides");
    } catch (err) {
      // if (err.response) {
      //   // Server responded with a status other than 2xx
      //   console.log("Error response:", err.response.data);
      //   if (
      //     err.response.data.errors?.title?.includes(
      //       "The title has already been taken."
      //     )
      //   ) {
      //     setErrors((prevErrors) => ({
      //       ...prevErrors,
      //       title: "The title has already been taken.",
      //     }));
      //   } else {
      //     setErrors((prevErrors) => ({
      //       ...prevErrors,
      //       server: err.response.data.message,
      //     }));
      //   }
      // } else {
      //   // Other errors
      //   console.log("Error:", err.message);
      // }
      console.log(err)
    } finally {
      setLoading(false);
    }
  }
  function resetImage() {
    setImage("");
    setProgress(0);
  }


  const handleGoBack = () => {
    nav(-1);
  };
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
      <div className="bodyAuthf">
        <div className="wrapperf">
          <form onSubmit={handleSubmit}>
          <h3 className="text-center tt" style={{margin:'0',padding:'0'}}>
          <i
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
            class="fa-solid fa-arrow-left"
          ></i>
         
          {i18n.t("Update Slider")}
        </h3>
            {/* <div className="input-box">
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
            </div> */}
            {/* <div className="input-box">
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
            </div> */}
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
