import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import PageHeader from "../../../components/header/PageHeader";
import Content from "../../../components/content/Content";
import { UNAUTHORIZED, USER_ROLE_LIST_PAGE, USER_ROLE_PRIVILEGE_PAGE } from "../../../utils/APP_ROUTES";
import Table from "../../../components/table/Table";
import { COLUMN } from "./COLUMNS";
import Loader from "../../../components/loader/Loader";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { API } from "../../../utils/axios/axiosConfig";
import {
  ROLE_CREATE_POST,
  ROLE_EACH_DELETE,
  ROLE_EACH_GET,
  ROLE_EACH_UPDATE,
  ROLE_LIST_GET,
} from "../../../utils/API_ROUTES";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import { USER_INFO } from "../../../utils/session/token";

export default function RoleList() {
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  //input state
  const [data, setData] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [selected_id, setSelected_id] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dltModal, setDltModal] = useState(false);

  //Fetch List
  const fetchRoleData = async () => {
    setLoading(true);
    try {
      const res = await API.get(ROLE_LIST_GET);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //Extended COLUMNS
  const EXT_COL = [
    {
      name: "Actions",
      cell: (row) => (
        <>
          {user.accessibility.includes("authuserroleEdit") && (
            <Button
              size="sm"
              variant="primary"
              className="btn-rounded-circle"
              onClick={() => {
                setSelected_id(row.id);
                setEditModal(true);
              }}
            >
              <i className="fe fe-edit"></i>
            </Button>
          )}
          {/* {user.accessibility.includes("authuserroleEdit") && (
            <Button
              size="sm"
              variant="danger"
              className="btn-rounded-circle ms-1"
              onClick={() => {
                setSelected_id(row.id);
                setDltModal(true);
              }}
            >
              <i className="fe fe-trash-2"></i>
            </Button>
          )} */}
        </>
      ),
      minWwidth: "200px",
      wrap: true,
    },
    {
      name: "Privileges",
      cell: (row) => (
        <>
          {user.accessibility.includes("authuserrole") && (
            <Link
              to={USER_ROLE_PRIVILEGE_PAGE(row.id)}
              state={{
                role_name: row?.name,
              }}
            >
              <Button size="sm" variant="info" className="btn-rounded-circle">
                <i className="fe fe-tag"></i>
              </Button>
            </Link>
          )}
        </>
      ),
      minWwidth: "200px",
      wrap: true,
    },
  ];

  // ADD FUNC
  const addRole = (e) => {
    e.preventDefault();
    const payload = {
      name: roleName,
    };

    API.post(ROLE_CREATE_POST, payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          fetchRoleData();
          setRoleName("");
          setAddModal(false);
        } else {
          error_alert(res.data.Errors.name[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // EDIT FUNC
  const EditRole = (e) => {
    e.preventDefault();
    const payload = {
      name: roleName,
    };

    API.put(ROLE_EACH_UPDATE(selected_id), payload)
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          fetchRoleData();
          setRoleName("");
          setEditModal(false);
        } else {
          error_alert(res.data.Errors.name[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // DELETE FUNC
  const dltRole = (e) => {
    e.preventDefault();
    API.delete(ROLE_EACH_DELETE(selected_id))
      .then((res) => {
        if (res.data.statuscode === 200) {
          success_alert(res.data.message);
          fetchRoleData();
          setDltModal(false);
        } else {
          error_alert(res.data.Errors.name[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // List fetch lifeCycle
  useEffect(() => {
    fetchRoleData();
  }, []);

  //Role Individual GET
  useEffect(() => {
    if (selected_id !== "") {
      setLoading(true);
      API(ROLE_EACH_GET(selected_id))
        .then((res) => {
          setRoleName(res.data.name);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [selected_id]);

  return user.module.includes("Role") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"Role "} />
      <Content>
        <div className="text-end">
          {user.accessibility.includes("authuserroleAdd") && (
            <Button varirant="primary" onClick={() => setAddModal(true)}>
              Add Role
            </Button>
          )}
        </div>
        <Table data={data} columns={COLUMN.concat(EXT_COL)} />
      </Content>

      {/* ADD MODAL */}
      <Modal show={addModal} onHide={() => setAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addRole}>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                placeholder="Enter Username"
                type="text"
                value={roleName}
                onChange={(e) => {
                  setRoleName(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Role
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit MODAL */}
      <Modal
        show={editModal}
        onHide={() => {
          setEditModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditRole}>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                placeholder="Enter Username"
                type="text"
                value={roleName}
                onChange={(e) => {
                  setRoleName(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Edit Role
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete MODAL */}
      <Modal
        show={dltModal}
        onHide={() => {
          setDltModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={dltRole}>
            <Form.Group className="mb-3">
              <Form.Label>Are you sure you want to delete this role?</Form.Label>
            </Form.Group>
            <Button type="submit" variant="danger">
              Delete Role
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
