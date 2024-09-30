import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import LoadingSubmit from "../../../Components/Loading/loading";
import {Card, CardHeader } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { baseUrl } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import Load from "../../../../Components/Loading/Load";

export default function Linksm({ idf ,level}) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();


  const location = useLocation();
  const navigate = useNavigate();
  let idValue = "";
  if (idf === "office_id") {
    idValue = location.state?.office?.id;
  } else if (idf === "recent_id") {
    idValue = location.state?.recent?.id;
  } else if (idf === "geometry_id") {
    idValue = location.state?.geo?.id;
  }

  console.log(idf, idValue);

  // Get All Offices for users
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-links?${idf}=${idValue}&page=${page}`)
  //     .then((data) => {
  //       setLinks(data.data.data.links.data);
  //       setTotal(data.data.data.links.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);

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
    <div
      className="mb-3 container wt"
      key={index}
    >
      <Card>
        <CardHeader
          className="bct"
          style={{ border: "2px solid orange", borderRadius: "4px" }}
        >
          <span className="pr-2">▶</span>{" "}
          <a className="ats" href={type.url} target="blank">
            {type.url}
          </a>
          <span className=""> {`(${type.title})`}</span>
        </CardHeader>
      </Card>
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
        {t("Links")}{level}
      </h1>
      <div className="col-3 scm">
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
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
        {total > 6 ? (
          <PaginatedItems setPage={setPage} data={links} total={total} />
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
          <h3>{t('Links are not found')}</h3>
        </div>
      ) : (
        datas
      )}
    </>
  );
}
