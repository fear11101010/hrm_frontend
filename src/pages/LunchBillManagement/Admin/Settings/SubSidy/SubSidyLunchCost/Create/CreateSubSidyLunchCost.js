import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import PageHeader from "../../../../../../../components/header/PageHeader";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Loader from "../../../../../../../components/loader/Loader";
import Layout from "../../../../../../../layout/Layout";
import Select from "../../../../../../../components/select/Select";
import useFetch from "../../../../../../../hooks/useFetch";
import {SUBSIDY_LIST_CREATE_API} from "../../../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {FaSave} from "react-icons/fa";

function CreateSubSidyLunchCost(props) {
    const {register, control, handleSubmit, formState: {errors}, reset, getValues,setValue} = useForm();
    const {data} = useFetch(SUBSIDY_LIST_CREATE_API)
    const subSidyTypes = data?.data?.map(ss => ({label: ss.name, value: ss.id}))
    const [isLoading, setIsLoading] = useState(false);
    const createSubSidyCost = (data, e) => {
        alert(1)
        console.log(data)
    }

    return (
        <Layout>
            <PageHeader title="Add Subsidy Cost" onBack/>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Row className="justify-content-center">
                            <Col sm={12} md={7} lg={7}>
                                <Form onSubmit={handleSubmit(createSubSidyCost)}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Subsidy Type</Form.Label>
                                        <Controller
                                            name="subsidy_id"
                                            control={control}
                                            rules={{required: true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,
                                                     }) => (
                                                <>
                                                    <Select
                                                        placeholder="--Select a subsidy--"
                                                        options={subSidyTypes}
                                                        value={subSidyTypes?.find(v => v.value === value)}
                                                        size="md"
                                                        className={error ? 'is-invalid' : ''}
                                                        onChange={v => onChange(v.value)}/>

                                                    {error && (
                                                        <div className="invalid-feedback">Select a subsidy</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Meal Price</Form.Label>
                                        <Form.Control placeholder="Enter meal price" {...register('meal_price', {required: true,pattern: /^[0-1]+$/g})}/>
                                        {errors?.meal_price?.pattern && (
                                            <div className="invalid-feedback">Select a subsidy</div>)}
                                    </Form.Group>
                                    <Row className="mb-4">
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Subsidy Percentage</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Enter subsidy amount in percent" {...register('employee_pct', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Subsidy Amount</Form.Label>
                                                <Form.Control type="text" onFocus={e=>{
                                                    setValue('employee_amount',Math.round(((getValues('meal_price')||0)*(getValues('employee_pct')||0))/100))
                                                }}
                                                              placeholder="Enter subsidy amount in percent" {...register('employee_amount', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Employer Percentage</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Enter employer amount in percent" {...register('employer_pct', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Employer Amount</Form.Label>
                                                <Form.Control type="text" onFocus={e=>{
                                                    setValue('employer_amount',Math.round(((getValues('meal_price')||0)*(getValues('employer_pct')||0))/100))
                                                }}
                                                              placeholder="Enter subsidy amount in percent" {...register('employer_amount', {
                                                    // required: true,
                                                    // pattern: /^[0-1]+$/
                                                })}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control as="textarea" row={6}
                                                      placeholder="Enter remarks" {...register('remarks')}/>
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="primary" type="submit">
                                            <FaSave/> Create Subsidy Lunch Cost
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            {isLoading && <Loader/>}
        </Layout>
    )
}
export default CreateSubSidyLunchCost;