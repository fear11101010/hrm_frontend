import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {BILL_ADD_URL, BILL_LIST_URL, CONVEYANCE_ADD_URL, CONVEYANCE_LIST_URL, LOGIN_PAGE} from "../../utils/routes/app_routes/APP_ROUTES";
import PrivateRoute from "../../utils/routes/PrivateRoute";
import {GET_TOKEN} from "../../utils/session/token";

export default function BillManagementOutlet() {
    return (
        <div>
            {!GET_TOKEN() ? (
                <Navigate to={LOGIN_PAGE}/>
            ) : (
                <>
                    <PrivateRoute to={BILL_LIST_URL}/>
                    <PrivateRoute to={BILL_ADD_URL}/>
                    <PrivateRoute to={CONVEYANCE_LIST_URL}/>
                    <PrivateRoute to={CONVEYANCE_ADD_URL}/>
                    <Outlet/>
                </>
            )}
        </div>
    );
}
