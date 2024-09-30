import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { baseUrl } from "../../../Api/Api";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Services() {
  const [Services, setServices] = useState([]);
  const [loading, setLoading] = useState("");
  const [runUseEffect, setRun] = useState(0);
  const { i18n } = useTranslation();

  // Get All Services
  useEffect(() => {
    setLoading(true);
    Axios.get(`${baseUrl}/home`)
      .then((data) => {
        setServices(data.data.data.services);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [runUseEffect]);

 
   //   handleDisplayservice
   async function handleDisplayservice(type, n) {
    const form = new FormData();
    form.append("_method", 'PUT');
    form.append("service", type.service);
    form.append("show_able", n);
    try {
      await Axios.post(`${baseUrl}/update-service/${type.id}`, form);
      toast.success('done successfully');
      setRun((prev) => prev + 1);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  }

  const datas = Services.map((type, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{type.service}</td>
      <td className="aaa">
        {type.show_able === 1 ? (
          <i
            className="fa-solid fa-eye"
            title="hide"
            style={{ fontSize: "20px", cursor: "pointer", color: "#111827" }}
            onClick={() => handleDisplayservice(type,0)}
          />
        ) : (
          <i
            title="display"
            className="fa-solid fa-eye-slash"
            style={{ fontSize: "20px", cursor: "pointer", color: "#111827"}}
            onClick={() => handleDisplayservice(type,1)}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <>
       <ToastContainer />
      {/* {loading && <LoadingSubmit />} */}
      <div className="table-container">
        <h1 className="text-center tt">{i18n.t("Services")}</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{i18n.t("Service")}</th>
              <th className="text-center">{i18n.t("show able")}</th>
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
            ): datas.length === 0 ? (
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
      </div>
    </>
  );
}
