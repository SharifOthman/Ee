import { useLocation, useNavigate } from "react-router-dom";

export default function ViewContent(){
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
          ></i>{text.office_name ? `office Name: ${text.office_name}` : `Subject: ${text.subject}`}</h2>
            <div className="row align-items-center justify-content-start">
              {/* <div className="col-md-6">
                <img
                  src={require('../../Assets/images/imageN.jpg')}
                  alt="Eye Engineer Logo"
                  className="img-fluid"
                />
              </div> */}
              <div className="col-md-12 text-start">
                <p className="lead" style={{ color: "#6c757d" }}>
                  <b>
                  {text.office_description? text.office_description : text.content}
                  </b>
                </p>
              </div>
            </div>
                  </div>
        </>
    )
}