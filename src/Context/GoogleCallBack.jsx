import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Cookie from "cookie-universal";
import { baseUrl, GOOGLE_CALL_BACK } from "../Api/Api";

export default function GoogleCallBack(){
    const cookie=Cookie();
    const location=useLocation();
    console.log('callback')
    useEffect(()=>{
      async function GoogleCall(){
        try{
          const res = await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`)
          // console.log(res.data.data.data)
          const { token } = res.data.data;
          const { name } = res.data.data;
          const { id } = res.data.data;
          const { image } = res.data.data;
          const { email } = res.data.data;
          const { role } = res.data.data;
          cookie.set("token", token, { path: "/" });
          cookie.set("role", role, { path: "/" });
          cookie.set("email", email, { path: "/" });
          cookie.set("name", name, { path: "/" });
          cookie.set("id", id, { path: "/" });
          cookie.set("image", image, { path: "/" });
          localStorage.setItem("login", "true");
          window.location.pathname = `/`;
        }catch(err){
       console.log(err)
        }
      }
      GoogleCall();
    },[])
    return (
      <div class="spinner-border text-warning" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    )
}
