import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import Cookie from "cookie-universal";
import { useTranslation } from "react-i18next";

export default function OfficesUser() {
  const [OfficesU, setOfficesU] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [runUseEffect, setRun] = useState(0);

  const location = useLocation();
  const cookie = Cookie();
  const id = cookie.get("id");
  const user_id = id;

  const { i18n } = useTranslation();


  const navigate = useNavigate();

  async function getSearchedData() {
    setLoading(true);

    try {
      const response = await Axios.get(
        `${baseUrl}/search-office?key=${search}&page=${page}&user_id=${user_id}`
      );
      if (response.status === 200) {
        setOfficesU(response.data.data.offices.data);
        setTotal(response.data.data.offices.total);
      } else if (response.status === 404) {
        setOfficesU([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setOfficesU([]);
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

  const datas = OfficesU.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.user_email}</td>
      {/* <td>{type.description}</td> */}
      <td>{type.name}</td>
      <td>
        {type.image ? (
          <a target="blank" href={`${Url}/${type.image}`} className="ats">
           {i18n.t("View")}
          </a>
        ) : (
          "......."
        )}
      </td>
      <td>{type.contact_phone}</td>

      <td>
        {type.services.map((ser) => (
          <ul>
            <li>{ser}</li>
          </ul>
        ))}
      </td>
      <td>
        {type.experiences.map((exp) => (
          <ul>
            <li>{exp}</li>
          </ul>
        ))}
      </td>
      <td className="aaa">
        {type.status === 0 ? (
          <>
            <i
              title="Links"
              onClick={() => handleLinks(type)}
              className="fa-solid fa-link"
              style={{
                fontSize: "20px",
                color: "gray",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
            <i
              title="Files"
              onClick={() => handleFiles(type)}
              className="fa-solid fa-file"
              style={{
                fontSize: "20px",
                color: "black",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
            <i
              title="Articles"
              onClick={() => handleArticles(type)}
              className="fa-solid fa-newspaper"
              style={{
                fontSize: "20px",
                color: "#1E3050",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
          </>
        ) : (
        i18n.t("Forbidden")

  
        )}
      </td>
    </tr>
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

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">
          <NavLink className="ar" to={"/dashboard/users"}>
            <i class="fa-solid fa-arrow-left"></i>
          </NavLink>
        {i18n.t("Offices")} 

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
              <th>{i18n.t("ID")}</th>
              <th>{i18n.t("Email")}</th>
              <th>{i18n.t("Name")}</th>
              <th>{i18n.t("Image")}</th>
              <th>{i18n.t("Phone")}</th>
              <th>{i18n.t("services")}</th>
              <th>{i18n.t("Experiences")}</th>
              <th></th>
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
            <PaginatedItems setPage={setPage} data={OfficesU} total={total} />
          ) : null}
        </div>
      </div>
    </>
  );
}
