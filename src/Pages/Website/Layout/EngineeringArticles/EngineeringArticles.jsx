import { useEffect, useState } from "react";
import "./EngineeringArticles.css";
import { useTranslation } from "react-i18next";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { baseUrl, Url } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Form } from "react-bootstrap";
import Load from "../../../../Components/Loading/Load";
import Tabe from "../../../../Components/Tape/Tabe";

const EngineeringArticles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-article?key=${search}&page=${page}`
      );
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
        // يمكنك التعامل مع أخطاء أخرى هنا
      }
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  }

  const filterByLetter = async (l) => {
    try {
      const response = await Axios.get(
        `${baseUrl}/filter-article?key=${l}&page=${page}`
      );
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
        // يمكنك التعامل مع أخطاء أخرى هنا
      }
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search, page]);
  // // Get All articles
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-articles?page=${page}`)
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
              <h4 style={{ color: "#ED7200" }}>
                {type.title}
                {type.geometry_name
                  ? ` (classification name: ${type.geometry_name})`
                  : type.recent_name
                  ? ` (Recent name: ${type.recent_name})`
                  : ` (Office name: ${type.office_name})`}
              </h4>
              <p style={{ fontSize: "25px", color: "#084B22" }}>{type.text}</p>
            </div>
            <div className="col-lg-6 text-center">
              <img
                height="500px"
                width="600px"
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

  return (
    <>
      <Tabe word={'EngineeringArticles'} />
      <div className="col-3 scm ">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Form.Control
            type="search"
            aria-label="input example"
            placeholder="search"
            className="my-2"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
          />
          <select
            style={{ padding: "0", height: "40px" }}
            onChange={(e) => {
              setSearchLoading(true);
              filterByLetter(e.target.value);
            }}
          >
            <option value=""></option>
            {letters.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
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
          <h3>{t("Articles are not found")}</h3>
        </div>
      ) : (
        datas
      )}
    </>
  );
};

export default EngineeringArticles;
