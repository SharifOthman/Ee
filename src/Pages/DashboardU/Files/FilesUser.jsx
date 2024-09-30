import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// import LoadingSubmit from "../../../Components/Loading/loading";

export default function FilesUser({ idf }) {
  const [Files, setFiles] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [runUseEffect, setRun] = useState(0);

  const { i18n } = useTranslation();


  const location = useLocation();
  const navigate = useNavigate();
  const back = location?.state?.nb;

  let idValue = "";
  if (idf === "office_id") {
    idValue =
      location.state?.office?.id ??
      location.state?.office_id ??
      location.state?.idValue;
  } 


  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-file?key=${search}&${idf}=${idValue}&page=${page}`
      );
      if (response.status === 200) {
        setFiles(response.data.data.files.data);
        setTotal(response.data.data.files.total);
      } else if (response.status === 404) {
        setFiles([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setFiles([]);
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
    setLoading(true)
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search,runUseEffect,page]);


  const datas = Files.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.title}</td>
      <td>{type.text}</td>
      <td>{type.type}</td>
      <td>
        <a target="blank" href={`${Url}/${type.url}`} className="ats">
        {i18n.t("View")}
        </a>
      </td>

      <td className="aaa">
        <i
          className="fa-solid fa-pen-to-square"
          style={{ fontSize: "20px", cursor: "pointer", color: "#084B22" }}
          onClick={() => handleEdit(type)}
        />
      </td>
    </tr>
  ));
  const add_file = (idValue) => {
    navigate(`add_file`, { state: { idValue } });
  };

  const handleEdit = (file) => {
    navigate(`update_file/${file.id}`, { state: { file } });
  };

  const handleGoBack = () => {
    if (back) {
      navigate(-3);
    } else {
      navigate(-1);
    }
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
            {i18n.t("files")}
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
              <th>{i18n.t("Type")} </th>
              <th>{i18n.t("Url")} </th>
              <th className="aaa">
                <div
                  className="fa-solid fa-plus btn btnct"
                  onClick={() => add_file(idValue)}
                ></div>
              </th>
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
            <PaginatedItems setPage={setPage} data={Files} total={total} />
          ) : null}
        </div>
      </div>
    </>
  );
}
