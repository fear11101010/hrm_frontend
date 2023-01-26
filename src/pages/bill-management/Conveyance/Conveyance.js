import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import CustomTable from "../../../components/custom-table/CustomTable";
import { BILL_LIST_TABLE_COLUMN, CONVEYANCE_LIST_TABLE } from "../table-columns";
import Loader from "../../../components/loader/Loader";
import { API } from "../../../utils/axios/axiosConfig";
import { CONVEYANCE_LIST_API } from "../../../utils/API_ROUTES";
import { Link } from "react-router-dom";
import { BILL_LIST_URL, CONVEYANCE_LIST_URL } from "../../../utils/APP_ROUTES";
import { FaPlus } from "react-icons/fa";

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
                <Link to={CONVEYANCE_LIST_URL} className="btn btn-primary btn-sm">
                  <FaPlus /> Add New Conveyance
                </Link>
              </div>
              <CustomTable
                columns={CONVEYANCE_LIST_TABLE}
                data={conveyance}
                size={"sm"}
                // pagination
                responsive
              />
            </Card.Body>
          </Card>
        </Container>
      </Layout>
      {isLoading && <Loader />}
    </>
  );
}

export default Conveyance;
