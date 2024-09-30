import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { Form } from "react-bootstrap";
// import LoadingSubmit from "../../../Components/Loading/loading";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function TerminologiesC() {
  const [TerminologiesC, setTerminologiesC] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);

  const location = useLocation();
  const terminology_id =
    location.state?.ter?.id ?? location.state?.terminology_id;

  // Get All TerminologiesC
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
  // }, [runUseEffect, page]);

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

  async function getSearchedData() {
    setLoading(true);
    try {
      const response = await Axios.get(
        `/search-terminology-categories?key=${search}&page=${page}&terminology_id=${terminology_id}`
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
        setLoading(false);

    }
  }
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
      await Axios.delete(`${baseUrl}/delete-terminology-category/${slideToDelete.id}`);
      setTerminologiesC((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = TerminologiesC.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.terminology_name}</td>
      <td>{type.name}</td>
      <td>{type.meaning}</td>
      <td>{type.field}</td>
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
            marginLeft:'7px',
            marginRight:'7px'
          }}
        />
      </td>
    </tr>
  ));
  const add_Category = (terminology_id) => {
    navigate(`add_Category`, { state: { terminology_id } });
  };

  const handleEdit = (ter) => {
    navigate(`update_Category/${ter.id}`, { state: { ter } });
  };

 

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">
        <NavLink className='ar' to={'/dashboard/terminologies'}><i class="fa-solid fa-arrow-left"></i></NavLink>
          {i18n.t("Terminologies Categories")}
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
              <th>{i18n.t("Terminologie")}</th>
              <th> {i18n.t("Name")}</th>
              <th>{i18n.t("Meaning")}</th>
              <th>{i18n.t("Field")}</th>
              <th className="aaa">
                <div
                  className="fa-solid fa-plus btn btnct"
                  onClick={() => add_Category(terminology_id)}
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
            <PaginatedItems
              setPage={setPage}
              data={TerminologiesC}
              total={total}
            />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'Category'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
