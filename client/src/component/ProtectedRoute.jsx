/** @format */

import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
