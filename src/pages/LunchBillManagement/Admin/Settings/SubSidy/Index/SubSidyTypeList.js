import {useForm} from "react-hook-form";
import Layout from "../../../../../../layout/Layout";
import PageHeader from "../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";

function SubSidyTypeList(params) {
    const {register,control,formState:{errors}} = useForm();

    return (
      <Layout>
          <PageHeader title="Subsidy List"/>
          <Container fluid>
              <Card>
                  <Card.Body>

                  </Card.Body>
              </Card>
          </Container>
      </Layout>
    );
}