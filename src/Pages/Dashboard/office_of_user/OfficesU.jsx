import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl, Url } from "../../../Api/Api";
import { Form } from "react-bootstrap";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import LoadingSubmit from "../../../Components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LoadingSubmit from "../../../Components/Loading/loading";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function OfficesU() {
  const [OfficesU, setOfficesU] = useState([]);
  const [loading, setLoading] = useState("");
  const [loading1, setLoading1] = useState("");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState(null);


  const location = useLocation();
  const user_id = location.state?.user?.id ?? location.state?.user_id;

  const navigate = useNavigate();

  // Get All Offices for users
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(
  //     `${baseUrl}/view-offices?user_id=${user_id}?page=${page}&paginate=6`
  //   )
  //     .then((data) => {
  //       setOfficesU(data.data.data.offices.data);
  //       setTotal(data.data.data.offices.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page, runUseEffect]);

  async function getSearchedData() {
    setLoading(true);

    try {
      const response =   await Axios.get(
      `/search-office?key=${search}&page=${page}&user_id=${user_id}`
    )
      if (response.status === 200) {
        setOfficesU(response.data.data.offices.data);
        setTotal(response.data.data.offices.total);
        
      } else if (response.status === 404) {
        setOfficesU([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setOfficesU([]);
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
      await Axios.delete(`${baseUrl}/delete-office/${slideToDelete.id}`);
      setOfficesU((prev) => prev.filter((item) => item.id !== slideToDelete.id));
      toast.success("Deleted successfully");
      setRun((prev) => prev + 1);
      setShowModal(false);
    } catch {
      console.log("err");
    }
  }
  async function handleDisplayOffice(type) {
    setLoading1(true)
    try {
      const response = await Axios.post(`${baseUrl}/panned-office/${type.id}`);
      toast.success('done successfully');
      setRun((prev) => prev + 1);
    } catch (error) {
      toast.success('done successfully');
      setRun((prev) => prev + 1);
      console.log("err");
    }finally{
      setLoading1(false)
    }
  }

  const datas = OfficesU.map((type, index) => (
    <tr key={index}>
      <td>{(page * 6)-5+index}</td>
      <td>{type.user_email}</td>
      {/* <td>{type.description}</td> */}
      <td>{type.name}</td>
      <td>
      {type.image ? (
          <a
            target="blank"
            href={`${Url}/${type.image}`}
            className="ats"
          >
            View
          </a>
        ) : (
          "......."
        )}
      </td>
      <td>{type.contact_phone}</td>

      <td>
        {type.services.map((ser) => (
          <ul>
            <li>{ser}</li>
          </ul>
        ))}
      </td>
      <td>
        {type.experiences.map((exp) => (
          <ul>
            <li>{exp}</li>
          </ul>
        ))}
      </td>
      <td className="aaa">
      <div style={{display:'flex',justifyContent:'space-evenly'}}>
        {type.status === 0 ? (
            <i
              className="fa-regular fa-circle"
              title="ban"
              style={{ fontSize: "20px", cursor: "pointer", color: "#111827",marginRight:'10px' }}
              onClick={() => handleDisplayOffice(type)}
            />
          ) : (
            <i
              title="remove the prohibition"
              className="fa-solid fa-ban"
              style={{ fontSize: "20px", cursor: "pointer", color: "#111827",marginRight:'10px' }}
              onClick={() => handleDisplayOffice(type)}
            />
          )}
         {type.status === 0 ?
          <>
            <i
              className="fa-solid fa-pen-to-square"
              style={{ fontSize: "20px", cursor: "pointer", color: "#084B22",   marginLeft:'7px',
                marginRight:'7px' }}
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
          </> :   i18n.t("Forbidden")}
      </div>
      </td>
    </tr>
  ));
  const add_office = (user_id) => {
    navigate(`add_office`, { state: { user_id } });
  };

  const handleEdit = (office) => {
    navigate(`update_office/${office.id}`, { state: { office } });
  };

  const handleLinks = (office) => {
    navigate(`links`, { state: { office } });
  };

  const handleFiles = (office) => {
    navigate(`files`, { state: { office } });
  };
  const handleArticles = (office) => {
    navigate(`articles`, { state: { office } });
  };

  return (
    <>
      {loading1 && <LoadingSubmit />}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt"><NavLink className='ar' to={'/dashboard/users'}><i class="fa-solid fa-arrow-left"></i></NavLink>{i18n.t("Offices")}</h1>
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
              <th> {i18n.t("Email")}</th>
              <th> {i18n.t("Name")}</th>
              <th> {i18n.t("Image")}</th>
              <th> {i18n.t("Phone")}</th>
              <th> {i18n.t("services")}</th>
              <th> {i18n.t("Experiences")}</th>
              <th className="aaa">
                <div
                  className="fa-solid fa-plus btn btnct"
                  onClick={() => add_office(user_id)}
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
            <PaginatedItems setPage={setPage} data={OfficesU} total={total} />
          ) : null}
        </div>
      </div>
      <ConfirmDeleteModal
        word={'Office'}
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
