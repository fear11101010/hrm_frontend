import React from "react";

export default function Content({ children }) {
  return <div className="container-fluid mb-4">{children}</div>;
}

// OLD WAY

// <div className="container-fluid">
//   <div className="card shadow-sm">
//     <div className="card-body">{children}</div>
//   </div>
// </div>
