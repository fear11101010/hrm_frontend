import React from "react";
import { useNavigate } from "react-router-dom";
export default function PageHeader({ subTitle, title, onBack }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center">
            <div className="col d-flex align-items-center">
              {onBack && (
                <button className="btn btn-light me-2" title="Go Back" onClick={() => navigate(-1)}>
                  <i className="fe fe-arrow-left"></i>
                </button>
              )}
              <div>
                <h6 className="header-pretitle mb-0">{subTitle}</h6>
                <h1 className="header-title mb-0">{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
