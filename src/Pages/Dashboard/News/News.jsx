import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);

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

  // Get All news
  useEffect(() => {
    setLoading(true);
    Axios.get(`${baseUrl}/view-news`)
      .then((data) => {
        setNews(data.data.data.news);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [runUseEffect]);

  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };

  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-new/${slideToDelete.id}`);
      setNews((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = news.map((type, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{type.new}</td>
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
  const handleEdit = (new1) => {
    navigate(`update_new/${new1.id}`, { state: { new1 } });
  };

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("News")}</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{i18n.t("New")}</th>
              <th className="aaa">
                <NavLink
                  className="fa-solid fa-plus btn btnct"
                  to="add_new"
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
            ) : datas.length === 0 ? (
              <td colSpan={12}>
                <div className="text-center">
                  <span>data not found</span>
                </div>
              </td>
            ) : (
              datas
            )}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        word={'New'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
