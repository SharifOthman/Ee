import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
// import LoadingSubmit from "../../../Components/Loading/loading";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ArticlesUserC({ idf }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { i18n } = useTranslation();


  let idValue = "";
  if (idf === "office_id") {
    idValue = location.state?.office?.id;
  } 
  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-article?key=${search}&${idf}=${idValue}&page=${page}`
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

  const datas = articles.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.title}</td>
      <td
        className="text-of responsiveDescription"
        style={{
          overflow: type.text.length > 15 ? "scroll" : "visible",
          whiteSpace: "nowrap",
        
        }}
      >
        {type.text}
      </td>
      <td>
        <a target="blank" href={`${Url}/${type.image}`} className="ats">
        {i18n.t("View")}
        </a>
      </td>
    </tr>
  ));
 
  const handshowtext = (text) => {
    navigate(`show_article`, { state: { text } });
  };
  const handleGoBack = () => {
      navigate(-1);
   
  };
  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">
          <i
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
            class="fa-solid fa-arrow-left"
          ></i>
         {i18n.t("articles")} 
        </h1>
        <div className="col-3 scm">
          <Form.Control
            type="search"
            aria-label="input example"
            placeholder={i18n.t("search")}
            className="my-2"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{i18n.t("Title")} </th>
              <th>{i18n.t("Text")} </th>
              <th>{i18n.t("Image")} </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan={12}>
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : searchLoading ? (
              <tr className="text-center">
                <td colSpan={12}>
                  <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">search...</span>
                  </div>
                </td>
              </tr>
            ) : datas.length === 0 ? (
              <td colSpan={12}>
                <div className="text-center">
                <span>{i18n.t("Recents are not found")}</span>
                </div>
              </td>
            ) : (
              datas
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems setPage={setPage} data={articles} total={total} />
          ) : null}
        </div>
      </div>
    </>
  );
}
