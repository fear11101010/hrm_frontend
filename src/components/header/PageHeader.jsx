import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ subTitle, title }) {
  return (
    <div className="header">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-end">
            <div className="col">
              <h6 className="header-pretitle">{subTitle}</h6>
              <h1 className="header-title">{title}</h1>
            </div>
            <div className="col-auto">
              <Link to="/">
                <button className="btn btn-primary lift">Create Report</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
