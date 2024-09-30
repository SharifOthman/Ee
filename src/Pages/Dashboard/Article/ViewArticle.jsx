import { useLocation, useNavigate } from "react-router-dom";
import { Url } from "../../../Api/Api";

export default function ViewArticle(){
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
    const location = useLocation();
    const text = location.state?.text;
    return(
        <>
            <div className="container text-center my-5">
            <h2 className="text-center" style={{marginBottom:'20px',color:'#084B22'}}> <i
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
            class="fa-solid fa-arrow-left"
          ></i>{text.title ? text.title : text.name}</h2>
            <div className="row align-items-center justify-content-start">
              <div className="col-md-6">
                <img
                  src={`${Url}/${text.image}`}
                  alt="Eye Engineer Logo"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6 text-start">
                <p className="lead" style={{ color: "#6c757d" }}>
                  <b>
                  {text.text? text.text : text.description}
                  </b>
                </p>
              </div>
            </div>
                  </div>
        </>
    )
}