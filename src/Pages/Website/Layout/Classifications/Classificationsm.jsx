import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { baseUrl, Url } from "../../../../Api/Api";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import Load from "../../../../Components/Loading/Load";

export default function Classificationsm({ level }) {
  const [Classifications, setClassifications] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();
  const geometry_id = location.state?.geo?.id;
  // Get All Classifications
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(
  //     `${baseUrl}/view-classifications?geometry_id=${geometry_id}?page=${page}&paginate=6`
  //   )
  //     .then((data) => {
  //       setClassifications(data.data.data.classifications.data);
  //       setTotal(data.data.data.classifications.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-classification?key=${search}&page=${page}&geometry_id=${geometry_id}`
      );
      if (response.status === 200) {
        setClassifications(response.data.data.classifications.data);
        setTotal(response.data.data.classifications.total);
      } else if (response.status === 404) {
        setClassifications([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setClassifications([]);
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
  }, [search, page, level]);

  const datas = Classifications.map((type, index) => (
    <div
      title={`classification${level + 1}`}
      className="col-md-6 col-lg-4 mb-4"
      key={index}
    >
      <div className="card border-bgo">
        {type.image ? (
          <img
            title={`classification${level + 1}`}
            onClick={() => view_classification(type)}
            style={{ cursor: "pointer" }}
            src={`${Url}/${type.image}`}
            alt="placeholder"
            className="card-img-top"
            height="250px"
            width="100px"
          />
        ) : (
          <img
          title={`classification${level + 1}`}
          onClick={() => view_classification(type)}
          style={{ cursor: "pointer" }}
            src={require("../../../../Assets/images/imageN.jpg")}
            alt="placeholder"
            className="card-img-top"
            height="250px"
            width="100px"
          />
        )}
        <div className="card-body bgg"  onClick={() => view_classification(type)}  style={{ cursor: "pointer" }}>
          <h3 className="card-title">{type.name}</h3>
          <p className="card-text">{type.description}</p>
        </div>
        <div className="card-footer bg-dark text-center">
          <button
            onClick={() => handleFiles(type)}
            className="btn btn-dark me-2"
          >
            files
          </button>
          <button
            onClick={() => handleArticles(type)}
            className="btn btn-dark me-2"
          >
            articles
          </button>
          <button onClick={() => handleLinks(type)} className="btn btn-dark">
            links
          </button>
        </div>
      </div>
    </div>
  ));
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleLinks = (geo) => {
    navigate(`links`, { state: { geo } });
  };
  const handleFiles = (geo) => {
    navigate(`files`, { state: { geo } });
  };
  const handleArticles = (geo) => {
    navigate(`articles`, { state: { geo } });
  };
  const view_classification = (geo) => {
    navigate(`classifications/${level+1}`, { state: { geo } });
  };
  return (
    <>
      <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200" ,borderBottom:'2px solid #084B22'}}
      >
        <i
          style={{ cursor: "pointer" }}
          onClick={handleGoBack}
          class="fa-solid fa-arrow-left"
        ></i>{" "}
        {t("Classifications")}
        {level}
      </h1>
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
            <PaginatedItems
              setPage={setPage}
              data={Classifications}
              total={total}
            />
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
              <h3>{t("Classifications are not found")}</h3>
            </div>
          ) : (
            datas
          )}
        </div>
      </div>
    </>
  );
}
