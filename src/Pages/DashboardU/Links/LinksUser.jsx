import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function LinksUser({ idf }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [runUseEffect, setRun] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  let idValue = "";
  if (idf === "office_id") {
    idValue = location.state?.office?.id;
  } 

  const { i18n } = useTranslation();


  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-link?key=${search}&${idf}=${idValue}&page=${page}`
      );
      if (response.status === 200) {
        setLinks(response.data.data.links.data);
        setTotal(response.data.data.links.total);
      } else if (response.status === 404) {
        setLinks([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setLinks([]);
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


  const datas = links.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.title}</td>
      <td>
        {" "}
        <a className="ats" href={type.url} target="blank">
          {type.url}
        </a>
      </td>
    </tr>
  ));

  

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
          {i18n.t("links")} 
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
              <th>{i18n.t("Url")} </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan={12}>
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : searchLoading ? (
              <tr className="text-center">
                <td colSpan={12}>
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">search...</span>
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
            <PaginatedItems setPage={setPage} data={links} total={total} />
          ) : null}
        </div>
      </div>
    </>
  );
}
