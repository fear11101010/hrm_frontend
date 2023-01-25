import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Table, Tabs } from "react-bootstrap";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { error_alert, success_alert } from "../../../components/alert/Alert";
import Content from "../../../components/content/Content";
import PageHeader from "../../../components/header/PageHeader";
import Loader from "../../../components/loader/Loader";
import Layout from "../../../layout/Layout";
import { PRIVILEGES_GET, PRIVILEGES_POST } from "../../../utils/routes/api_routes/API_ROUTES";
import { LOGIN_PAGE, UNAUTHORIZED } from "../../../utils/routes/app_routes/APP_ROUTES";
import { API } from "../../../utils/axios/axiosConfig";
import { REMOVE_TOKEN, USER_INFO } from "../../../utils/session/token";
import { useFunction, useModuleName, useModuleUrl } from "./hooks";
import ReactSelect from "react-select";

export default function Privileges() {
  const { id } = useParams();
  const location = useLocation();

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

  // moduleNameList?.map((subModule, idx) =>
  // moduleUrlList?.filter((moduleUrl, ix) => moduleUrl.module === subModule.id && moduleUrl)

  let x = funcList?.map((d, i) =>
    moduleNameList?.map((subModule, idx) =>
      moduleUrlList?.map((moduleUrl, ix) => moduleUrl.module === subModule.id && moduleUrl)
    )
  );

  const [confirmModal, setConfirmModal] = useState(false);

  // Fetch roles privileges (if any)
  const fetchIndividualPrivileges = () => {
    setLoading(true);
    API.get(PRIVILEGES_GET(id))
      .then((res) => {
        // Turning the already privileged data exactly like payload
        let data = res.data.map((d) => ({
          group_id: id,
          module_id: d.module_type,
          sub_module_id: d.module,
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

  return (
    <Layout>
      {loading && <Loader />}
      <PageHeader title={`Privileges - ${location?.state?.role_name}`} onBack />

      <Content>
        <Tabs id="controlled-tab-example" className="mb-3">
          {funcList.map((d, i) => (
            <Tab eventKey={d.id} title={d.module_type}>
              <Table responsive bordered className="mt-3">
                <tbody>
                  {moduleNameList.map((subModule, indx) =>
                    subModule.module_type === d.id ? (
                      <tr key={subModule.id}>
                        <td key={subModule.id}>
                          <h4 className="mb-0 text-secondary">{subModule.module_name}</h4>
                        </td>
                        {moduleUrlList.map((moduleUrl, idx) =>
                          moduleUrl.module === subModule.id ? (
                            <td key={moduleUrl.id} style={{ minWidth: "200px" }}>
                              <Form>
                                <Form.Check
                                  type="switch"
                                  id={`custom-switch-${idx + 1}`}
                                  label={moduleUrl?.name}
                                  defaultChecked={hasPrivileges.includes(moduleUrl.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      addPrivileges(e, moduleUrl, idx);
                                    } else {
                                      removePrivileges(e, moduleUrl, idx);
                                    }
                                  }}
                                />
                              </Form>
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
  );
  // user.accessibility.includes("authuserrole") ?
  // : (
  //   <Navigate to={UNAUTHORIZED} />
  // );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
  /* <thead>
                  <tr>
                    <th>Module Name</th>
                    {d?.id === 4 ? (
                      <>
                        <th>List</th>
                        <th>Create</th>
                        <th>Retrive/Update</th>
                        <th>Retrive/Update</th>
                      </>
                    ) : (
                      <>
                        <th>List</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Delelte</th>
                      </>
                    )}
                    {d?.id === 2 && <th> List Privileges </th>}
                    {d?.id === 2 && <th> Add Privileges </th>}
                  </tr>
                </thead> */
}

{
  /* <div class="form-check form-switch">
                                <label>asdkaskdk</label>
                                <input
                                  className="form-check-input"
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
                              </div> */
}
