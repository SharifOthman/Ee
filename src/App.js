// App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./all.css";
import Home from "./Pages/Website/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Capabilities from "./Pages/Website/Capabilities";
import About from "./Pages/Website/About";
import Contact from "./Pages/Website/Contact";
import Valuationm from "./Pages/Website/Valuationm";
import "./Pages/Website/Translate/i18n";
import Layout from "./Pages/Website/Layout/Layout";
import SignUp from "./Pages/Website/Auth/SignUP/SignUP";
import Login from "./Pages/Website/Auth/Login/Login";
import AddSlider from "./Pages/Dashboard/Slider/AddSlider";
import Sliders from "./Pages/Dashboard/Slider/Sliders";
import UpdateSlider from "./Pages/Dashboard/Slider/UpdateSlider";
import Geometries from "./Pages/Dashboard/Geo/Geometries";
import UpdateGeometry from "./Pages/Dashboard/Geo/UpdateGeometry";
import AddGeometry from "./Pages/Dashboard/Geo/AddGeometry";
import Terminologies from "./Pages/Dashboard/Terminologies/Terminologies";
import AddTerminology from "./Pages/Dashboard/Terminologies/AddTerminology";
import UpdateTerminology from "./Pages/Dashboard/Terminologies/UpdateTerminology";
import News from "./Pages/Dashboard/News/News";
import AddNew from "./Pages/Dashboard/News/AddNew";
import UpdateNew from "./Pages/Dashboard/News/UpdateNew";
import AddRecent from "./Pages/Dashboard/Recents/AddRecent";
import Recents from "./Pages/Dashboard/Recents/Recents";
import UpdateRecent from "./Pages/Dashboard/Recents/UpdateRecent";
import AddVideo from "./Pages/Dashboard/Video/AddVideo";
import Videos from "./Pages/Dashboard/Video/Videos";
import UpdateVideo from "./Pages/Dashboard/Video/UpdateVideo";
import Messages from "./Pages/Dashboard/Messages/Messages";
import Reservations from "./Pages/Dashboard/Reservations/Reservations";
import Valuation from "./Pages/Dashboard/Valuation/Valuation";
import Offices from "./Pages/Dashboard/Office/Offices";
import Users from "./Pages/Dashboard/Users/Users";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import OfficesU from "./Pages/Dashboard/office_of_user/OfficesU";
import ViewArticle from "./Pages/Dashboard/Article/ViewArticle";
import AddOffice from "./Pages/Dashboard/office_of_user/AddOffice";
import ChartComponent from "./Pages/Dashboard/Chart/ChartComponent";
import EditOffice from "./Pages/Dashboard/office_of_user/EditOffice";
import Links from "./Pages/Dashboard/Links/Links";
import AddLink from "./Pages/Dashboard/Links/AddLink";
import UpdateLink from "./Pages/Dashboard/Links/UpdateLink";
import Files from "./Pages/Dashboard/Files/Files";
import AddFile from "./Pages/Dashboard/Files/AddFile";
import UpdateFile from "./Pages/Dashboard/Files/UpdateFile";
import ArticlesC from "./Pages/Dashboard/ArticleC/ArticlesC";
import AddArticleC from "./Pages/Dashboard/ArticleC/AddArticleC";
import UpdateArticleC from "./Pages/Dashboard/ArticleC/UpdateArticleC";
import EngineeringArticles from "./Pages/Website/Layout/EngineeringArticles/EngineeringArticles";
import Show from "./Pages/Website/Layout/show/Show";
import Terminologiesm from "./Pages/Website/Layout/Terminologiesm/Terminologiesm";
import PolicyComponent from "./Pages/Website/Layout/Policy/PolicyComponent";
import TerminologiesC from "./Pages/Dashboard/TerminologiesC/TerminologiesC";
import AddCategory from "./Pages/Dashboard/TerminologiesC/AddCategory";
import UpdateCategory from "./Pages/Dashboard/TerminologiesC/UpdateCategory";
import TerminologiesmC from "./Pages/Website/Layout/TerminologiesmC/TerminologiesmC";
import Services from "./Pages/Dashboard/services/Services";
import Recentsm from "./Pages/Website/Layout/Recent/Recentsm";
import Officesm from "./Pages/Website/Layout/office/Officesm";
import Geometriesm from "./Pages/Website/Layout/Geometries/Geometriesm";
import Linksm from "./Pages/Website/Layout/Links/Linksm";
import Articlesm from "./Pages/Website/Layout/Articles/Articlesm";
import Filesm from "./Pages/Website/Layout/Files/Filesm";
import VerifyCode from "./Pages/Website/Layout/VerifyCode/VerifyCode";
import Profile from "./Pages/Website/Layout/profile/Profile";
import RequireAuth from "./Auth/RequireAuth";
import ForgetPassword from "./Pages/Website/Layout/ForgetPassword/ForgetPassword";
import Reset from "./Pages/Website/Layout/ForgetPassword/Reset";
import UpdateProfile from "./Pages/Website/Layout/profile/UpdateProfile";
import DashboardU from "./Pages/Dashboard/DashboardU";
import OfficesUser from "./Pages/DashboardU/office_of_user/OfficesUser";
import LinksUser from "./Pages/DashboardU/Links/LinksUser";
import FilesUser from "./Pages/DashboardU/Files/FilesUser";
import AddFileUser from "./Pages/DashboardU/Files/AddFileUser";
import UpdateFileUser from "./Pages/DashboardU/Files/UpdateFileUser";
import ArticlesUserC from "./Pages/DashboardU/ArticleC/ArticlesUserC";
import RequireUser from "./Auth/RequireUser";
import GoogleCallBack from "./Context/GoogleCallBack";
import Err404 from "./Pages/Website/Error/404";
import ViewContent from "./Pages/Dashboard/ViewContent";
import ArticlesCom from "./Pages/Website/Layout/ArticlesPolicy/ArticlesCom";
import QuestionsCom from "./Pages/Website/Layout/Questions Policy/QuestionsCom";
import ChangeEmail from "./Pages/Dashboard/Change_Email/ChangeEmail";
import { generateRoutes } from "./Pages/Dashboard/help/generateRoutes";
import { generateRoutesm } from "./Pages/Dashboard/help/generateRoutesm";
import ScrollToTop from "./Pages/Dashboard/help/ScrollToTop";


