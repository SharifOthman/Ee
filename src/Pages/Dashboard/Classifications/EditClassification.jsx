import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditClassification({ level }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [isUploading, setIsUploading] = useState(false); // State for image uploading
  const [progress, setProgress] = useState(0); // State for progress
  const nav = useNavigate();
  const location = useLocation();
  const classification = location.state?.classification;
  const geometry_id = classification.geometry_id;
  const nb = true;
  const url = window.location.href;
  const modifiedUrl = url.replace(/^.*\/\/[^\/]+\/|\/[^\/]+\/[^\/]*$/g, "");

  useEffect(() => {
    if (classification) {
      setName(classification.name);
      setDescription(classification.description);
    } else {
      console.log("err");
    }
  }, [classification]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Please enter the name";
    if (!description) newErrors.description = "Please enter the description";
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
    form.append("name", name);
    form.append("description", description);
    if (image) {
      form.append("image", image);
    }
    form.append("geometry_id", geometry_id);

    try {
      await Axios.post(`${baseUrl}/update-classification/${id}`, form);
      localStorage.setItem("UpdateC", "true");
      nav(`/${modifiedUrl}`, { state: { geometry_id, nb } });
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", err.response.data);
        if (
          err.response.data.errors?.name?.includes(
            "The name has already been taken."
          )
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "The name has already been taken.",
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
              {i18n.t("Update Classification")}
              {level}
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
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Description</label>
              {errors.description && (
                <small className="text-danger">{errors.description}</small>
              )}
            </div>
            <div className="input-image">
              <label htmlFor="file-input" className="custom-file-upload">
                {i18n.t("Upload Image")}
              </label>
              <input onChange={handleImageUpload} type="file" id="file-input" />
              <div
                className="image_span"
                style={{ marginLeft: "2px", marginTop: "4px" }}
              >
                {isUploading ? (
                  <>
                    <span>
                      {i18n.t("Uploading...")} {progress}%
                    </span>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: "#0F7638",
                        }}
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
