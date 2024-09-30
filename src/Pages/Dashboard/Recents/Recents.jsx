import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import { Form } from "react-bootstrap";
// import LoadingSubmit from "../../../Components/Loading/loading";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Recents() {
  const [Recents, setRecents] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();



  // Get All Recents
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-recents?page=${page}&paginate=6`)
  //     .then((data) => {
  //       setRecents(data.data.data.recents.data);
  //       setTotal(data.data.data.recents.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [runUseEffect, page]);

  async function getSearchedData() {
    setLoading(true);
    try {
      const response =await Axios.get(`/search-recent?key=${search}&page=${page}`)

      if (response.status === 200) {
        setRecents(response.data.data.recents.data);
        setTotal(response.data.data.recents.total);
      } else if (response.status === 404) {
        setRecents([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setRecents([]);
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
  }, [search,page,runUseEffect]);

  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };

  //   handleDelete
  async function handleDelete(id) {
    try {
         await Axios.delete(`${baseUrl}/delete-recent/${slideToDelete.id}`);
         setRecents((prev) => prev.filter((item) => item.id !== slideToDelete.id));
         toast.success("Deleted successfully");
         setRun((prev) => prev + 1);
         setShowModal(false);

    } catch {
      console.log("err");
    }
  }

  const datas = Recents.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
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
      <td className="aaa">
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
        </div>
      </td>
    </tr>
  ));
  const handshowtext = (text) => {
    navigate(`show_description`, { state: { text } });
  };
  
  const handleEdit = (recent) => {
    navigate(`update_recent/${recent.id}`, { state: { recent } });
  };
 
  const handleLinks = (recent) => {
    navigate(`links`, { state: { recent } });
  };

  const handleFiles = (recent) => {
    navigate(`files`, { state: { recent } });
  };
  const handleArticles = (recent) => {
    navigate(`articles`, { state: { recent } });
  };

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Recents")}</h1>
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
              <th>{i18n.t("Name")}</th>
              <th>{i18n.t("Description")}</th>
              <th>{i18n.t("Image")}</th>
              <th className="aaa">
                <NavLink
                  className="fa-solid fa-plus btn btnct"
                  to="add_recent"
                ></NavLink>
              </th>
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
            ) : datas.length === 0? (
              <td colSpan={12}>
              <div className="text-center">
                <span >data not found</span>
              </div>
            </td>
            ):datas}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems
              setPage={setPage}
              data={Recents}
              total={total}
            />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'Recent'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
