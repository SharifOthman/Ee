import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import './text.css'
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
export default function Geometries() {
  const [Geometries, setGeometries] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const { i18n } = useTranslation();

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

  // Get All Geometries
  useEffect(() => {
    setLoading(true);
    Axios.get(`/view-geometries?page=${page}&paginate=6`)
      .then((data) => {
        const geometries = data.data.data.geometries.data;
        // Sort geometries by priority
        geometries.sort((a, b) => a.priority - b.priority);
        setGeometries(geometries);
        setTotal(data.data.data.geometries.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [page,runUseEffect]);

  // Update geometry priority
  async function updatePriority(id, newPriority) {
    try {
      const form = new FormData();
      form.append("_method", "PUT");
      form.append("priority", newPriority);
      await Axios.post(`${baseUrl}/update-geometry/${id}`, form);
      toast.success("Priority updated successfully");
      setRun((prev) => prev + 1);
    } catch (err) {
      console.log("Error updating priority", err);
    }
  }
  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };
  // handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-geometry/${slideToDelete.id}`);
      setGeometries((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch (err) {
      console.log("Error deleting geometry", err);
    }
  }

  const datas = Geometries.map((type, index) => (
    <tr key={type.id}>
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
          <a target="blank" href={`${Url}/${type.image}`} className="ats">
            {i18n.t("View")}
          </a>
        ) : (
          "......."
        )}
      </td>
      <td>
        <input
          type="number"
          value={type.priority}
          onChange={(e) => updatePriority(type.id, parseInt(e.target.value))}
          style={{ width: "60px", textAlign: "center" }}
        />
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
            marginLeft: "10px",
            marginRight: "10px",
          }}
        />
        <i
          className="fa-solid fa-arrow-right"
          title="classifications"
          style={{ fontSize: "20px", cursor: "pointer", color: "#111827" }}
          onClick={() => view_classification(type)}
        />
      </td>
    </tr>
  ));

  const handleEdit = (geo) => {
    navigate(`update_geometry/${geo.id}`, { state: { geo } });
  };

  const handshowtext = (text) => {
    navigate(`show_description`, { state: { text } });
  };

  const view_classification = (geo) => {
    navigate(`classifications/${1}`, { state: { geo } });
  };

  return (
    <>
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Geometries")}</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{i18n.t("Name")}</th>
              <th>{i18n.t("Description")}</th>
              <th>{i18n.t("Image")}</th>
              <th>{i18n.t("Priority")}</th>
              <th className="aaa">
                <NavLink
                  className="fa-solid fa-plus btn btnct"
                  to="add_Geometry"
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
            ) : datas.length === 0 ? (
              <tr>
                <td colSpan={12}>
                  <div className="text-center">
                    <span>{i18n.t("Recents are not found")}</span>
                  </div>
                </td>
              </tr>
            ) : (
              datas
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems setPage={setPage} data={Geometries} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'Geometry'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
