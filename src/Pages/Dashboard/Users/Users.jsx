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

export default function Users() {
  const [Users, setUsers] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);
  // const showWichData = search.length > 0 ? filterData : slides;
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  async function getSearchedData() {
    setLoading(true);
    try {
      const response = await Axios.get(`/search-user?key=${search}&page=${page}`)


      if (response.status === 200) {
        setUsers(response.data.data.users.data);
        setTotal(response.data.data.users.total);
      } else if (response.status === 404) {
        setUsers([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setUsers([]);
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

  // // Get All Users
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-users?page=${page}`)
  //     .then((data) => {
  //       setUsers(data.data.data.users.data);
  //       setTotal(data.data.data.users.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [runUseEffect, page]);

  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-user/${slideToDelete.id}`);
      setUsers((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }

  const datas = Users.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.name}</td>
      <td>{type.email}</td>
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
      <td>{type.role}</td>

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
         {type.id === 1 ? '': <i
          className="fa-solid fa-arrow-right"
          title="offices"
          style={{ fontSize: "20px", cursor: "pointer", color: "#111827"}}
          onClick={() => view_users_offices(type)}
        /> }
      </td>
    </tr>
  ));
  const handleEdit = (user) => {
    navigate(`update_user/${user.id}`, { state: { user } });
  };
  const view_users_offices = (user) => {
    navigate(`offices`, { state: { user } });
  };
  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt"> {i18n.t("Users")}</h1>
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
              <th>{i18n.t("Image")}</th>
              <th>{i18n.t("Role")}</th>
              <th className="aaa">
                <NavLink
                  className="fa-solid fa-plus btn btnct"
                  to="add_user"
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
            <PaginatedItems setPage={setPage} data={Users} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'User'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
