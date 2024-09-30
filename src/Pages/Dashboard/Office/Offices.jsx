import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import LoadingSubmit from "../../../Components/Loading/loading";

export default function Offices() {
  const [Offices, setOffices] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Get All Offices
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
    setLoading(true);
    try {
      const response = await Axios.get(
        `/search-office?key=${search}&page=${page}`
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
    <tr key={index}>
      <td>{page * 6 - 5 + index}</td>
      <td>{type.user_email}</td>
      <td>{type.name}</td>
      <td
        className="text-of responsiveDescription"
        style={{
          overflow: type.description.length > 15 ? "scroll" : "visible",
          whiteSpace: "nowrap",
        
        }}
      >
        {type.description}
      </td>
      <td>
        <a target="blank" href={`${Url}/${type.image}`} className="ats">
          {i18n.t("View")}
        </a>
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
    </tr>
  ));
  const handshowtext = (text) => {
    navigate(`show_description`, { state: { text } });
  };

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <div className="table-container">
        <h1 className="text-center tt"> {i18n.t("Offices")}</h1>
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
              <th> {i18n.t("Email")}</th>
              <th> {i18n.t("Name")}</th>
              <th> {i18n.t("Description")}</th>
              <th> {i18n.t("Image")}</th>
              <th> {i18n.t("Phone")}</th>
              <th> {i18n.t("services")}</th>
              <th> {i18n.t("Experiences")}</th>

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
            <PaginatedItems setPage={setPage} data={Offices} total={total} />
          ) : null}
        </div>
      </div>
    </>
  );
}
