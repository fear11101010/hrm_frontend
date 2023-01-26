import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_LIST_GET } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { BILL_ADD_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { BILL_LIST_TABLE_COLUMN } from "../table-columns";
import { columns } from "./colums";

function Bill(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    API.get(BILL_LIST_GET)
      .then((res) => {
        setBillData(res?.data?.data);
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
        <PageHeader title={"Bill List"} />
        <Container fluid>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-end align-items-end mb-3">
                <Link to={BILL_ADD_URL} className="btn btn-primary btn-sm">
                  <FaPlus /> Add New Bill
                </Link>
              </div>
              <Table dense columns={columns} data={billData} />
            </Card.Body>
          </Card>
        </Container>
      </Layout>
      {isLoading && <Loader />}
    </>
  );
}

export default Bill;

// <CustomTable
//   columns={BILL_LIST_TABLE_COLUMN}
//   data={billData}
//   size={"sm"}
//   // pagination
//   responsive
// />
