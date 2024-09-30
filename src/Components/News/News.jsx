import { useEffect, useState } from "react";
// import axios from 'axios';
import './News.css';
import { Axios } from "../../Api/axios";
import { baseUrl } from "../../Api/Api";

export default function News({isChecked}) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        Axios.get(`/view-news`)
          .then((data) => {
            setNews(data.data.data.news);
          })
          .catch((err) => {
            console.log(err);
          })
      }, []);

    return (
        <div className={`news-container ${!isChecked? 'news-container7' :'news-container6' }`}>
            <div className="marquee">
                {news.map((item) => (
                    <span key={item.id} className="news-item">
                        {item.new}
                    </span>
                ))}
            </div>
        </div>
    );
}
