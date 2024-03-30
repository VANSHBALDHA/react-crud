import React from "react";
import { Route, Routes } from "react-router-dom";
import Demo from "./Demo";
import Add from "./Add";
import Edit from "./Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
