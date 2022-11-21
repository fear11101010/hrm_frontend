import React, { useEffect, useState } from "react";
import { Button, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Layout from "../../../layout/Layout";
import { PRIVILEGES_GET, PRIVILEGES_POST } from "../../../utils/API_ROUTES";
import { LOGIN_PAGE, UNAUTHORIZED } from "../../../utils/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { REMOVE_TOKEN, USER_INFO } from "../../../utils/session/token";
import { useFunction, useModuleName, useModuleUrl } from "./hooks";

export default function Privileges() {
  const { id } = useParams();
  const user = USER_INFO();
  const [loading, setLoading] = useState(false);
  const [hasPrivileges, setHasPrivileges] = useState([]);
  const navigate = useNavigate();

  //Input state
  const [privilege, setPrivilege] = useState([]);

  // Custom HOOKS call
  const funcList = useFunction();
  const moduleNameList = useModuleName();
  const moduleUrlList = useModuleUrl();

  const [confirmModal, setConfirmModal] = useState(false);

  // Fetch roles privileges (if any)
  const fetchIndividualPrivileges = () => {
    setLoading(true);
    API.get(PRIVILEGES_GET(id))
      .then((res) => {
        // Turning the already privileged data exactly like payload
        let data = res.data.map((d) => ({
          group_id: id,
          module_id: d.module,
          sub_module_id: d.module_type,
          module_url_id: d.moduleurl,
        }));
        setPrivilege(data);

        //Storing the existing privileges module_url id (if group already has privileges)
        let privilegedUrlId = res.data.map((d) => d.moduleurl);
        setHasPrivileges(privilegedUrlId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Adding into array
  const addPrivileges = (e, data, idx) => {
    const load = {
      group_id: id,
      module_id: data.module_type,
      sub_module_id: data.module,
      module_url_id: data.id,
    };
    setPrivilege((prev) => [...prev, load]);
  };

  // Removing form array when switch is unchecked
  const removePrivileges = (e, moduleUrl, idx) => {
    const rmvData = privilege.filter((rmv) => rmv.module_url_id !== moduleUrl.id);
    setPrivilege(rmvData);
  };

  // SUBMIT FUNCTION
  const handleSubmit = (e) => {
    if (privilege.length === 0) {
      error_alert("Please give atleast one privilege");
    } else {
      setLoading(true);
      e.preventDefault();
      const payload = {
        group_id: id,
        data: privilege,
      };

      API.post(PRIVILEGES_POST, payload)
        .then((res) => {
          if (res.data.statuscode === 201) {
            success_alert(res.data.message);
            REMOVE_TOKEN();
            navigate(LOGIN_PAGE);
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
    }
  };

  useEffect(() => {
    fetchIndividualPrivileges();
  }, []);

  return user.accessibility.includes("authuserrole") ? (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={"Privileges"} onBack />
      <Content>
        <Tabs id="controlled-tab-example" className="mb-3">
          {funcList.map((d, i) => (
            <Tab eventKey={d.id} title={d.module_type}>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Module Name</th>
                    <th>List</th>
                    <th>Add</th>
                    <th>Edit</th>
                    <th>Delelte</th>
                  </tr>
                </thead>
                <tbody>
                  {moduleNameList.map((subModule, id) =>
                    subModule.module_type === d.id ? (
                      <tr key={subModule.id}>
                        <td key={subModule.id}>{subModule.module_name}</td>
                        {moduleUrlList.map((moduleUrl, idx) =>
                          moduleUrl.module === subModule.id ? (
                            <td key={moduleUrl.id}>
                              <div class="form-check form-switch">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                  defaultChecked={hasPrivileges.includes(moduleUrl.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      addPrivileges(e, moduleUrl, idx);
                                    } else {
                                      removePrivileges(e, moduleUrl, idx);
                                    }
                                  }}
                                />
                              </div>
                            </td>
                          ) : null
                        )}
                      </tr>
                    ) : null
                  )}
                </tbody>
              </Table>
            </Tab>
          ))}
        </Tabs>
        <Button onClick={() => setConfirmModal(true)}>Submit</Button>
      </Content>

      {/* Confirm Modal */}
      <Modal show={confirmModal} onHide={() => setConfirmModal(false)}>
        <Modal.Body>
          <h2 className="mb-3 text-center text-danger">
            <span className="fe fe-alert-triangle"></span>&nbsp;Warning
          </h2>
          <div className="d-flex justify-content-center text-center">Are you sure you want submit?</div>
          <div className={"d-flex justify-content-center align-items-center mt-4"}>
            <button className="btn btn-primary" onClick={(e) => handleSubmit(e)} style={{ marginRight: "15px" }}>
              <span className="fe fe-check"></span>&nbsp;Confirm
            </button>
            <button className="btn btn-danger" onClick={() => setConfirmModal(false)}>
              <span className="fe fe-x-circle"></span>&nbsp;Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  ) : (
    <Navigate to={UNAUTHORIZED} />
  );
}
