import React from "react";
import Navbar from "./navbar/navbar";
import Navbar1 from "./navbar/navbar1";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Navbar1 />
      <main className="main-content">{children}</main>
      <footer className="text-center py-3" style={{ background: "#fff" }}>
        <h5 className="mb-0">Copyright {new Date().getFullYear()} Datsoft system bangladesh limited</h5>
      </footer>
    </>
  );
}
