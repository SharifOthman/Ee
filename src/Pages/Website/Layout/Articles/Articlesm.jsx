import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
// import LoadingSubmit from "../../../Components/Loading/loading";
import {useLocation, useNavigate } from "react-router-dom";
import { baseUrl, Url } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import Load from "../../../../Components/Loading/Load";


export default function Articlesm({idf,level}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  let idValue = '';
  if (idf === "office_id") {
    idValue = location.state?.office?.id 
              ?? location.state?.office_id 
              ?? location.state.idValue;
  } else if (idf === "recent_id") {
    idValue = location.state?.recent?.id 
              ?? location.state?.recent_id 
              ?? location.state.idValue;
  } else if (idf === "geometry_id") {
    idValue = location.state?.geo?.id 
              ?? location.state?.geometry_id 
              ?? location.state.idValue;
  }
  console.log(idf, idValue);
  
  async function getSearchedData() {
    try {
      const response = await Axios.get(`${baseUrl}/search-article?key=${search}&${idf}=${idValue}&page=${page}`)
      if (response.status === 200) {
        setArticles(response.data.data.articles.data);
        setTotal(response.data.data.articles.total);
      } else if (response.status === 404) {
        setArticles([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setArticles([]);
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
  // Get All articles
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-articles?${idf}=${idValue}&page=${page}`)
  //     .then((data) => {
  //       setArticles(data.data.data.articles.data);
  //       setTotal(data.data.data.articles.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);


  const datas = articles.map((type, index) => (
    <div key={index} className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-start">
            <div className="col-lg-6 text-right text-lg-left">
              <h2>{type.title}</h2>
              <p>{type.text}</p>
            </div>
            <div className="col-lg-6 text-center">
              <img
                height='500px'
                width='600px'
                src={`${Url}/${type.image}`}
                alt="Mercedes Logo"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  

  const handleGoBack = () => {
    navigate(-1);
};
  return (
    <>
   <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200",borderBottom:'2px solid #084B22' }}
      >
        {" "}
        <i
          style={{ cursor: "pointer" }}
          onClick={handleGoBack}
          class="fa-solid fa-arrow-left"
        ></i>
        {t("Articles")}{level}
      </h1>
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
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
        {total > 6 ? (
          <PaginatedItems setPage={setPage} data={articles} total={total} />
        ) : null}
      </div>
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
          <h3>{t('Articles are not found')}</h3>
        </div>
      ) : (
        datas
      )}
    </>
  );
}
