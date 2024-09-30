import { Link } from "react-router-dom";
import "./404.css";
export default function Err404() {
  return (
    <div className="flex-container">
  <div className="text-center">
    <h1>
      <span className="fade-in" id="digit1">4</span>
      <span className="fade-in" id="digit2">0</span>
      <span className="fade-in" id="digit3">4</span>
    </h1>
    <h3 className="fadeIn">PAGE NOT FOUND</h3>
    <Link to={'/'} className="link_404" >Go To Home</Link>
  </div>
</div>
  );
}