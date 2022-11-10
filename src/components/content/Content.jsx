import React from "react";

export default function Content({ children }) {
  return (
    <div className="container-fluid">
      <div className="card shadow-sm">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
