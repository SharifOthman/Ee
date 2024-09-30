import { useEffect, useState } from "react";
import LoadingSubmit from "../../../Components/Loading/loading";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [Geometries, setGeometries] = useState([]);
  const [Recents, setRecents] = useState([]);
  const [Offices, setOffices] = useState([]);

  const [selectedGeo, setSelectedGeo] = useState("");
 

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Please enter the title";
    if (!text) newErrors.text = "Please enter the text";
    if (!image) newErrors.image = "Please select an image";
    if (!selectedGeo) newErrors.geo = "Please select a Geometry";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const nav = useNavigate();

   // Get all Geo
   useEffect(() => {
    Axios.get(`${baseUrl}/view-geometries`)
      .then((data) => {
        setGeometries(data.data.data.geometries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   
  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("text", text); 
    form.append("image", image);
    form.append("geometry_id", selectedGeo);
    try {
       await Axios.post(`${baseUrl}/add-article`, form);
      nav("/dashboard/articles");
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", err.response.data);
        if (err.response.data.errors?.title?.includes("The title has already been taken.")) {
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

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="bodyAuthf">
        <div className="wrapperf">
          <form onSubmit={handleSubmit}>
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
            <div className="input-box">
              <select
                value={selectedGeo}
                onChange={(e) => setSelectedGeo(e.target.value)}
                className="form-select"
                id="category"
                name="category"
              >
                <option value="">Chosse A Geometry</option>
                {Geometries.map((Geometry) => (
                  <option key={Geometry.id} value={Geometry.id}>
                    {Geometry.name}
                  </option>
                ))}
              </select>
              {errors.geo && <small className="text-danger">{errors.geo}</small>}
            </div>
            <div className="input-image">
              <label htmlFor="file-input" className="custom-file-upload">
                Upload Image
              </label>
              <input
                onChange={(e) => setImage(e.target.files.item(0))}
                type="file"
                id="file-input"
              />
              <span className="image_span" style={{marginLeft:'2px'}}>{image?.name}</span>
              {errors.image && (
                <div><small className="text-danger">{errors.image}</small></div>
              )}
            </div>
          
            <button className="btn" type="submit">
              Save
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
