import { useEffect, useState } from "react";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { baseUrl } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Form } from "react-bootstrap";
import { Card, CardHeader } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Load from "../../../../Components/Loading/Load";

const TerminologiesmC = () => {
  const [TerminologiesC, setTerminologiesC] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const location = useLocation();
  const terminology_id = location.state?.ter?.id;

  const navigate = useNavigate();

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-terminology-categories?key=${search}&page=${page}&terminology_id=${terminology_id}`
      );
      if (response.status === 200) {
        setTerminologiesC(response.data.data.terminology_categories.data);
        setTotal(response.data.data.terminology_categories.total);
      } else if (response.status === 404) {
        setTerminologiesC([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setTerminologiesC([]);
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
  // Get All terminologies C
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(
  //     `${baseUrl}/view-terminology-categories?terminology_id=${terminology_id}?page=${page}`
  //   )
  //     .then((data) => {
  //       setTerminologiesC(data.data.data.terminology_categories.data);
  //       setTotal(data.data.data.terminology_categories.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);
  const datas = TerminologiesC.map((type, index) => (
    <div className="mb-3 container wt" key={index}>
      <Card>
        <CardHeader
          className="bct"
          style={{ border: "2px solid orange", borderRadius: "4px" }}
        >
          <span className="pr-2"></span> {type.name}:
          <span className="ctmf"> {`${type.meaning} (${type.field})`}</span>
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
        ></i>{" "}
        {t("TerminologiesC")}
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
          <PaginatedItems
            setPage={setPage}
            data={setTerminologiesC}
            total={total}
          />
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
          <h3>{t('Categories are not found')}</h3>
        </div>
      ) : (
        datas
      )}
    </>
  );
};

export default TerminologiesmC;
