import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { baseUrl, Url } from "../../../../Api/Api";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import Load from "../../../../Components/Loading/Load";
import Tabe from "../../../../Components/Tape/Tabe";

export default function Geometriesm() {
  const [Geometries, setGeometries] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get All geometries
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-geometries?page=${page}&paginate=6`)
  //     .then((data) => {
  //       setGeometries(data.data.data.geometries.data);
  //       setTotal(data.data.data.geometries.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-geometry?key=${search}&page=${page}`
      );

      if (response.status === 200) {
        setGeometries(response.data.data.geometries.data);
        setTotal(response.data.data.geometries.total);
      } else if (response.status === 404) {
        setGeometries([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setGeometries([]);
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
  }, [search,page]);

  const datas = Geometries.map((type, index) => (
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
          <h3 className="card-title">{type.name}</h3>
          <p className="card-text">{type.description}</p>
        </div>
        <div className="card-footerg text-center">
          <div
            onClick={() => view_classification(type)}
            className="btn rounded-pill main-btn me-2"
            style={{ marginBottom: "10px" }}
          >
           {t('View')}
          </div>
        </div>
      </div>
    </div>
  ));

  const view_classification = (geo) => {
    navigate(`classifications/${1}`, { state: { geo } });
  };


  return (
    <>
      <Tabe word={'Geometries'} />
      <div className="col-3 scm">
        <Form.Control
          type="search"
          aria-label="input example"
          placeholder= {t("search")}
          className="my-2"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems setPage={setPage} data={Geometries} total={total} />
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
              <h3>{t('Geometries are not found')}</h3>
            </div>
          ) : (
            datas
          )}
        </div>
      </div>
    </>
  );
}
