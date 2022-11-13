import React from "react";
import Layout from "../../../layout/Layout";
import { USER_INFO } from "../../../utils/session/token";
import { Navigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../../utils/APP_ROUTES";

export default function KpiAssestment() {
  const user = USER_INFO();
  return (
    <Layout>
      <div>kpi-assestment</div>
    </Layout>
  );
}
