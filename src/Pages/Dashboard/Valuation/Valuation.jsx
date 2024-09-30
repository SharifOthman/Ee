import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Valuation() {
  const [Valuation, setValuation] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);

  // Get All Valuation
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-valuations?page=${page}`)
  //     .then((data) => {
  //       setValuation(data.data.data.valuations.data);
  //       setTotal(data.data.data.valuations.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [runUseEffect,page]);

  async function getSearchedData() {
    setLoading(true);
    try {
      const response = await Axios.get(
        `/search-valuation?key=${search}&page=${page}`
      );

      if (response.status === 200) {
        setValuation(response.data.data.valuations.data);
        setTotal(response.data.data.valuations.total);
      } else if (response.status === 404) {
        setValuation([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setValuation([]);
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
  }, [search]);

  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };

  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-valuation/${slideToDelete.id}`);
      setValuation((prev) =>
        prev.filter((item) => item.id !== slideToDelete.id)
      );
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = Valuation.map((type, index) => (
    <tr key={index}>
      <td>{page * 6 - 5 + index}</td>
      <td>{type.subject}</td>
      <td>{type.content}</td>
      <td>{type.contact_phone}</td>
      <td className="">
        <i
          onClick={() => confirmDelete(type)}
          className="fa-solid fa-trash btn"
          style={{
            fontSize: "15px",
            color: "#fff",
            cursor: "pointer",
            // marginLeft:'13px',
            backgroundColor: "#ED7200",
            width: "60px",
          }}
        />
      </td>
    </tr>
  ));

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Property Valuation")}</h1>
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
              <th>{i18n.t("Subject")}</th>
              <th>{i18n.t("Content")}</th>
              <th>{i18n.t("Phone")} </th>
              <th></th>
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
            <PaginatedItems setPage={setPage} data={Valuation} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
       word={'Valuation'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
