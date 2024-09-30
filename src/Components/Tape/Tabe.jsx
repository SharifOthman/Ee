import { useTranslation } from "react-i18next";
import './Tabe.css'

export default function Tabe({word}){
  const { t } = useTranslation();

    return(
        <h1
        className="text-center border_tape"
        style={{ color: "white", padding: "30px", backgroundColor: "#ED7200" }}
      >
        {" "}
        {t(`${word}`)}
      </h1>
    )
}