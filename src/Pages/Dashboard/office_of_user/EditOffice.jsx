import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditOffice() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [contact_phone, setContact_phone] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [serviceInput, setServiceInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State for image uploading
  const [progress, setProgress] = useState(0); // State for progress
  const { i18n } = useTranslation();

  const { id } = useParams();

  const nav = useNavigate();
  const location = useLocation();
  const office = location.state?.office;

  const user_id = office.user_id;

  useEffect(() => {
    if (office) {
      setName(office.name);
      setDescription(office.description);
      setServices(office.services);
      setExperiences(office.experiences);
      setContact_phone(office.contact_phone);
    } else {
      console.log("err");
    }
  }, [office]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Please enter the name";
    if (!description) newErrors.description = "Please enter the description";
    if (!services.length)
      newErrors.services = "Please add at least one service";
    if (!experiences.length)
      newErrors.experiences = "Please add at least one experience";
    if (!contact_phone)
      newErrors.contact_phone = "Please enter the contact phone";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle adding items to array
  const handleAddService = () => {
    if (serviceInput.trim() !== "") {
      setServices([...services, serviceInput]);
      setServiceInput("");
    }
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleAddExperience = () => {
    if (experienceInput.trim() !== "") {
      setExperiences([...experiences, experienceInput]);
      setExperienceInput("");
    }
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
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
    for (let i = 0; i < services.length; i++) {
      form.append(`services[${i}]`, services[i]);
    }
    for (let i = 0; i < experiences.length; i++) {
      form.append(`experiences[${i}]`, experiences[i]);
    }
    form.append("contact_phone", contact_phone);
    form.append("user_id", user_id);

    try {
      await Axios.post(`${baseUrl}/update-office/${id}`, form);
      localStorage.setItem("UpdateC", "true");
      nav(`/dashboard/users/offices`, { state: { user_id } });
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

  // console.log("Form Data being sent:", {
  //   name,
  //   image,
  //   description,
  //   services,
  //   experiences,
  //   contact_phone,
  //   user_id,
  // });
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
      <div className="bodyAuthf" style={{ marginTop: "20px" }}>
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
              {i18n.t("Update Office")}
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

            <div className="mb-3 mt-3">
              <label
                htmlFor="serviceInput"
                className="form-label"
                style={{ color: "gray" }}
              ></label>
              <input
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                type="text"
                className="form-control"
                id="serviceInput"
                placeholder={i18n.t("Enter service")}
              />
              {errors.services && (
                <small className="text-danger d-block">{errors.services}</small>
              )}
              <a className="btn-gray mt-2" onClick={handleAddService}>
                {i18n.t("Add")}
              </a>
            </div>
            <ul className="list-group mb-3">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {service}
                  <a
                    className="btn-redd"
                    onClick={() => handleRemoveService(index)}
                  >
                    {i18n.t("Remove")}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mb-3 mt-3">
              <label
                htmlFor="experienceInput"
                className="form-label"
                style={{ color: "gray" }}
              ></label>
              <input
                value={experienceInput}
                onChange={(e) => setExperienceInput(e.target.value)}
                type="text"
                className="form-control"
                id="experienceInput"
                placeholder={i18n.t("Enter experience")}
              />
              {errors.experiences && (
                <small className="text-danger d-block">
                  {errors.experiences}
                </small>
              )}
              <a className="btn-gray mt-2" onClick={handleAddExperience}>
                {i18n.t("Add")}
              </a>
            </div>
            <ul className="list-group mb-3">
              {experiences.map((experience, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {experience}
                  <a
                    className="btn-redd"
                    onClick={() => handleRemoveExperience(index)}
                  >
                    {i18n.t("Remove")}
                  </a>
                </li>
              ))}
            </ul>

            <div className="input-box">
              <input
                type="text"
                placeholder="Contact Phone"
                value={contact_phone}
                onChange={(e) => setContact_phone(e.target.value)}
              />
              <label>Contact Phone</label>
              {errors.contact_phone && (
                <small className="text-danger">{errors.contact_phone}</small>
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
