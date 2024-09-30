import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (window.scrollY > lastScrollY) {
      window.scrollTo(0, 0); 
    }
    setLastScrollY(window.scrollY);
  }, [pathname, lastScrollY]);

  return null;
};

export default ScrollToTop;
