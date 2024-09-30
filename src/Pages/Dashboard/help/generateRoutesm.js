import React from "react";
import { Route } from "react-router-dom";
import Classificationsm from "../../Website/Layout/Classifications/Classificationsm";
import Linksm from "../../Website/Layout/Links/Linksm";
import Filesm from "../../Website/Layout/Files/Filesm";
import Articlesm from "../../Website/Layout/Articles/Articlesm";

export const generateRoutesm= (levels) => {
  const routes = [];

  for (let level = 1; level <= levels; level++) {
    const pathBase = Array(level).fill("classifications/:id").join("/");

    routes.push(
      // classification M

      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}`}
        element={<Classificationsm level={level} />}
      />,

      // links M
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}/links`}
        element={<Linksm level={level} idf="geometry_id" />}
      />,
      // files M
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}/files`}
        element={<Filesm level={level} idf="geometry_id" />}
      />,
      // articles M
      <Route
        key={`classifications-${level}`}
        path={`geometries/${pathBase}/articles`}
        element={<Articlesm level={level} idf="geometry_id" />}
      />
    );
  }
  return routes;
};
