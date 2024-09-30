import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Reservations() {
  const [Reservations, setReservations] = useState([]);
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




  // Get All Messages
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-reservations?page=${page}`)
  //     .then((data) => {
  //       setReservations(data.data.data.reservations.data);
  //       setTotal(data.data.data.reservations.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [runUseEffect,page]);

  async function getSearchedData() {
    setLoading(true)

    try {
      const response = await Axios.get(`/search-reservation?key=${search}&page=${page}`)

      if (response.status === 200) {
        setReservations(response.data.data.reservations.data);
        setTotal(response.data.data.reservations.total);
      } else if (response.status === 404) {
        setReservations([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setReservations([]);
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
         await Axios.delete(`${baseUrl}/delete-reservation/${slideToDelete.id}`);
         setReservations((prev) => prev.filter((item) => item.id !== slideToDelete.id));
         toast.success("Deleted successfully");
         setRun((prev) => prev + 1);
         setShowModal(false);

    } catch {
      console.log("err");
    }
  }

  const datas = Reservations.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.user_email}</td>
      <td>{type.office_name}</td>
      <td
        className="text-of responsiveDescription"
        style={{
          overflow: type.office_description.length > 15 ? "scroll" : "visible",
          whiteSpace: "nowrap",
        
        }}
      >
        {type.office_description}
      </td>
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
            backgroundColor:'#ED7200',
            width:'60px'
          }}
        />
      </td>
    </tr>
  ));
  
  const handshowtext = (text) => {
    navigate(`show_description`, { state: { text } });
  };

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Reservations")}</h1>
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
              <th>{i18n.t("Email")}</th>
              <th>{i18n.t("Name")}</th>
              <th>{i18n.t("Description")}</th>
              <th>{i18n.t("Phone")}</th>
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
            ): datas.length === 0? (
              <td colSpan={12}>
              <div className="text-center">
              <span>{i18n.t("Recents are not found")}</span>
              </div>
            </td>
            ):datas}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems setPage={setPage} data={Reservations} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'Reservation'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
