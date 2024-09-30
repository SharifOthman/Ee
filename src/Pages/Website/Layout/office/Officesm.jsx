import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { baseUrl, Url } from "../../../../Api/Api";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Load from "../../../../Components/Loading/Load";
import Tabe from "../../../../Components/Tape/Tabe";

export default function Officesm() {
  const [Offices, setOffices] = useState([]);

  const [office_name, setN] = useState([]);
  const [office_description, setD] = useState([]);
  const [contact_phone, setP] = useState([]);

  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get All offices
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-offices?page=${page}&paginate=6`)
  //     .then((data) => {
  //       setOffices(data.data.data.offices.data);
  //       setTotal(data.data.data.offices.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-office?key=${search}&page=${page}`
      );

      if (response.status === 200) {
        setOffices(response.data.data.offices.data);
        setTotal(response.data.data.offices.total);
      } else if (response.status === 404) {
        setOffices([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setOffices([]);
        setTotal(0);
      } else {
        console.log(err);
      }
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search, page]);

  const datas = Offices.map((type, index) => (
    <div className="col-md-6 col-lg-4 mb-4" key={index}>
      <div className="card border-bgo">
        {type.image ? (
          <img
            src={`${Url}/${type.image}`}
            alt="placeholder"
            className="card-img-top"
            height="250px"
            width="100px"
          />
        ) : (
          <img
            src={require("../../../../Assets/images/imageN.jpg")}
            alt="placeholder"
            className="card-img-top"
            height="250px"
            width="100px"
          />
        )}
        <div className="card-body bgg">
          <h3 className="card-title">
            {" "}
            {type.status === 0 ? <i style={{ color: "#2ec92c",fontSize:'20px' }} className="fa-solid fa-circle"></i> :     
            <i style={{ color: "red" ,fontSize:'20px'}} className="fa-solid fa-circle"></i> }
            {type.name}
          </h3>
          <p className="card-text">{type.description}</p>
          <hr style={{ color: "#ED7200" }} />
          <p className="card-text">
            <i className="fa-solid fa-phone" style={{ marginRight: "5px" }}></i>
            {type.contact_phone}
          </p>
        </div>
        <div className="card-footer bg-dark text-center">
          {type.status === 0 ? (
            <>
              <button
                onClick={() => handleFiles(type)}
                className="btn btn-dark me-2"
              >
                {t("files")}
              </button>
              <button
                onClick={() => handleArticles(type)}
                className="btn btn-dark me-2"
              >
                {t("articles")}
              </button>
              <button
                onClick={() => handleLinks(type)}
                className="btn btn-dark"
              >
                {t("links")}
              </button>
            </>
          ) : (
            <p style={{ color: "white", margin: "5px" }}>
              {t("The office is blocked")}
              <i className="fa-solid fa-ban"></i>
            </p>
          )}
        </div>
      </div>
    </div>
  ));
  const handleLinks = (office) => {
    navigate(`links`, { state: { office } });
  };
  const handleFiles = (office) => {
    navigate(`files`, { state: { office } });
  };
  const handleArticles = (office) => {
    navigate(`articles`, { state: { office } });
  };

  // handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("office_name", office_name);
    form.append("office_description", office_description);
    form.append("contact_phone", contact_phone);
    try {
      await Axios.post(`${baseUrl}/add-reservation`, form);
      setN("");
      setD("");
      setP("");
      toast.success(t("Message sent successfully!"));
    } catch (err) {
      console.log(err);
      toast.error(t("Failed to send message."));
      navigate("/login");
    }
  }

  return (
    <>
      <ToastContainer />
      <Tabe word={'Offices'} />
      <div className="col-3 scm">
        <Form.Control
          type="search"
          aria-label="input example"
          placeholder={t("search")}
          className="my-2"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems setPage={setPage} data={Offices} total={total} />
          ) : null}
        </div>
      </div>
      <div className="container mmmm">
        <div className="row justify-content-center">
          {loading ? (
            <div className=" spinner-border1 dc" role="status">
            <Load/>
          </div>
          ) : searchLoading ? (
            <div className=" spinner-border1 dc" role="status">
              <Load/>
            </div>
          ) : datas.length === 0 ? (
            <div className="dc">
              <h3>{t("Offices are not found")}</h3>
            </div>
          ) : (
            datas
          )}
        </div>
      </div>
      <hr className="line_t" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="p-4 sr border rounded">
              <h3> {t("Office_Reservation")}</h3>
              <p>{t("dr")}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    value={office_name}
                    onChange={(e) => setN(e.target.value)}
                    type="text"
                    className="form-control full-width"
                    id="office_name"
                    placeholder={t("office_name")}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    value={office_description}
                    onChange={(e) => setD(e.target.value)}
                    type="text"
                    className="form-control full-width"
                    id="office_description"
                    placeholder={t("office_description")}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    value={contact_phone}
                    onChange={(e) => setP(e.target.value)}
                    type="text"
                    className="form-control full-width"
                    id="contact_phone"
                    placeholder={t("contact_phone")}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-send btn-block full-width"
                >
                  {t("Send Message")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
