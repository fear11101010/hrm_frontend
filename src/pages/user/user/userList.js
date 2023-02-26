import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Table from "../../../components/table/Table";
import Loader from "../../../components/loader/Loader";
import useFetch from "../../../hooks/useFetch";
import Layout from "../../../layout/Layout";
import { USER_GET } from "../../../utils/routes/api_routes/API_ROUTES";
import { UNAUTHORIZED, USER_ADD_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";
import { COLUMNS } from "./COLUMNS";
import { USER_INFO } from "../../../utils/session/token";
import { API } from "../../../utils/axios/axiosConfig";
import CustomTable from "../../../components/custom-table/CustomTable";

export default function UserList() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(0);
  const { data, isLoading } = useFetch(USER_GET(page, limit), refreshData);

  const onPageOrLimitChange = (limit, page) => {
    setPage(page);
    setLimit(limit);
  };

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  return user.module.includes("User") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title="User" />
      <Content>
        <div className="mb-3 text-end">
          {user.accessibility.includes("user-register.create") && (
            <Link to={USER_ADD_PAGE}>
              <button className="btn btn-primary">Add User</button>
            </Link>
          )}
        </div>
        {user.accessibility.includes("user-list.list") && (
          // <Table
          //   paginationServer
          //   paginationTotalRows={totalRows}
          //   onChangePage={handlePageChange}
          //   onChangeRowsPerPage={handlePerRowsChange}
          //   data={data}
          //   columns={COLUMNS}
          // />
          <CustomTable
            data={data?.data}
            total={data?.count}
            pagination={{ show: true, perPageList: [15, 20, 30, 50, 100], onPageOrLimitChange }}
            columns={COLUMNS}
            size={"sm"}
            responsive
          />
        )}
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}

//Fetch logics
// const fetchAllUser = async (page) => {
//   try {
//     setLoading(true);
//     let res = await API.get(USER_GET(page, perPage));
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
//   fetchAllUser(page);
// };

// const handlePerRowsChange = async (newPerPage, page) => {
//   try {
//     setLoading(true);
//     const res = await API.get(USER_GET(page, newPerPage));
//     if (res?.data?.statuscode === 200) {
//       setData(res?.data?.data);
//       setPerPage(newPerPage);
//       setTotalRows(res?.data?.count);
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchAllUser(0);
// }, []);
