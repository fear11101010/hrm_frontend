import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Content from "../../../components/content/Content";
import CustomTable from "../../../components/custom-table/CustomTable";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Table from "../../../components/table/Table";
import useFetch from "../../../hooks/useFetch";
import useSupervisor from "../../../hooks/useSupervisor";
import Layout from "../../../layout/Layout";
import { API } from "../../../utils/axios/axiosConfig";
import { EMPLOYEE_LIST_GET } from "../../../utils/routes/api_routes/API_ROUTES";
import { EMPLOYEE_ADD_PAGE, UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";

import { USER_INFO } from "../../../utils/session/token";
import { COLUMNS } from "./COLUMNS";
import EmployeeDetails from "./EmployeeDetails";

export default function EmployeeList() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [detailsModal, setDetailsModal] = useState(false);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(0);
  const { data, isLoading } = useFetch(EMPLOYEE_LIST_GET(page, limit), refreshData);

  const onPageOrLimitChange = (limit, page) => {
    setPage(page);
    setLimit(limit);
  };

  const EXT_COLUMNS = [
    {
      name: "Details",
      cell: (row) => (
        <>
          {user.accessibility.includes("employee.GET") && (
            <Button
              size="sm"
              className="btn-rounded-circle"
              title={`Details`}
              onClick={() => {
                setDetailsModal(true);
                setSelectedId(row.id);
              }}
            >
              <i className="fe fe-file-text"></i>
            </Button>
          )}
        </>
      ),
      width: "80px",
      wrap: true,
      center: true,
    },
  ];

  return user.module.includes("Employee") ? (
    <Layout>
      {isLoading && <Loader />}
      <PageHeader title={"Employee List"} />
      <Content>
        {user.accessibility.includes("employee.POST") && (
          <div className="text-end mb-3">
            <Link to={EMPLOYEE_ADD_PAGE}>
              <Button>Add Employee</Button>
            </Link>
          </div>
        )}
        {user.accessibility.includes("employee.GET") && (
          // <Table
          //   pagination
          //   paginationServer
          //   paginationTotalRows={totalRows}
          //   onChangePage={handlePageChange}
          //   onChangeRowsPerPage={handlePerRowsChange}
          //   data={data}
          //   columns={COLUMNS.concat(EXT_COLUMNS)}
          // />
          <CustomTable
            data={data?.data}
            total={data?.count}
            pagination={{ show: true, perPageList: [15, 20, 30, 50, 100], onPageOrLimitChange }}
            columns={COLUMNS.concat(EXT_COLUMNS)}
            size={"sm"}
            responsive
          />
        )}
      </Content>

      {/* Details Modal */}
      <Modal
        show={detailsModal}
        onHide={() => {
          setDetailsModal(false);
        }}
        size="xl"
      >
        <Modal.Header className="mb-0" closeButton>
          <h3 className="mb-0">Employee Details</h3>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <EmployeeDetails rowId={selectedId} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            style={{ fontWeight: 500 }}
            onClick={() => {
              setDetailsModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}

//Fetch logics
// const [totalRows, setTotalRows] = useState(0);
// const [perPage, setPerPage] = useState(10);
// const fetchAllEmployee = async (page) => {
//   try {
//     setLoading(true);
//     // let res = await API.get(EMPLOYEE_LIST_GET(page, perPage));
//     let res = await API.get(`/employee/?offset=${page}&limit=${perPage}`);
//     if (res?.data?.statuscode === 200) {
//       setData(res?.data?.data);
//       setTotalRows(res?.data?.count);
//     }
//   } catch (err) {
//     console.log(err);
//   } finally {
//     setLoading(false);
//   }
// };
// const handlePageChange = (page) => {
//   fetchAllEmployee(page);
// };

// const handlePerRowsChange = async (newPerPage, page) => {
//   try {
//     setLoading(true);
//     const res = await API.get(`/employee/?offset=${page}&limit=${newPerPage}`);
//     if (res?.data?.statuscode === 200) {
//       setData(res?.data?.data);
//       setPerPage(newPerPage);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchAllEmployee(0);
// }, []);
