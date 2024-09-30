import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Classifications({level}) {
  const [Classifications, setClassifications] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);

  const location = useLocation();
  const geometry_id = location.state?.geo?.id ?? location.state.geometry_id;
  console.log(geometry_id)
  const back = location?.state?.nb;

  const navigate = useNavigate();

  // Get All Classifications
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(
  //     `${baseUrl}/view-classifications?geometry_id=${geometry_id}?page=${page}&paginate=6`
  //   )
  //     .then((data) => {
  //       setClassifications(data.data.data.classifications.data);
  //       setTotal(data.data.data.classifications.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page, runUseEffect]);

  async function getSearchedData() {
    setLoading(true);

    try {
      const response = await Axios.get(
        `/search-classification?key=${search}&page=${page}&geometry_id=${geometry_id}`
      );
      if (response.status === 200) {
        setClassifications(response.data.data.classifications.data);
        setTotal(response.data.data.classifications.total);
      } else if (response.status === 404) {
        setClassifications([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setClassifications([]);
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
  }, [search, page,level,runUseEffect]);

  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };


  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-classification/${slideToDelete.id}`);
      setClassifications((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = Classifications.map((type, index) => (
    <tr key={index}>
      <td>{page * 6 - 5 + index}</td>
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
      {type.image ? (
          <a
            target="blank"
            href={`${Url}/${type.image}`}
            className="ats"
          >
             {i18n.t("View")}
          </a>
        ) : (
          "......."
        )}
      </td>
      <td>{type.geometry_name}</td>
      <td className="aaa" >
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
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
            }}
          />
          <i
            title="Links"
            onClick={() => handleLinks(type)}
            className="fa-solid fa-link"
            style={{
              fontSize: "20px",
              color: "gray",
              cursor: "pointer",
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
            }}
          />
           <i
            className="fa-solid fa-arrow-right"
            title="classifications"
            style={{ fontSize: "20px", cursor: "pointer", color: "#111827" }}
            onClick={() => view_classification(type)}
          />
        </div>
      </td>
    </tr>
  ));
  const add_classification = (geometry_id) => {
    navigate(`add_classification`, { state: { geometry_id } });
  };

  const handleEdit = (classification) => {
    navigate(`update_classification/${classification.id}`, {
      state: { classification },
    });
  };

  const handshowtext = (text) => {
    navigate(`show_description`, { state: { text } });
  };
  const handleLinks = (geo) => {
    navigate(`links`, { state: { geo } });
  };

  const handleFiles = (geo) => {
    navigate(`files`, { state: { geo } });
  };
  const handleArticles = (geo) => {
    navigate(`articles`, { state: { geo } });
  };
  const view_classification = (geo) => {
    navigate(`classifications/${level+1}`, { state: { geo } });
  };
  const handleGoBack = () => {
    if(back){
      navigate(-3);
    }else{
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
           {i18n.t("Classifications")}{level}
        </h1>
        <div className="col-3 scm">
          <Form.Control
            type="search"
            aria-label="input example"
            placeholder= {i18n.t("search")}
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
              <th> {i18n.t("Name")}</th>
              <th> {i18n.t("Description")}</th>
              <th> {i18n.t("Image")}</th>
           { level === 1 ?  <th> {i18n.t("Geometry")}</th> : <th> {i18n.t("Classification")}</th>}
              <th className="aaa">
                <div
                  className="fa-solid fa-plus btn btnct"
                  onClick={() => add_classification(geometry_id)}
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
                  <span>No Classifications Found</span>
                </div>
              </td>
            ) : (
              datas
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems
              setPage={setPage}
              data={Classifications}
              total={total}
            />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'Classification'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
