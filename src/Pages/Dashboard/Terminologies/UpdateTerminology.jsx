import { useEffect, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

export default function UpdateTerminology(){
  const [name, setName] = useState("");
  const [meaning, setMeaning] = useState("");
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { i18n } = useTranslation();


  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Please enter the name";
    if (!meaning) newErrors.meaning = "Please enter the meaning";
    if (!field) newErrors.field = "Please select the field";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { id } = useParams();
  const location = useLocation();
  const ter = location.state?.ter;

  useEffect(() => {
      if (ter) {
        setName(ter.name);
        setMeaning(ter.meaning);
        setField(ter.field)
      } else {
       console.log('err')
      }
    }, [ter]);

 
  

  const nav = useNavigate();

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("_method",'PUT');
    form.append("name", name);
    form.append("meaning", meaning);
    form.append("field", field);

    try {
      await Axios.post(`${baseUrl}/update-terminology/${id}`, form);
      localStorage.setItem('UpdateC', 'true');
      nav("/dashboard/terminologies");
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", err.response.data);
        if (err.response.data.errors?.name?.includes("The name has already been taken.")) {
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
              {i18n.t("Update Terminology")}
          
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
              placeholder="Meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
            />
            <label>Meaning</label>

            {errors.meaning && (
              <small className="text-danger">{errors.meaning}</small>
            )}
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Field"
              value={field}
              onChange={(e) => setField(e.target.value)}
            />
            <label>Field</label>

            {errors.field && (
              <small className="text-danger">{errors.field}</small>
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