export default function App() {
  const [isChecked, setIsChecked] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode === "true";
  });

  useEffect(() => {
    if (isChecked) {
      document.body.style.backgroundColor = "#1D2A35";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#084B22";
    }
  }, [isChecked]);

  const handleToggle = () => {
    const newMode = !isChecked;
    setIsChecked(newMode);
    localStorage.setItem("mode", newMode);
  };
  return (
    <>
      <ScrollToTop/>
      <Routes>
       
        <Route
          path="/"
          element={<Home isChecked={isChecked} handleToggle={handleToggle} />}
        />
        <Route
          element={<Layout isChecked={isChecked} handleToggle={handleToggle} />}
        >
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/auth/google/callback" element={<GoogleCallBack />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update_profile" element={<UpdateProfile />} />
          <Route path="/verify_code" element={<VerifyCode />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/about_us" element={<About isChecked={isChecked} />} />
          <Route path="/contact_us" element={<Contact isChecked={isChecked} />} />
          <Route path="/valuation" element={<Valuationm isChecked={isChecked}/>} />
          <Route path="/engineering_articles" element={<EngineeringArticles />} />
          <Route path="/shows" element={<Show />} />
          <Route path="/terminologies" element={<Terminologiesm />} />
          <Route path="/recents" element={<Recentsm />} />
          <Route path="/offices" element={<Officesm />} />
          <Route path="/geometries" element={<Geometriesm />} />
          {/* classification */}
          {generateRoutesm(15)}
          {/* links */}
          <Route path="recents/links" element={<Linksm idf="recent_id" />} />
          <Route path="offices/links" element={<Linksm idf="office_id" />} />{" "}
          {/* articles */}
          <Route
            path="recents/articles"
            element={<Articlesm idf="recent_id" />}
          />
          <Route
            path="offices/articles"
            element={<Articlesm idf="office_id" />}
          />{" "}
          {/* files */}
          <Route
            path="recents/files"
            element={<Filesm idf="recent_id" isChecked={isChecked} />}
          />
          <Route
            path="offices/files"
            element={<Filesm idf="office_id" isChecked={isChecked} />}
          />{" "}
          {/* end */}
          <Route
            path="/terminologies/view_Categories"
            element={<TerminologiesmC />}
          />
          <Route path="/privacy-policy" element={<PolicyComponent />} />
          <Route path="/articles-policy" element={<ArticlesCom />} />
          <Route path="/questions-policy" element={<QuestionsCom />} />
        </Route>
        {/* protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* info */}
            <Route path="info" element={<ChartComponent />} />
            {/* slides */}
            <Route path="slides/add_slider" element={<AddSlider />} />
            <Route path="slides" element={<Sliders />} />
            <Route path="slides/update_slide/:id" element={<UpdateSlider />} />
            {/* geometries */}
            <Route path="geometries/show_description" element={<ViewArticle />} />
            <Route path="geometries/add_geometry" element={<AddGeometry />} />
            <Route path="geometries" element={<Geometries />} />
            <Route
              path="geometries/update_geometry/:id"
              element={<UpdateGeometry />}
            />
            {/* classification  */}
            {generateRoutes(15)}
      
            {/* Terminologies */}
            <Route
              path="terminologies/add_terminology"
              element={<AddTerminology />}
            />
            <Route path="terminologies" element={<Terminologies />} />
            <Route
              path="terminologies/update_terminology/:id"
              element={<UpdateTerminology />}
            />
            {/*  Terminologies C*/}
            <Route
              path="terminologies/view_Categories"
              element={<TerminologiesC />}
            />
            <Route
              path="terminologies/view_Categories/add_Category"
              element={<AddCategory />}
            />
            <Route
              path="terminologies/view_Categories/update_Category/:id"
              element={<UpdateCategory />}
            />
            {/* News */}
            <Route path="news/add_new" element={<AddNew />} />
            <Route path="news" element={<News />} />
            <Route path="news/update_new/:id" element={<UpdateNew />} />
            {/* Recents */}
            <Route path="recents/add_recent" element={<AddRecent />} />
            <Route path="recents" element={<Recents />} />
            <Route path="recents/update_recent/:id" element={<UpdateRecent />} />
            <Route path="recents/show_description" element={<ViewArticle />} />
            {/* links of recent */}
            <Route path="recents/links" element={<Links idf="recent_id" />} />
            <Route
              path="recents/links/add_link"
              element={<AddLink idf="recent_id" />}
            />
            <Route
              path="recents/links/update_link/:id"
              element={<UpdateLink idf="recent_id" />}
            />
            {/* files of recent */}
            <Route path="recents/files" element={<Files idf="recent_id" />} />
            <Route
              path="recents/files/add_file"
              element={<AddFile idf="recent_id" />}
            />
            <Route
              path="recents/files/update_file/:id"
              element={<UpdateFile idf="recent_id" />}
            />
            {/* articles of recent */}
            <Route
              path="recents/articles"
              element={<ArticlesC idf="recent_id" />}
            />
            <Route
              path="recents/articles/add_article"
              element={<AddArticleC idf="recent_id" />}
            />
            <Route
              path="recents/articles/update_article/:id"
              element={<UpdateArticleC idf="recent_id" />}
            />
            <Route
              path="recents/articles/show_article"
              element={<ViewArticle />}
            />
            {/* Educational Videos */}
            <Route
              path="educational_videos/add_educational_video"
              element={<AddVideo />}
            />
            <Route path="educational_videos" element={<Videos />} />
            <Route
              path="educational_videos/update_educational_video/:id"
              element={<UpdateVideo />}
            />
            {/* services */}
            <Route path="services" element={<Services />} />
            {/* Messages */}
            <Route path="messages/show_content" element={<ViewContent />} />
            <Route path="messages" element={<Messages />} />
            {/* Reservations */}
            <Route
              path="reservations/show_description"
              element={<ViewContent />}
            />
            <Route path="reservations" element={<Reservations />} />
            {/* Valuation */}
            <Route path="Valuation" element={<Valuation />} />
            {/* offices */}
            <Route path="offices" element={<Offices />} />
            <Route path="offices/show_description" element={<ViewArticle />} />
            {/* users */}
            <Route path="users/add_user" element={<AddUser />} />
            <Route path="users" element={<Users />} />
            <Route path="users/update_user/:id" element={<UpdateUser />} />
            {/* offices of user */}
            <Route path="users/offices" element={<OfficesU />} />
            <Route path="users/offices/add_office" element={<AddOffice />} />
            <Route
              path="users/offices/update_office/:id"
              element={<EditOffice />}
            />
            {/* links of office */}
            <Route
              path="users/offices/links"
              element={<Links idf="office_id" />}
            />
            <Route
              path="users/offices/links/add_link"
              element={<AddLink idf="office_id" />}
            />
            <Route
              path="users/offices/links/update_link/:id"
              element={<UpdateLink idf="office_id" />}
            />
            {/* files of office */}
            <Route
              path="users/offices/files"
              element={<Files idf="office_id" />}
            />
            <Route
              path="users/offices/files/add_file"
              element={<AddFile idf="office_id" />}
            />
            <Route
              path="users/offices/files/update_file/:id"
              element={<UpdateFile idf="office_id" />}
            />
            {/* articles of office */}
            <Route
              path="users/offices/articles"
              element={<ArticlesC idf="office_id" />}
            />
            <Route
              path="users/offices/articles/add_article"
              element={<AddArticleC idf="office_id" />}
            />
            <Route
              path="users/offices/articles/update_article/:id"
              element={<UpdateArticleC idf="office_id" />}
            />
            <Route
              path="users/offices/articles/show_article"
              element={<ViewArticle />}
            />
            {/* change email */}
            <Route path="change_email" element={<ChangeEmail />} />
          </Route>
        </Route>
        {/* protected Routes */}
        <Route element={<RequireUser />}>
          <Route path="/dashboard-user" element={<DashboardU />}>
            <Route path="my-offices" element={<OfficesUser />} />
            {/*  */}
            {/* links of office */}
            <Route
              path="my-offices/links"
              element={<LinksUser idf="office_id" />}
            />
            {/* files of office */}
            <Route
              path="my-offices/files"
              element={<FilesUser idf="office_id" />}
            />
            <Route
              path="my-offices/files/add_file"
              element={<AddFileUser idf="office_id" />}
            />
            <Route
              path="my-offices/files/update_file/:id"
              element={<UpdateFileUser idf="office_id" />}
            />
            <Route
              path="my-offices/articles"
              element={<ArticlesUserC idf="office_id" />}
            />
          </Route>
        </Route>

         {/* 404  */}
         <Route path="/*"  element={<Err404 />} />
      </Routes>
    </>
  );
}

