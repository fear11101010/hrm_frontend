import React from "react";
import Navbar from "./navbar/navbar";
import Navbar1 from "./navbar/navbar1";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Navbar1 />
      <main className="main-content">{children}</main>
      <ToastContainer />
    </>
  );
}
