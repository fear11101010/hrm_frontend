import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../../../utils/axios/axiosConfig";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import {
  CONVEYANCE_ADD_URL,
  CONVEYANCE_EDIT_PAGE_URL,
  CONVEYANCE_LIST_URL,
} from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { FaEdit, FaFileAlt, FaPlus } from "react-icons/fa";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import { CONVEYANCE_LIST_API } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { CONVEYANCE_LIST_TABLE } from "./columns";

export default function ConveyanceApprove() {
  const [isLoading, setIsLoading] = useState(false);
  const [conveyance, setConveyance] = useState([]);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selected_id, setSelected_id] = useState("");

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

  const EXTENDED_COLUMN = [
    {
      name: `Edit`,
      width: "80px",
      cell: (row, index) => (
        <Link to={CONVEYANCE_EDIT_PAGE_URL(row.id)}>
          <Button size="sm">
            <FaEdit />
          </Button>
        </Link>
      ),
      center: true,
    },
  ];
  return (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Conveyance Bill List"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <Table dense data={conveyance} columns={CONVEYANCE_LIST_TABLE.concat(EXTENDED_COLUMN)} />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
