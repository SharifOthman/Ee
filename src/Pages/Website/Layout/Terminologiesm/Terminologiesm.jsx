import { useEffect, useState } from "react";
import "./Terminologiesm.css";
import { useTranslation } from "react-i18next";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { baseUrl } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Form } from "react-bootstrap";
import {Card, CardHeader } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Load from "../../../../Components/Loading/Load";
import Tabe from "../../../../Components/Tape/Tabe";

const Terminologiesm = () => {
  const { t } = useTranslation();
  const [Terminologies, setTerminologies] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
 
// translate
  const [article, setArticle] = useState('');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [translation, setTranslation] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("article", article);
    form.append("source", source);
    form.append("target", target);
    try {
      const response =  await axios.post(`${baseUrl}/translate-article`, form);
      setTranslation(response.data.data.translated_article)
      setArticle('');
      setSource('');
      setTarget('');
      toast.success(t('translation successfully!'));
    } catch (err) {
      console.log(err);
      toast.error(t('Faild.'));
    }
  }
  async function getSearchedData() {
    try {
      const response = await Axios.get(`${baseUrl}/search-terminology?key=${search}&page=${page}`);
      if (response.status === 200) {
        setTerminologies(response.data.data.terminologies.data);
        setTotal(response.data.data.terminologies.total);
      } else if (response.status === 404) {
        setTerminologies([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setTerminologies([]);
        setTotal(0);
      } else {
        console.log(err);
      }
    } finally {
      setSearchLoading(false);
      setLoading(false)
    }
  }
  const filterByLetter = async (l) => {
    try {
      const response = await Axios.get(
        `${baseUrl}/filter-terminology?key=${l}&page=${page}`
      );
      if (response.status === 200) {
        setTerminologies(response.data.data.terminologies.data);
        setTotal(response.data.data.terminologies.total);
      } else if (response.status === 404) {
        setTerminologies([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setTerminologies([]);
        setTotal(0);
      } else {
        console.log(err);
      }
    } finally {
      setSearchLoading(false);
    }
  }
  
  useEffect(() => {
    setLoading(true)
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search,page]);
  // Get All terminologies
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-terminologies?page=${page}`)
  //     .then((data) => {
  //       setTerminologies(data.data.data.terminologies.data);
  //       setTotal(data.data.data.terminologies.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);
  const datas = Terminologies.map((type, index) => (
    <div className="mb-3 container wt" key={index}  onClick={() => view_Categories(type)}>
      <Card>
        <CardHeader
          className="cursor-pointer bct"
          style={{ border: '2px solid orange', borderRadius: '4px' }}
        >
          <span className="pr-2">▶</span> {type.name}:<span className="ctmf"> {`${type.meaning} (${type.field})`}</span>
        </CardHeader>
      </Card>
    </div>
  ));

  const view_Categories = (ter) => {
    navigate(`view_Categories`, { state: { ter } });
  };

  return (
    <>
      <ToastContainer />
      <Tabe word={'Terminologies'} />
      <div className="col-3 scm">
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Form.Control
            type="search"
            aria-label="input example"
            placeholder= {t("search")}
            className="my-2"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
          />
          <select
            style={{ padding: "0", height: "40px" }}
            onChange={(e) => {
              setSearchLoading(true);
              filterByLetter(e.target.value);
            }}
          >
            <option value=""></option>
            {letters.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
        {total > 6 ? (
          <PaginatedItems setPage={setPage} data={Terminologies} total={total} />
        ) : null}
      </div>
      {loading ? (
         <div className=" spinner-border1 dc" role="status">
         <Load/>
       </div>
      ) : searchLoading ? (
        <div className=" spinner-border1 dc" role="status">
        <Load/>
      </div>
      ) : datas.length === 0 ? (
        <div className="dc">
          <h3>Terminologies are not found</h3>
        </div>
      ) : (
        datas
      )}
      <hr className="line_t"/>
      <div className="container">
      <div className="row align-items-center">
      
        <div className="col-md-6">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                  className="form-control full-width"
                  id="article"
                  placeholder={t("text")}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="form-control full-width form-select"
                  id="source"
                  required
                >
                  <option value="">{t("Select Source Language")}</option>
                  <option value="en">{t("English")}</option>
                  <option value="ar">{t("Arabic")}</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="form-control full-width form-select"
                  id="target"
                  required
                >
                  <option value="">{t("Select Target Language")}</option>
                  <option value="en">{t("English")}</option>
                  <option value="ar">{t("Arabic")}</option>
                  
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-send btn-block full-width"
              >
                {t("translate")}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6 mb">
          <div className="border p-3">
            {translation || '..........'}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Terminologiesm;
