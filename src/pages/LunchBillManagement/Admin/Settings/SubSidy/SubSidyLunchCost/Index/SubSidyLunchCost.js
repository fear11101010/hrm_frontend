import { useForm } from "react-hook-form";
import Layout from "../../../../../../../layout/Layout";
import PageHeader from "../../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import useFetch from "../../../../../../../hooks/useFetch";
import {
  SUBSIDY_LIST_API,
  SUBSIDY_LIST_CREATE_API,
  SUBSIDY_UPDATE_DELETE_API,
} from "../../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../../../components/loader/Loader";
import { API } from "../../../../../../../utils/axios/axiosConfig";
import { error_alert, success_alert } from "../../../../../../../components/alert/Alert";
import CustomTable from "../../../../../../../components/custom-table/CustomTable";
import { SUBSIDY_TABLE_COLUMNS } from "../../../../table-columns";
import { FaPlus } from "react-icons/fa";
import confirmDialog from "../../../../../../../components/confirm-dialog/ConfirmDialog";
import ConfirmDialog from "../../../../../../../components/confirm-dialog/ConfirmDialog";
import {Link} from "react-router-dom";
import {SUBSIDY_COST_CREATE_PAGE} from "../../../../../../../utils/routes/app_routes/LUNCH_ROUTES";

function SubSidyLunchCost(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const [addSubSidyModal, setAddSubSidyModal] = useState(false);
  const [updateSubSidyModal, setUpdateSubSidyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { data, isLoading } = useFetch(SUBSIDY_LIST_CREATE_API);
  const editSubSidy = (e, i) => {
    reset({ name: data?.data[i]?.name, id: data?.data[i]?.id });
    setUpdateSubSidyModal(true);
  };
  const deleteSubSidy = (e) => {
    setLoading(true);
    API.delete(SUBSIDY_UPDATE_DELETE_API(data?.data[getValues("index")]?.id))
      .then((success) => {
        success_alert(success?.data?.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        error_alert(error.data.message);
      })
      .finally(() => {
        setLoading(false);
        setShowConfirmDialog(false);
      });
  };
  const destroySubSidy = (e, i) => {
    reset({ index: i });
    setShowConfirmDialog(true);
  };
  return (
    <Layout>
      <PageHeader title="Subsidy List" />
      <Container fluid>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-end mb-3">
              <Link className="btn btn-primary btn-sm" to={SUBSIDY_COST_CREATE_PAGE}>
                <FaPlus /> Create
              </Link>
            </div>
            <CustomTable
              pagination={{ show: false }}
              data={data?.data}
              size="sm"
              columns={SUBSIDY_TABLE_COLUMNS(editSubSidy, destroySubSidy)}
            />
          </Card.Body>
        </Card>
      </Container>
      {(loading || isLoading) && <Loader />}
      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure delete subsidy?"
          onOkButtonClick={deleteSubSidy}
          onCancelButtonClick={(e) => setShowConfirmDialog(false)}
        />
      )}
    </Layout>
  );
}

export default SubSidyLunchCost;
