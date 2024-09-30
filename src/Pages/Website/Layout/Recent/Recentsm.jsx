import "bootstrap/dist/css/bootstrap.min.css";
import "./Recentsm.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { baseUrl, Url } from "../../../../Api/Api";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import Load from "../../../../Components/Loading/Load";
import Tabe from "../../../../Components/Tape/Tabe";

export default function Recentsm() {
  const [Recents, setRecents] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get All Recents
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-recents?page=${page}&paginate=6`)
  //     .then((data) => {
  //       setRecents(data.data.data.recents.data);
  //       setTotal(data.data.data.recents.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-recent?key=${search}&page=${page}`
      );

      if (response.status === 200) {
        setRecents(response.data.data.recents.data);
        setTotal(response.data.data.recents.total);
      } else if (response.status === 404) {
        setRecents([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setRecents([]);
        setTotal(0);
      } else {
        console.log(err);
      }
    } finally {
      setSearchLoading(false);
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search,page]);

  const datas = Recents.map((type, index) => (
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
            src={require('../../../../Assets/images/imageN.jpg')}
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
        <div className="card-footer bg-dark text-center">
          <button onClick={() => handleFiles(type)}  className="btn btn-dark me-2">files</button>
          <button onClick={() => handleArticles(type)} className="btn btn-dark me-2">articles</button>
          <button onClick={() => handleLinks(type)} className="btn btn-dark">links</button>
        </div>
      </div>
    </div>
  ));
  const handleLinks = (recent) => {
    navigate(`links`, { state: { recent } });
  };
  const handleFiles = (recent) => {
    navigate(`files`, { state: { recent } });
  };
  const handleArticles = (recent) => {
    navigate(`articles`, { state: { recent } });
  };
  return (
    <>
      <Tabe word={'Recents'} />
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
            <PaginatedItems setPage={setPage} data={Recents} total={total} />
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
              <h3>{t('Recents are not found')}</h3>
            </div>
          ) : (
            datas
          )}
        </div>
      </div>
    </>
  );
}
