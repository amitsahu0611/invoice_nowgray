/** @format */

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {Toaster} from "react-hot-toast";
import Hero from "./pages/Hero";
import Login from "./pages/Login";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position='top-right' reverseOrder={true} />
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
