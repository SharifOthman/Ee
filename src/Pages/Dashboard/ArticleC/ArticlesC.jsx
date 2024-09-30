import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
// import LoadingSubmit from "../../../Components/Loading/loading";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function ArticlesC({ idf ,level}) {
  const [articles, setArticles] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);


  const location = useLocation();
  const navigate = useNavigate();
  const back = location?.state?.nb;

  let idValue = "";
  if (idf === "office_id") {
    idValue =
      location.state?.office?.id ??
      location.state?.office_id ??
      location.state?.idValue;
  } else if (idf === "recent_id") {
    idValue =
      location.state?.recent?.id ??
      location.state?.recent_id ??
      location.state?.idValue;
  } else if (idf === "geometry_id") {
    idValue =
      location.state?.geo?.id ??
      location.state?.geometry_id ??
      location.state?.idValue;
  }
  console.log(idf, idValue);

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `/search-article?key=${search}&${idf}=${idValue}&page=${page}`
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
    const ac = localStorage.getItem("AddC");
    const uc = localStorage.getItem("UpdateC");

    if (ac === "true") {
      toast.success("Added Successfully");

      setTimeout(() => {
        localStorage.removeItem("AddC");
      }, 100);
    }

    if (uc === "true") {
      toast.success("Updated Successfully");

      setTimeout(() => {
        localStorage.removeItem("UpdateC");
      }, 100);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search, page,runUseEffect]);

  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };
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
  // }, [runUseEffect, page]);

  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-article/${slideToDelete.id}`);
      setArticles((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = articles.map((type, index) => (
    <tr key={index}>
      <td>{page * 6 - 5 + index}</td>
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
      <td className="aaa">
        <i
          className="fa-solid fa-pen-to-square"
          style={{ fontSize: "20px", cursor: "pointer", color: "#084B22" }}
          onClick={() => handleEdit(type)}
        />
        <i
          onClick={() => confirmDelete(type)}
          className="fa-solid fa-trash"
          style={{
            fontSize: "20px",
            color: "#ED7200",
            cursor: "pointer",
            marginLeft: "7px",
            marginRight: "7px",
          }}
        />
      </td>
    </tr>
  ));
  const add_article = (idValue) => {
    navigate(`add_article`, { state: { idValue } });
  };

  const handleEdit = (article) => {
    navigate(`update_article/${article.id}`, { state: { article } });
  };

  const handshowtext = (text) => {
    navigate(`show_article`, { state: { text } });
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
          {i18n.t("articles")}{level}
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
              <th className="aaa">
                <div
                  className="fa-solid fa-plus btn btnct"
                  onClick={() => add_article(idValue)}
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
            <PaginatedItems setPage={setPage} data={articles} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={"Article"}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
