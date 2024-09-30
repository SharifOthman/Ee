import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, Url } from "../../../Api/Api";
import "./slider.css";
import Load from "../../Loading/Load";
export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/view-slides`)
  //     .then((data) => setSlides(data.data.data.slides))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/view-slides`)
      .then((data) => setSlides(data.data.data.slides))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {!loading ? (
        <>
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`${Url}/${slide.image}`}
                  className="d-block w-100"
                  alt={slide.title}
                />
                <div className="carousel-caption d-none d-md-block">
                  {/* <h2 className="sliderHome">{slide.title}</h2>
                <h3 className="sliderHome">{slide.text}</h3> */}
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      ) : (
        <div className=" spinner-border1 dc" role="status">
          <Load />
        </div>
      )}
    </div>
  );
}
