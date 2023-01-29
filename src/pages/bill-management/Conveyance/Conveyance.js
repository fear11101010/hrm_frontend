import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../../../utils/axios/axiosConfig";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import { CONVEYANCE_ADD_URL, CONVEYANCE_LIST_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { FaPlus } from "react-icons/fa";

import { CONVEYANCE_LIST_TABLE } from "../table-columns";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import { CONVEYANCE_LIST_API } from "../../../utils/routes/api_routes/BILL_API_ROUTES";

function Conveyance(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [conveyance, setConveyance] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    API.get(CONVEYANCE_LIST_API)
      .then((res) => {
        setConveyance(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Layout>
        <PageHeader title={"Conveyance Bill List"} />
        <Container fluid>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-end align-items-end mb-3">
                <Link to={CONVEYANCE_ADD_URL} className="btn btn-primary btn-sm">
                  <FaPlus /> Add New Conveyance
                </Link>
              </div>
              <Table dense data={conveyance} columns={CONVEYANCE_LIST_TABLE} />
            </Card.Body>
          </Card>
        </Container>
      </Layout>
      {isLoading && <Loader />}
    </>
  );
}

export default Conveyance;
