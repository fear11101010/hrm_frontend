import React from "react";
import Navbar from "./navbar/navbar";
import Navbar1 from "./navbar/navbar1";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Navbar1 />
      <main className="main-content">{children}</main>
    </>
  );
}
