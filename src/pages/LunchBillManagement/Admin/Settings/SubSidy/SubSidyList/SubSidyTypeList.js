import { useForm } from "react-hook-form";
import Layout from "../../../../../../layout/Layout";
import PageHeader from "../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import useFetch from "../../../../../../hooks/useFetch";
import {
  SUBSIDY_LIST_API,
  SUBSIDY_LIST_CREATE_API,
  SUBSIDY_UPDATE_DELETE_API,
} from "../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../../components/loader/Loader";
import { API } from "../../../../../../utils/axios/axiosConfig";
import { error_alert, success_alert } from "../../../../../../components/alert/Alert";
import CustomTable from "../../../../../../components/custom-table/CustomTable";
import { SUBSIDY_TABLE_COLUMNS } from "../../../table-columns";
import { FaPlus } from "react-icons/fa";
import confirmDialog from "../../../../../../components/confirm-dialog/ConfirmDialog";
import ConfirmDialog from "../../../../../../components/confirm-dialog/ConfirmDialog";

function SubSidyTypeList(props) {
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
  const { data, isLoading } = useFetch(SUBSIDY_LIST_CREATE_API, refresh);
  const editSubSidy = (e, i) => {
    reset({ name: data?.data[i]?.name, id: data?.data[i]?.id });
    setUpdateSubSidyModal(true);
  };
  const updateSubSidy = (data, e) => {
    setLoading(true);
    API.put(SUBSIDY_UPDATE_DELETE_API(data.id), data)
      .then((success) => {
        success_alert(success?.data?.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        error_alert(error.data.message);
      })
      .finally(() => {
        setLoading(false);
        setUpdateSubSidyModal(false);
      });
  };
  const createSubSidy = (data, e) => {
    setLoading(true);
    API.post(SUBSIDY_LIST_CREATE_API, data)
      .then((success) => {
        success_alert(success?.data?.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        error_alert(error.data.message);
      })
      .finally(() => {
        setLoading(false);
        setAddSubSidyModal(false);
      });
  };
  const deleteSubSidy = (e) => {
    setLoading(true);
    API.delete(SUBSIDY_UPDATE_DELETE_API(data?.data[getValues("index")]?.id))
      .then((success) => {
        console.log(success?.data?.statuscode);
        if (success?.data?.statuscode === 200) {
          success_alert(success?.data?.message);
          setRefresh(!refresh);
        } else {
          error_alert(success?.data?.message);
        }
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
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  setAddSubSidyModal(true);
                  reset({ name: "" });
                }}
              >
                <FaPlus /> Create
              </Button>
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
      {/* ADD MODAL */}
      <Modal show={updateSubSidyModal} onHide={() => setUpdateSubSidyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Subsidy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(updateSubSidy)}>
            <Form.Group className="mb-3">
              <Form.Label>Subsidy Name</Form.Label>
              <Form.Control placeholder="Enter SubSidy name" type="text" {...register("name", { required: true })} />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update Subsidy
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={addSubSidyModal} onHide={() => setAddSubSidyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subsidy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createSubSidy)}>
            <Form.Group className="mb-3">
              <Form.Label>Subsidy Name</Form.Label>
              <Form.Control placeholder="Enter SubSidy name" type="text" {...register("name", { required: true })} />
            </Form.Group>
            <Button type="submit" variant="primary">
              Create Subsidy
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
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

export default SubSidyTypeList;
