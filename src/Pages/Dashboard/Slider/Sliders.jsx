import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";


export default function Sliders() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false); 
  const [slideToDelete, setSlideToDelete] = useState(null); 

  const navigate = useNavigate();

  async function getSearchedData() {
    try {
      const response = await Axios.get(`/view-slides?page=${page}&paginate=${1}`);
      if (response.status === 200) {
        setSlides(response.data.data.slides.data);
        setTotal(response.data.data.slides.total);
      } else if (response.status === 404) {
        setSlides([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSlides([]);
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

  
  async function handleDelete() {
    try {
      await Axios.delete(`${baseUrl}/delete-slide/${slideToDelete.id}`);
      setSlides((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success('Deleted successfully');
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = slides.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6) - 5 + index}</td>
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

  const handleEdit = (slide) => {
    navigate(`update_slide/${slide.id}`, { state: { slide } });
  };

  return (
    <>
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Slides")}</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{i18n.t("Image")}</th>
              <th className="aaa">
                <NavLink className="fa-solid fa-plus btn btnct" to="add_slider"></NavLink>
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
          {total > 6 ? <PaginatedItems setPage={setPage} data={slides} total={total} /> : null}
        </div>
      </div>

   
      <ConfirmDeleteModal
       word={'Slide'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
