import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Show.css"; // Assuming you have a CSS file for additional styling
import { Form } from "react-bootstrap";
import { baseUrl, Url } from "../../../../Api/Api";
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import { Axios } from "../../../../Api/axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Load from "../../../../Components/Loading/Load";
import Tabe from "../../../../Components/Tape/Tabe";

const Show = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  async function getSearchedData() {
    try {
      const response = await Axios.get(
        `${baseUrl}/search-show?key=${search}&page=${page}`
      );
      if (response.status === 200) {
        setVideos(response.data.data.shows.data);
        setTotal(response.data.data.shows.total);
      } else if (response.status === 404) {
        setVideos([]);
        setTotal(0);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setVideos([]);
        setTotal(0);
      } else {
        console.log(err);
        // يمكنك التعامل مع أخطاء أخرى هنا
      }
    } finally {
      setSearchLoading(false);
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    const debounce = setTimeout(() => {
      search.length >= 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search,page]);
  // Get All slides
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`${baseUrl}/view-shows?page=${page}`)
  //     .then((data) => {
  //       setVideos(data.data.data.shows.data);
  //       setTotal(data.data.data.shows.total);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [page]);
  // share
  const handleShareLink = (urll) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          text: "Here is something interesting for you:",
          url: `${Url}/${urll}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.error("Web share not supported in this browser.");
    }
  };
  // copy
  // const handleCopyLink = (url) => {
  //   navigator.clipboard.writeText(`http://127.0.0.1:8000/${url}`).then(
  //     () => {},
  //     (err) => {
  //       console.error(err);
  //     }
  //   );
  // };
  // download
  async function downloadFile(url) {
    try {
      const response = await Axios.get(
        `${baseUrl}/download-file?file_path=${url}`,
        {
          responseType: "blob",
        }
      );

      // إنشاء رابط التنزيل
      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = url.split("/").pop(); // استخراج اسم الملف من الرابط
      link.click();

      // تنظيف بعد التنزيل
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.log(err);
    }
  }

  const datas = videos.map((type, index) => (
    <div key={index} className="video-container">
      <video controls className="video-player" controlsList="nodownload">
        <source src={`${Url}/${type.url}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mt-2 d-flex justify-content-between align-items-center">
        <span className="download-text" style={{color:'#084B22'}}>{type.title}</span>
        <div>
          {/* <Link
            onClick={() => handleCopyLink(type.url)}
            className="download-link"
          >
            <i title="copy link" className="fa-solid fa-link"></i>
          </Link> */}
          <Link
            onClick={() => handleShareLink(type.url)}
            className="share-link"
          >
            <i title="Share link" className="fa-solid fa-share"></i>
          </Link>
          {type.download_able === 0 ? (
            <i
              title="Download"
              onClick={() => downloadFile(type.url)}
              style={{ cursor: "pointer" }}
              className="fa-solid fa-download"
            ></i>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <Tabe word={'Educational Videos'} />
      <div className="col-3 scm">
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
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
        {total > 6 ? (
          <PaginatedItems setPage={setPage} data={videos} total={total} />
        ) : null}
      </div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
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
                <h3>{t('Videos are not found')}</h3>
              </div>
            ) : (
              datas
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Show;
