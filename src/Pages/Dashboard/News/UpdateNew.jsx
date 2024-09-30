import { useEffect, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { useTranslation } from "react-i18next";

export default function UpdateNew(){
  const [neww, setNew] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const location = useLocation();
  const new1 = location.state?.new1;
  const { i18n } = useTranslation();


  useEffect(() => {
    if (new1) {
      setNew(new1.new);
    } else {
      console.log("err");
    }
  }, [new1]);

  const validate = () => {
    const newErrors = {};
    if (!neww) newErrors.new = "Please enter the new";
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
    form.append("new", neww);
    form.append("priority",1);
    form.append("_method",'PUT');


    try {
      await Axios.post(`${baseUrl}/update-new/${id}`, form);
      localStorage.setItem('UpdateC', 'true');
      nav("/dashboard/news");
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", err.response.data);
        if (err.response.data.errors?.new?.includes("The new has already been taken.")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            new: "The new has already been taken.",
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
            {i18n.t("Update New")}
        </h3>
            <div className="input-box">
              <input
                value={neww}
                onChange={(e) => setNew(e.target.value)}
                type="text"
                placeholder="New"
              />
              <label>New</label>

              {errors.new && (
                <small className="text-danger">{errors.new}</small>
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