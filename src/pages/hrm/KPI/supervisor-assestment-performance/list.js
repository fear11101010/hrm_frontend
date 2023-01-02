import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { error_alert, success_alert } from "../../../../components/alert/Alert";
import ConfirmDialog from "../../../../components/confirm-dialog/ConfirmDialog";
import Content from "../../../../components/content/Content";
import PageHeader from "../../../../components/header/PageHeader";
import Loader from "../../../../components/loader/Loader";
import Table from "../../../../components/table/Table";
import Layout from "../../../../layout/Layout";
import { SUPERVISOR_ASSESTMENT_BULK_POST, SUPERVISOR_ASSESTMENT_GET } from "../../../../utils/routes/api_routes/API_ROUTES";
import { API } from "../../../../utils/axios/axiosConfig";
import { USER_INFO } from "../../../../utils/session/token";
import { columns } from "./Columns";
import { UNAUTHORIZED } from "../../../../utils/routes/app_routes/APP_ROUTES";
import { Navigate } from "react-router-dom";

export default function SupervisorAssestmentPerformance() {
  const user = USER_INFO();
  // const { data, isLoading, err } = useFetch(SUPERVISOR_ASSESTMENT_GET);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  //fetch data
  const fetchData = () => {
    setLoading(true);
    API.get(SUPERVISOR_ASSESTMENT_GET)
      .then((res) => {
        if (res.data.statuscode === 200) {
          setData(res.data.data);
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRowSelected = useCallback((data) => {
    let getSelectedId = data?.selectedRows?.map((d) => d.id);
    setSelectedRows(getSelectedId);
  }, []);

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post(SUPERVISOR_ASSESTMENT_BULK_POST, { approve_id: selectedRows })
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          setSelectedRows([]);
          setToggleCleared(!toggleCleared);
          fetchData();
        } else {
          error_alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setIsConfirm(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Disabled row when status is approved by head
  const rowDisabledCriteria = (row) => row.approve_by_sbu === 1;
  return user.accessibility.includes("assessment.supervisor_head") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"Team Assestment Performance"} />
      <Content>
        <Table
          data={data}
          columns={columns}
          selectableRows={user?.group_id.split(",").includes("2")}
          onSelectedRowsChange={handleRowSelected}
          selectableRowDisabled={rowDisabledCriteria}
          clearSelectedRows={toggleCleared}
        />

        {user?.group_id.split(",").includes("2") && (
          <div className="text-end">
            <Button
              disabled={selectedRows.length < 1}
              onClick={() => {
                if (selectedRows.length > 0) {
                  setIsConfirm(true);
                }
              }}
            >
              Approve
            </Button>
          </div>
        )}

        {isConfirm && (
          <ConfirmDialog
            message={"Are you sure you want bulk review the selected employees?"}
            onOkButtonClick={handleBulkSubmit}
            onCancelButtonClick={() => {
              setIsConfirm(false);
            }}
          />
        )}
      </Content>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
