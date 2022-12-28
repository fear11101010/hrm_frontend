import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../utils/routes/app_routes/APP_ROUTES";

export default function NotFound() {
  return (
    <div className="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style={{ height: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5 col-xl-4 my-5">
            <div className="text-center">
              <h6 className="text-uppercase text-muted mb-4">404 error</h6>

              <h1 className="display-4 mb-3">There’s no page here 😭</h1>

              <p className="text-muted mb-4">Looks like you ended up here by accident?</p>

              <Link to={LOGIN_PAGE} className="btn btn-lg btn-primary">
                Return to your dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
