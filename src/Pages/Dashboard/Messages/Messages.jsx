import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { Form } from "react-bootstrap";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Messages() {
  const [Messages, setMessages] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const { i18n } = useTranslation();

  const navigate = useNavigate();

  // Get All Messages
  useEffect(() => {
    setLoading(true);
    Axios.get(`${baseUrl}/view-messages`)
      .then((data) => {
        setMessages(data.data.data.messages);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  async function getSearchedData() {
    try {
      const response =  await Axios.get(`/search-message?key=${search}&page=${1}`)
      if (response.status === 200) {
        setMessages(response.data.data.messages.data);
      } else if (response.status === 404) {
        setMessages([]);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessages([]);
      } else {
        console.log(err);
      }
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search,runUseEffect]);

  const confirmDelete = (slide) => {
    setSlideToDelete(slide);
    setShowModal(true);
  };

  //   handleDelete
  async function handleDelete(id) {
    try {
         await Axios.delete(`${baseUrl}/delete-message/${slideToDelete.id}`);
         setMessages((prev) => prev.filter((item) => item.id !== slideToDelete.id));
         toast.success("Deleted successfully");
         setRun((prev) => prev + 1);
         setShowModal(false);

    } catch {
      console.log("err");
    }
  }

  const datas = Messages.map((type, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{type.visitor_name}</td>
      <td>{type.visitor_email}</td>
      <td>{type.subject}</td>
      
      <td
        className="text-of responsiveDescription"
        style={{
          overflow: type.content.length > 15 ? "scroll" : "visible",
          whiteSpace: "nowrap",
        
        }}
      >
        {type.content}
      </td>
      <td className="">
        <i
           onClick={() => confirmDelete(type)}
          className="fa-solid fa-trash btn"
          style={{
            fontSize: "20px",
            color: "#fff",
            cursor: "pointer",
            // marginLeft:'13px',
            backgroundColor:'#ED7200',
            width:'75px'
          }}
        />
      </td>
    </tr>
  ));
  
  const handshowtext = (text) => {
    navigate(`show_content`, { state: { text } });
  };
  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Messages")}</h1>
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
              <th>{i18n.t("Email")}</th>
              <th>{i18n.t("Subject")}</th>
              <th>{i18n.t("Content")}</th>
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
      </div>
      <ConfirmDeleteModal
        word={'Message'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
