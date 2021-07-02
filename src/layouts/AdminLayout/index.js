import React from "react";
import Navbar from "../../components/navbar";
import Menu from "../../components/menu";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="d-flex">
        <Menu />
        <div
          id="content-wrapper"
          className="d-flex flex-column"
          style={{
            backgroundColor: "#f8f9fc",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <div id="content">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
