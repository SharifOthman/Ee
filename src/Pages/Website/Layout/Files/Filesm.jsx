import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { baseUrl, Url } from "../../../../Api/Api";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import "./filesm.css"; // إضافة ملف CSS مخصص
import PaginatedItems from "../../../../Components/Pagination/Pagination";
import Load from "../../../../Components/Loading/Load";

export default function Filesm({ idf, isChecked ,level}) {
  const [Files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState("");
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState("mp4");

  let idValue = "";
  if (idf === "office_id") {
    idValue = location.state?.office?.id;
  } else if (idf === "recent_id") {
    idValue = location.state?.recent?.id;
  } else if (idf === "geometry_id") {
    idValue = location.state?.geo?.id;
  }

  // مشاركة الرابط
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

  // الحصول على الملفات حسب النوع
  useEffect(() => {
    setLoading(true);
    let typeQuery = Array.isArray(type)
      ? type.map((t) => `type[]=${t}`).join("&")
      : `type=${type}`;
    Axios.get(
      `${baseUrl}/view-files?${idf}=${idValue}&${typeQuery}&page=${page}`
    )
      .then((data) => {
        setFiles(data.data.data.files.data);
        setTotal(data.data.data.files.total);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setFiles([]);
      })
      .finally(() => setLoading(false));
  }, [type, page]);

  const datas = Files.map((file, index) => (
    <div className="col-md-6 col-lg-4 mb-4" key={index}>
      <div className="card border-bgo mtdf">
        {file.type === "png" || file.type === "jpg" ? (
          <img
            src={`${Url}/${file.url}`}
            alt="placeholder"
            className="card-img-top"
            height="250px"
            width="100px"
          />
        ) : file.type === "mp4" ? (
          <video
            controls
            controlsList="nodownload"
            className="card-img-top"
            height="250px"
            width="100px"
          >
            <source src={`${Url}/${file.url}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : file.type === "mp3" ? (
          <audio controls className="card-img-top" height="250px" width="100px">
            <source src={`${Url}/${file.url}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <img
            src={require("../../../../Assets/images/rar.png")}
            alt="placeholder"
            className="card-img-top"
            height="250px"
            width="100px"
          />
        )}
        <div className="card-body bgg">
          <h3 className="card-title">
            {file.title}
            <span>({file.type})</span>
          </h3>
        </div>
        <div className="text-center">
          <a onClick={() => handleShareLink(file.url)} className="share-link">
            <i title="Share link" className="fa-solid fa-share"></i>
          </a>
          {file.download_able === 0 ? (
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200",borderBottom:'2px solid #084B22' }}
      >
        <i
          style={{ cursor: "pointer" }}
          onClick={handleGoBack}
          className="fa-solid fa-arrow-left"
        ></i>{" "}
        {t("Files")}{level}
      </h1>
      <div style={{ display: "flex", justifyContent: "center", margin: "0" }}>
        {total > 6 ? (
          <PaginatedItems setPage={setPage} data={Files} total={total} />
        ) : null}
      </div>
      <nav className="navbar navbar-expand-lg bgnf">
        <div className="container-fluid">
          <div className="d-flex justify-content-center w-100">
            <ul className="navbar-nav navbar-navf">
              <li className="nav-item nav-itemf ">
                <button
                  className={`btn1 nav-link btn btn-link ${
                    type === "mp4" ? "active" : ""
                  } ${!isChecked ? "nav-link7" : "nav-link6"}`}
                  onClick={() => setType("mp4")}
                >
                  {t("VIDEOS")}
                </button>
              </li>
              <li className="nav-item nav-itemf">
                <button
                  className={`btn1 nav-link btn btn-link ${
                    type === "mp3" ? "active" : ""
                  } ${!isChecked ? "nav-link7" : "nav-link6"}`}
                  onClick={() => setType("mp3")}
                >
                  {t("AUDIOS")}
                </button>
              </li>
              <li className="nav-item nav-itemf">
                <button
                  className={`btn1 nav-link btn btn-link ${
                    type.includes("png") ? "active" : ""
                  } ${!isChecked ? "nav-link7" : "nav-link6"}`}
                  onClick={() => setType(["png", "jpg"])}
                >
                  {t("IMAGES")}
                </button>
              </li>
              <li className="nav-item nav-itemf">
                <button
                  className={`btn1 nav-link btn btn-link ${
                    type === "pdf" ? "active" : ""
                  } ${!isChecked ? "nav-link7" : "nav-link6"}`}
                  onClick={() => setType("pdf")}
                >
                  {t("PDF")}
                </button>
              </li>
              <li className="nav-item nav-itemf">
                <button
                  className={`btn1 nav-link btn btn-link ${
                    type === "zip" ? "active" : ""
                  } ${!isChecked ? "nav-link7" : "nav-link6"}`}
                  onClick={() => setType("zip")}
                >
                  {t("ZIP")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center">
          {loading ? (
            <div className=" spinner-border1 dc" role="status">
            <Load/>
          </div>
          ) : datas.length === 0 ? (
            <div className="text-center fmargin">
              <h3>{t("Recents are not found")}</h3>
            </div>
          ) : (
            datas
          )}
        </div>
      </div>
    </>
  );
}
