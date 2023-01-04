import {useForm} from "react-hook-form";
import Layout from "../../../../../../layout/Layout";
import PageHeader from "../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import useFetch from "../../../../../../hooks/useFetch";
import {SUBSIDY_UPDATE_DELETE_API, SUBSIDY_LIST_API} from "../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import Loader from "../../../../../../components/loader/Loader";
import {API} from "../../../../../../utils/axios/axiosConfig";
import {error_alert, success_alert} from "../../../../../../components/alert/Alert";
import CustomTable from "../../../../../../components/custom-table/CustomTable";
import {SUBSIDY_TABLE_COLUMNS} from "../../../table-columns";

function SubSidyTypeList(props) {
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const [addSubSidyModal,setAddSubSidyModal] = useState(false);
    const [updateSubSidyModal,setUpdateSubSidyModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const {data,isLoading} = useFetch(SUBSIDY_LIST_API,refresh)
    const editSubSidy = (e,i)=>{
        reset({name:data[i]?.name})
        setUpdateSubSidyModal(true)
    }
    const updateSubSidy = (data,e)=>{
        console.log(data);
    }
    const createSubSidy = (data,e)=>{
        console.log(data);
    }
    const deleteSubSidy = (e,i)=>{
        setLoading(true)
        API.delete(SUBSIDY_UPDATE_DELETE_API(data[i]?.id)).then(success=>{
            success_alert(success?.data?.message)
        }).catch(error=>{
            error_alert(error.data.message)
        }).finally(()=>setLoading(false))
    }
    return (
      <Layout>
          <PageHeader title="Subsidy List"/>
          <Container fluid>
              <Card>
                  <Card.Body>
                        <CustomTable data={data} size="sm" columns={SUBSIDY_TABLE_COLUMNS(editSubSidy,deleteSubSidy)}/>
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
                          <Form.Control
                              placeholder="Enter SubSidy name"
                              type="text"
                              {...register('name',{required:true})}
                          />
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
                          <Form.Control
                              placeholder="Enter SubSidy name"
                              type="text"
                              {...register('name',{required:true})}
                          />
                      </Form.Group>
                      <Button type="submit" variant="primary">
                          Create Subsidy
                      </Button>
                  </Form>
              </Modal.Body>
          </Modal>
          {(loading || isLoading) && <Loader/>}
      </Layout>
    );

}

export default SubSidyTypeList;