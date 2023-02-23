import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import PageHeader from "../../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Loader from "../../../../../../../components/loader/Loader";
import Layout from "../../../../../../../layout/Layout";
import Select from "../../../../../../../components/select/Select";
import useFetch from "../../../../../../../hooks/useFetch";
import {
  SUBSIDY_COST_LIST_CREATE_API,
  SUBSIDY_COST_RETRIVE_GET_API,
  SUBSIDY_LIST_CREATE_API,
} from "../../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import { FaSave } from "react-icons/fa";
import { API } from "../../../../../../../utils/axios/axiosConfig";
import { error_alert, success_alert } from "../../../../../../../components/alert/Alert";
import { useNavigate, useParams } from "react-router-dom";

function CreateSubSidyLunchCost(props) {
  const { id } = useParams();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();
  let navigate = useNavigate();

  const { data } = useFetch(SUBSIDY_LIST_CREATE_API);
  const [retrive_data, setRetrive_Data] = useState({});
  const subSidyTypes = data?.data?.map((ss) => ({ label: ss.name, value: ss.id }));
  const [isLoading, setIsLoading] = useState(false);

  const retriveSusidyCost = async () => {
    try {
      setIsLoading(true);
      let res = await API.get(SUBSIDY_COST_RETRIVE_GET_API(id));
      setRetrive_Data(res?.data?.data);
      reset({ ...res?.data?.data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      retriveSusidyCost();
      // reset({ ...retrive_data });
    }
  }, [data]);

  const createSubSidyCost = (data, e) => {
    setIsLoading(true);
    API.post(SUBSIDY_COST_LIST_CREATE_API, data)
      .then((res) => {
        console.log(res?.data?.statuscode);
        if (res?.data?.statuscode === 200) {
          success_alert(res?.data?.message);
          navigate(-1);
        } else {
          error_alert(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data);
        error_alert(err?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateSubSidyCost = (data, e) => {
    setIsLoading(true);
    API.put(SUBSIDY_COST_RETRIVE_GET_API(id), data)
      .then((res) => {
        if (res?.data?.statuscode === 200) {
          success_alert(res?.data?.message);
          navigate(-1);
        } else {
          if (res?.data?.error) {
            error_alert(res?.data?.error);
          } else {
            error_alert(res?.data?.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <PageHeader title={`${id ? "Update" : "Add"} Subsidy Cost`} onBack />
      <Container fluid>
        <Card>
          <Card.Body>
            <Row className="justify-content-center">
              <Col sm={12} md={4} lg={4}>
                <Form onSubmit={handleSubmit(id ? updateSubSidyCost : createSubSidyCost)}>
                  <Form.Group className="mb-4">
                    <Form.Label>Subsidy Type</Form.Label>
                    <Controller
                      name="subsidy"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                        <>
                          <Select
                            placeholder="--Select a subsidy--"
                            options={subSidyTypes}
                            value={subSidyTypes?.find((v) => v.value === value)}
                            size="md"
                            className={error ? "is-invalid" : ""}
                            onChange={(v) => onChange(v.value)}
                          />

                          {error && <div className="invalid-feedback">Select a subsidy</div>}
                        </>
                      )}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Meal Price</Form.Label>
                    <Form.Control placeholder="Enter meal price" {...register("meal_price", {})} />
                    {errors?.meal_price?.pattern && <div className="invalid-feedback">Select a subsidy</div>}
                  </Form.Group>

                  <Row className="mb-4">
                    <Col sm={12} md={12} lg={12}>
                      <Form.Group>
                        <Form.Label>Employee Amount</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter subsidy amount in percent"
                          {...register("employee_amount", {
                            // required: true,
                            // pattern: /^[0-1]+$/
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={12} md={12} lg={12}>
                      <Form.Group>
                        <Form.Label>Employer Amount</Form.Label>
                        <Form.Control
                          type="text"
                          // onFocus={(e) => {
                          //   setValue(
                          //     "employer_amount",
                          //     Math.round(((getValues("meal_price") || 0) * (getValues("employer_amount") || 0)) / 100)
                          //   );
                          // }}
                          placeholder="Enter subsidy amount in percent"
                          {...register("employer_amount", {
                            // required: true,
                            // pattern: /^[0-1]+$/
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control as="textarea" row={6} placeholder="Enter remarks" {...register("remarks")} />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                      <FaSave /> Create Subsidy Lunch Cost
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      {isLoading && <Loader />}
    </Layout>
  );
}
export default CreateSubSidyLunchCost;

{
  // <Col sm={12} md={12} lg={12}>
  //                     <Form.Group>
  //                       <Form.Label>Subsidy Amount</Form.Label>
  //                       <Form.Control
  //                         type="text"
  //                         onFocus={(e) => {
  //                           setValue(
  //                             "employee_amount",
  //                             Math.round(((getValues("meal_price") || 0) * (getValues("employee_amount") || 0)) / 100)
  //                           );
  //                         }}
  //                         placeholder="Enter subsidy amount in percent"
  //                         {...register("employee_amount", {
  //                           // required: true,
  //                           // pattern: /^[0-1]+$/
  //                         })}
  //                       />
  //                     </Form.Group>
  //                   </Col>
  /* <Col sm={12} md={6} lg={6}>
                      <Form.Group>
                        <Form.Label>Subsidy Percentage</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter subsidy amount in percent"
                          {...register("employee_amount", {
                            // required: true,
                            // pattern: /^[0-1]+$/
                          })}
                        />
                      </Form.Group>
                    </Col>
                     <Col sm={12} md={6} lg={6}>
                     <Form.Group>
                       <Form.Label>Employer Percentage</Form.Label>
                       <Form.Control
                         type="text"
                         placeholder="Enter employer amount in percent"
                         {...register("employer_amount", {
                           // required: true,
                           // pattern: /^[0-1]+$/
                         })}
                       />
                     </Form.Group>
                   </Col> */
}
