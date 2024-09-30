import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
// import LoadingSubmit from "../../../Components/Loading/loading";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Videos() {
  const [videos, setVideos] = useState([]);
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

  // const showWichData = search.length > 0 ? filterData : slides;
  const navigate = useNavigate();

  async function getSearchedData() {
    setLoading(true);

    try {
      const response = await Axios.get(
        `/search-show?key=${search}&page=${page}`
      );

      if (response.status === 200) {
        setVideos(response.data.data.shows.data);
        setTotal(response.data.data.shows.total);
      } else if (response.status === 404) {
        setVideos([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setVideos([]);
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
  // Get All slides
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-shows?page=${page}`)
  //     .then((data) => {
  //       setVideos(data.data.data.shows.data);
  //       setTotal(data.data.data.shows.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [runUseEffect, page]);
  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true); 
  };

  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-show/${slideToDelete.id}`);
      setVideos((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success('Deleted successfully');
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  //   handleDisplayVideo
  async function handleDisplayVideo(type, n) {
    console.log(type);
    console.log(n);
    const form = new FormData();
    form.append("_method", "PUT");
    form.append("title", type.title);
    form.append("download_able", n);
    try {
      const response = await Axios.post(
        `${baseUrl}/update-show/${type.id}`,
        form
      );
      toast.success("done successfully");
      setRun((prev) => prev + 1);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  const datas = videos.map((type, index) => (
    <tr key={index}>
      <td>{page * 6 - 5 + index}</td>
      <td>{type.title}</td>
      <td>
        <NavLink target="blank" to={`${Url}/${type.url}`} className="ats">
        {i18n.t("View")}
        </NavLink>
      </td>
      <td className="aaa">
        {type.download_able === 0 ? (
          <i
            className="fa-solid fa-eye"
            title="hide download"
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: "#111827",
            }}
            onClick={() => handleDisplayVideo(type, 1)}
          />
        ) : (
          <i
            title="display download"
            className="fa-solid fa-eye-slash"
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: "#111827", 
            }}
            onClick={() => handleDisplayVideo(type, 0)}
          />
        )}
        <i
          className="fa-solid fa-pen-to-square"
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "#084B22",
            marginLeft: "10px",
            marginRight: "10px",
          }}
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
      </td>
    </tr>
  ));
  const handleEdit = (vid) => {
    navigate(`update_educational_video/${vid.id}`, { state: { vid } });
  };

  return (
    <>
      <ToastContainer />
      {/* {loading && <LoadingSubmit />} */}
      <div className="table-container">
        <h1 className="text-center tt">  {i18n.t("Educational Videos")}</h1>
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
              <th>{i18n.t("Title")}</th>
              <th>{i18n.t("Video")}</th>
              <th className="aaa">
                <NavLink
                  className="fa-solid fa-plus btn btnct"
                  to="add_educational_video"
                ></NavLink>
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
            <PaginatedItems setPage={setPage} data={videos} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
       word={'Video'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
