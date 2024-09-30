import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
// import LoadingSubmit from "../../../Components/Loading/loading";
import PaginatedItems from "../../../Components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


export default function Articles() {
  const [articles, setArticles] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  // const showWichData = search.length > 0 ? filterData : slides;
  const navigate = useNavigate();
  
  async function getSearchedData() {
    try {
      const response =  await Axios.get(`${baseUrl}/search-article?key=${search}&page=${page}`)
      if (response.status === 200) {
        setArticles(response.data.data.articles.data);
        setTotal(response.data.data.articles.total);
      } else if (response.status === 404) {
        setArticles([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setArticles([]);
        setTotal(0);
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
  }, [search]);
  // Get All articles
  useEffect(() => {
    setLoading(true);
    Axios.get(`${baseUrl}/view-articles?page=${page}`)
      .then((data) => {
        setArticles(data.data.data.articles.data);
        setTotal(data.data.data.articles.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [runUseEffect, page]);

  //   handleDelete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${baseUrl}/delete-article/${id}`);
      setArticles((prev) => prev.filter((item) => item.id !== id));
      toast.success('Deleted successfully');
      setRun((prev) => prev + 1);
    } catch {
      console.log("err");
    }
  }

  const datas = articles.map((type, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{type.title}</td>
      <td className="text-of">
        <div
          onClick={() => handshowtext(type)}
          className="ats"
          style={{ cursor: "pointer" }}
        >
          View text
        </div>
      </td>
      <td>
        <a
          target="blank"
          href={`http://127.0.0.1:8000/${type.image}`}
          className="ats"
        >
          View image
        </a>
      </td>
      <td>{type.geometry_name}</td>
      <td className="aaa">
        <i
          className="fa-solid fa-pen-to-square"
          style={{ fontSize: "20px", cursor: "pointer", color: "#084B22" }}
          onClick={() => handleEdit(type)}
        />
        <i
          onClick={() => handleDelete(type.id)}
          className="fa-solid fa-trash"
          style={{
            fontSize: "20px",
            color: "#ED7200",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        />
      </td>
    </tr>
  ));
  const handleEdit = (article) => {
    navigate(`update_article/${article.id}`, { state: { article } });
  };
  const handshowtext = (text) => {
    navigate(`show_article`, { state: { text } });
  };

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <ToastContainer />
      <div className="table-container">
        <h1 className="text-center tt">Articles</h1>
        <div className="col-3 scm">
          <Form.Control
            type="search"
            aria-label="input example"
            placeholder="search"
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
              <th>Title</th>
              <th>Text</th>
              <th>Image</th>
              <th>Geometry</th>
              <th className="aaa">
                <NavLink
                  className="fa-solid fa-plus btn btnct"
                  to="add_article"
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
                  <span>data not found</span>
                </div>
              </td>
            ) : (
              datas
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
          {total > 6 ? (
            <PaginatedItems setPage={setPage} data={articles} total={total} />
          ) : null}
        </div>
      </div>
    </>
  );
}
