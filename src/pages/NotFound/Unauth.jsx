import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_PAGE } from "../../utils/APP_ROUTES";

export default function Unauth() {
  return (
    <div className="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style={{ height: "100vh" }}>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-5 col-xl-4 my-5">
            <div class="text-center">
              <h6 class="text-uppercase text-muted mb-4">403</h6>

              <h1 class="display-4 mb-3">Unauthorized</h1>

              <p class="text-muted mb-4">Looks like you are not authorized</p>

              <Link to={LOGIN_PAGE} class="btn btn-lg btn-primary">
                Return to your dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
