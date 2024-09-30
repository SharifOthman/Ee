import React from "react";
import { Route } from "react-router-dom";
import Classifications from "../Classifications/Classifications";
import AddClassification from "../Classifications/AddClassification";
import EditClassification from "../Classifications/EditClassification";
import ArticlesC from "../ArticleC/ArticlesC";
import AddArticleC from "../ArticleC/AddArticleC";
import UpdateArticleC from "../ArticleC/UpdateArticleC";
import Files from "../Files/Files";
import AddFile from "../Files/AddFile";
import UpdateFile from "../Files/UpdateFile";
import Links from "../Links/Links";
import AddLink from "../Links/AddLink";
import UpdateLink from "../Links/UpdateLink";


export const generateRoutes= (levels) => {
  const routes = [];

  for (let level = 1; level <= levels; level++) {
    const pathBase = Array(level).fill("classifications/:id").join("/");

    routes.push(
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}`}
        element={<Classifications level={level} />}
      />,
      <Route
        key={`add-classification-${level}`}
        path={`geometries/${pathBase}/add_classification`}
        element={<AddClassification level={level} />}
      />,
      <Route
        key={`edit-classification-${level}`}
        path={`geometries/${pathBase}/update_classification/:id`}
        element={<EditClassification level={level} />}
      />,
      // links D
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}/links`}
        element={<Links level={level} idf="geometry_id" />}
      />,
      <Route
        key={`add-classification-${level}`}
        path={`geometries/${pathBase}/links/add_link`}
        element={<AddLink level={level} idf="geometry_id" />}
      />,
      <Route
        key={`edit-classification-${level}`}
        path={`geometries/${pathBase}/links/update_link/:id`}
        element={<UpdateLink level={level} idf="geometry_id" />}
      />,
      // files D
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}/files`}
        element={<Files level={level} idf="geometry_id" />}
      />,
      <Route
        key={`add-classification-${level}`}
        path={`geometries/${pathBase}/files/add_file`}
        element={<AddFile level={level} idf="geometry_id" />}
      />,
      <Route
        key={`edit-classification-${level}`}
        path={`geometries/${pathBase}/files/update_file/:id`}
        element={<UpdateFile level={level} idf="geometry_id" />}
      />,
      // articles D
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}/articles`}
        element={<ArticlesC level={level} idf="geometry_id" />}
      />,
      <Route
        key={`add-classification-${level}`}
        path={`geometries/${pathBase}/articles/add_article`}
        element={<AddArticleC level={level} idf="geometry_id" />}
      />,
      <Route
        key={`edit-classification-${level}`}
        path={`geometries/${pathBase}/articles/update_article/:id`}
        element={<UpdateArticleC level={level} idf="geometry_id" />}
      />
    );
  }
  console.log(routes);
  return routes;
};
