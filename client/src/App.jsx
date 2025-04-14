/** @format */

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {Toaster} from "react-hot-toast";
import Login from "./pages/Login";
import SelectCompany from "./pages/SelectCompany";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position='top-right' reverseOrder={true} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/companySelection' element={<SelectCompany />} />
          <Route path='/dashboard/*' element={<Dashboard />} />{" "}
          {/* Use "*" for nested routes */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
