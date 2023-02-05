import React, { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { FaFile, FaFileAlt, FaPlus, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { BILL_LIST_GET } from "../../../utils/routes/api_routes/BILL_API_ROUTES";
import { BILL_ADD_URL, BILL_EDIT_PAGE_URL } from "../../../utils/routes/app_routes/BILL_APP_ROUTE";
import { columns } from "./columns";
export default function BillApprove() {
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const [selected_id, setSelected_id] = useState("");
  const [seleced_file, setSelectedFile] = useState([]);

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

  const EXTENDED_COLUMN = [
    {
      name: "Edit",
      cell: (row) => (
        <Link to={BILL_EDIT_PAGE_URL(row?.id)}>
          <Button size="sm" variant="primary" className="btn-circle ">
            <i className="fe fe-edit" />
          </Button>
        </Link>
      ),
      width: "70px",
      wrap: true,
      center: true,
    },
  ];
  return (
    <Layout>
      <PageHeader title={"Bill Approve List"} />
      <Container fluid>
        <Card>
          <Card.Body>
            <Table dense columns={columns.concat(EXTENDED_COLUMN)} data={billData} />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
  {
    isLoading && <Loader />;
  }
}
