import {useForm} from "react-hook-form";
import Layout from "../../../../../../layout/Layout";
import PageHeader from "../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Form, Modal} from "react-bootstrap";
import {useState} from "react";

function SubSidyTypeList(params) {
    const {register,control,formState:{errors},reset} = useForm();
    const [addSubSidy,setAddSubSidy] = useState(false);
    const editSubSidy = (e,i)=>{
        reset({name:})
    }
    const deleteSubSidy = (e,i)=>{

    }
    return (
      <Layout>
          <PageHeader title="Subsidy List"/>
          <Container fluid>
              <Card>
                  <Card.Body>

                  </Card.Body>
              </Card>
          </Container>
          {/* ADD MODAL */}
          <Modal show={addSubSidy} onHide={() => setAddSubSidy(false)}>
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
      </Layout>
    );
}