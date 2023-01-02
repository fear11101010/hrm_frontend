
import React, { useState, useEffect, useRef } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Loader from '../../../components/loader/Loader';
import Layout from '../../../layout/Layout'
import { GET_SBU_API, RESOURCE_REQUISITION_DETAILS, RESOURCE_REQUISITION_EDIT } from "../../../utils/routes/api_routes/API_ROUTES";
import { API } from '../../../utils/axios/axiosConfig';
import Select from "react-select";
import useEmployee from '../../../hooks/useEmployee';
import useProject from '../../../hooks/useProject';
import useSbuDirName from '../../../hooks/useSbuDirName';
import { error_alert, success_alert } from '../../../components/alert/Alert';
import { DASHBOARD_PAGE } from "../../../utils/routes/app_routes/APP_ROUTES";
import { useNavigate } from 'react-router-dom';


export default function RequisitionEdit() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [data_reason_recruitment, setdata_reason_recruitment] = useState([]);
    const [data_current_skill_matrix, setdata_current_skill_matrix] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const employeelist = useEmployee();
    const project = useProject();
    const [sbu_data,setsbu_data] = useState([]);
    const [req_byId, setreq_byId] = useState("");
    const [req_byId_p, setreq_byId_p] = useState("");
    const [projectId, setprojectId] = useState("");
    const [projectId_p, setprojectId_p] = useState("");
    const [project_headId, setproject_headId] = useState("");
    const [project_headId_p, setproject_headId_p] = useState("");
    const [sbuId, setSbuId] = useState("");
    const [sbuId_p, setSbuId_p] = useState("");
    const [sbu_dirId, setsbu_dirId] = useState("");
    const [sbu_dirId_p, setsbu_dirId_p] = useState("");
    const sbu_dir_name = useSbuDirName();
    const [quantity_recruitment, setquantity_recruitment] = useState("");
    const [reason_recruitment,setreason_recruitment] = useState("");
    const [type_of_recruitId_p, settype_of_recruitId_p] = useState("");
    const [number_of_resource, setnumber_of_resource] = useState("");
    const [salary_range, setsalary_range] = useState("");
    const [source_of_fund, setsource_of_fund] = useState("");
    const [required_skills, setrequired_skills] = useState("");
    const [min_skill, setmin_skill] = useState("");
    const [rowsData, setRowsData] = useState([]);
    const [rowsData1, setRowsData1] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowLoading(true);
                const response = await API.get(RESOURCE_REQUISITION_DETAILS + id + '/');
                setData(response.data.data);
                setdata_reason_recruitment(response.data.data_reason_recruitment);
                setdata_current_skill_matrix(response.data.data_current_skill_matrix);
                setRowsData1(response.data.data_current_skill_matrix);
            } catch (err) {
            } finally {
                // setShowLoading(false);
            }
        };
        API.get(GET_SBU_API)
        .then((res) => {
            if (res.data.statuscode === 200) {
                setsbu_data(res.data.data);
            } else {
                setsbu_data([]);
            }
        })
        .catch((err) => console.log(err))
        .finally(() => {
            setShowLoading(false);
        });

        fetchData();
    }, []);
    const type_of_reason = [
        { label: 'Fresh Graduate' },
        { label: 'Experienced (If yes mention number of years)' },
        { label: 'Resignation' },
        { label: 'Transfer' },
        { label: 'Internal Fund' },
        { label: 'External Fund (If external then mention fund source)' },
    ]
    
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...data_reason_recruitment];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    // const handleChange2 = (index, evnt) => {
    //     const { name, value } = evnt.target;
    //     const rowsInput = [...data_current_skill_matrix];
    //     rowsInput[index][name] = value;
    //     setRowsData1(rowsInput);
    // }
    const handleChange2 = (index,name, value) => {
        const rowsInput = [...data_current_skill_matrix];
        rowsInput[index][name] = value;
        setRowsData1(rowsInput);
    }
    const finalsubmit = (e) => {
        // e.preventDefault();
        setShowLoading(true);
        const submit_data = {
            comment_unit_head:"good",
            comment_sub_director:"best",
            comment_director_finance:"avg",
            comment_chief_executive:"well",
            comment_hr:"not bad",
            requisition_raised_by: req_byId === '' ? data.requisition_raised_by : req_byId,
            quantity_requisition: quantity_recruitment === '' ? data.quantity_requisition : quantity_recruitment,
            new_recruit:"1",
            replacement:"0",
            internal_fund:"1",
            project_invoice:"done",
            refno:"102030405060",
            date:"2022-06-12",
            approved_by:"",
            status:"1",
            employee:"5",
            project: projectId === '' ? data.project.id : projectId,
            project_head: project_headId === '' ? data.project_head.id : project_headId,
            approved_at:"2022-10-26 10:30:18.950196",
            R_and_D:"0",
            allocated_hour:"9",
            brief_work_details:"excellent",
            common:"good",
            cost_benefit_analysis:"20",
            experienced:"1",
            external_fund:"0",
            fresh_graduate:"1",
            maximum_skills:"Python",
            number_of_resource:number_of_resource === '' ? data.number_of_resource : number_of_resource,
            number_of_resources_involved:"10",
            plan_after_completion:"no plan",
            positive_years_of_experience:"2",
            project_cost:"30000",
            project_duration:"6",
            project_invoice_amount:"100",
            project_revenue:"top",
            required_skills: required_skills === '' ? data.required_skills : required_skills,
            resignation:"0",
            salary_range:salary_range === '' ? data.salary_range : salary_range,
            sbu: sbuId === '' ? data.sbu.id : sbuId,
            sbu_director_name: sbu_dirId === '' ? data.sbu_director_name.id : sbu_dirId,
            skill: min_skill === '' ? data.skill : min_skill,
            source_of_fund: source_of_fund === '' ? data.source_of_fund : source_of_fund,
            supervisor:"2",
            total_resource_costing:"2000",
            transfer:"0",
            years_of_experience:"1",
            updated_by:"1",
            reason_for_recruitment:reason_recruitment === '' ? data.reason_for_recruitment : reason_recruitment,
            reason_for_recruitment_array:rowsData,
            current_skill_matrix_array:rowsData1,
            type_of_recruitment:type_of_recruitId_p === '' ? data.type_of_recruitment : type_of_recruitId_p
        }
        API.post(RESOURCE_REQUISITION_EDIT+`${id}`, submit_data).then(res => {
            success_alert("Message send successfully");
            navigate(DASHBOARD_PAGE)
            // handleClose('')
        }).catch(err => {
            error_alert(err?.data?.msg ?? 'An error occur while updating status. Please try again later')
        }).finally(() => {
            // setIsSubmitting(false)
            setShowLoading(false);
        })
        
    }
    return (
        <Layout>
            {/* <PageHeader subTitle={""} title={"Requisition Details"} /> */}
            {showLoading && <Loader />}
            <div className="container-fluid" id="report">
                <div className="card">
                    <div className="card-body">
                        <section className="section">
                            <div className="section-header d-flex justify-content-between">
                                <h1 className='mb-0'>Requisition Edit</h1>
                            </div>
                        </section>
                    </div>
                </div>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={12} sm={12} md={4}>

                                <h5 className="text-secondary mb-1">Requisition Raised By : </h5>
                                <Select
                                    options={employeelist?.map((d) => ({ label: d.name + " (" + d.employee_id + ")", value: d.id }))}
                                    onChange={(e) => {
                                        setreq_byId(e.value);
                                        setreq_byId_p(e.label);
                                    }}
                                    placeholder={data?.created_by?.first_name + ` (${data?.created_by?.username})`}
                                    styles={{ border: "1px solid red" }}
                                    // value={req_byId_p}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Project : </h5>
                                <Select
                                    options={project?.map((d) => ({ label: d.name, value: d.id }))}
                                    onChange={(e) => {
                                        setprojectId(e.value);
                                        setprojectId_p(e.label);
                                    }}
                                    placeholder={data?.project?.name}
                                    styles={{ border: "1px solid red" }}
                                    // value={projectId_p}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Project Head: </h5>
                                <Select
                                    options={employeelist?.map((d) => ({ label: d.name+" ("+d.employee_id+")", value: d.id }))}
                                    onChange={(e) => {
                                        setproject_headId(e.value);
                                        setproject_headId_p(e.label);
                                    }}
                                    placeholder={data?.project_head?.name + ` (${data?.project_head?.employee_id})`}
                                    styles={{ border: "1px solid red" }}
                                    // value={project_headId_p}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                <h5 className="text-secondary mb-1">SBU : </h5>
                                <Select
                                    options={sbu_data?.map((d) => ({ label: d.name, value: d.id }))}
                                    onChange={(e) => {
                                        setSbuId(e.value);
                                        setSbuId_p(e.label);
                                    }}
                                    placeholder={data?.sbu?.name}
                                    styles={{ border: "1px solid red" }}
                                    // value={sbuId_p}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <h5 className="text-secondary mb-1">SBU Director : </h5>
                                <Select
                                    options={sbu_dir_name?.map((d) => ({ label: d.name, value: d.id }))}
                                    onChange={(e) => {
                                        setsbu_dirId(e.value);
                                        setsbu_dirId_p(e.label);
                                    }}
                                    placeholder={data?.sbu_director_name?.name}
                                    styles={{ border: "1px solid red" }}
                                    // value={sbu_dirId_p}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Quantity of Recruitment : </h5>
                                <input type="number" placeholder={data?.quantity_requisition} onChange={(evnt) => setquantity_recruitment(evnt.target.value)} className="form-control" />
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Reason for Recruitment : </h5>
                                <select className="form-control select2" onChange={(e) => setreason_recruitment(e.target.value)}>
                                    <option value="New Recruit" selected={data?.reason_for_recruitment === "New Recruit" ? true : false}>New Recruit</option>
                                    <option value="Replacement" selected={data?.reason_for_recruitment === "Replacement" ? true : false}>Replacement</option>
                                    <option value="R & D" selected={data?.reason_for_recruitment === "R & D" ? true : false}>R & D</option>
                                </select>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Type of Recruitment : </h5>
                                <Select
                                    options={type_of_reason?.map((d) => ({ label: d.label }))}
                                    onChange={(e) => {
                                        settype_of_recruitId_p(e.label);
                                    }}
                                    styles={{ border: "1px solid red" }}
                                    placeholder={data?.type_of_recruitment} 
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">No of Resource : </h5>
                                <input type="number" placeholder={data?.number_of_resource} onChange={(evnt) => setnumber_of_resource(evnt.target.value)} className="form-control" />
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Salary Range : </h5>
                                <input type="text" placeholder={data?.salary_range} onChange={(e)=> setsalary_range(e.target.value)} className="form-control" />

                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <h5 className="text-secondary mb-1">Source of Fund: </h5>
                                <input type="text" placeholder={data?.source_of_fund} onChange={(e)=> setsource_of_fund(e.target.value)} className="form-control" />
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Row>
                            <h4 className="text-secondary mb-1">Reason for Recruitment </h4>
                            <br />
                            <div className="col-sm-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Project Invoice Amount (a)</th>
                                            <th>Of Resources involved (b)</th>
                                            <th>Total Resource Costing (c = b X total salaries)</th>
                                            <th>Project Duration (d)</th>
                                            <th>Project Cost (e = c x d)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                                        {data_reason_recruitment.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="text" placeholder={data.project_invoice_amount} onChange={(evnt) => (handleChange(index, evnt))} name="project_invoice_amount" className="form-control"  />
                                                    </td>
                                                    <td><input type="text" placeholder={data.resources_involved} onChange={(evnt) => (handleChange(index, evnt))} name="resources_involved" className="form-control"  /> </td>
                                                    <td><input type="text" placeholder={data.total_resource_cost} onChange={(evnt) => (handleChange(index, evnt))} name="total_resource_cost" className="form-control"  /> </td>
                                                    <td><input type="text" placeholder={data.project_duration} onChange={(evnt) => (handleChange(index, evnt))} name="project_duration" className="form-control"  /> </td>
                                                    <td><input type="text" placeholder={data.project_cost} onChange={(evnt) => (handleChange(index, evnt))} name="project_cost" className="form-control"  /> </td>
                                                </tr>
                                            )

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Row>

                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <div className="form-group">
                            <div className="table-responsive">
                                <table className="table table-bordered table-md">
                                    <thead>
                                        <tr>
                                            <th colspan="2" className="text-center">Required skills:</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">a. Minimum Skills</td>
                                            <td className="text-center">b. Project special/Required skills
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><textarea className="form-control" placeholder={data.skill} onChange={(e) => setmin_skill(e.target.value)} ></textarea></td>
                                            <td><textarea className="form-control" placeholder={data.required_skills} onChange={(e) => setrequired_skills(e.target.value)} ></textarea></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Row>
                            <h4 className="text-secondary mb-1">Reason for Recruitment </h4>
                            <br />
                            <div className="col-sm-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {/* <th>SL</th> */}
                                            <th>Employee Name</th>
                                            <th>Designation</th>
                                            <th>ID No</th>
                                            <th>SBU</th>
                                            <th>Sub SBU/project</th>
                                            <th>Allocated Hour</th>
                                            <th>Skill</th>
                                            <th>Project Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                                        {rowsData1.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    {/* <td>{index + 1}</td> */}
                                                    <td>
                                                        <Select
                                                            options={employeelist?.map((d) => ({ label: d.name, value: d.id, designation: d.designation,ds_id: d.employee_id,sbu: d.sbu.name,sub_sbu:d.sbu_director_id.name }))}
                                                            onChange={(e) => {
                                                                handleChange2(index,"employee_name", e.value)
                                                                handleChange2(index,"emp_name", e.label)
                                                                handleChange2(index,"designation", e.designation)
                                                                handleChange2(index,"id_no", e.ds_id)
                                                                handleChange2(index,"sbu", e.sbu)
                                                                handleChange2(index,"sbu_project", e.sub_sbu)
                                                            }}
                                                            placeholder={data.employee_name.name}
                                                            styles={{ border: "1px solid red" }}
                                                            // value={employee_name}
                                                        />
                                                    </td>
                                                    <td>{Number.isInteger(data.employee_name) ? data.designation : data.employee_name.designation}</td>
                                                    <td>{Number.isInteger(data.employee_name) ? data.id_no : data.employee_name.employee_id}</td>
                                                    <td>{Number.isInteger(data.employee_name) ? data.sbu : data.employee_name.sbu.name}</td>
                                                    <td>{Number.isInteger(data.employee_name) ? data.sbu_project  :data.employee_name.sub_sbu.name}</td>
                                                    <td><input type="text" placeholder={data.allocated_hour} onChange={(evnt) => (handleChange2(index,"allocated_hour", evnt.target.value))} name="allocated_hour" className="form-control"  /></td>
                                                    <td><input type="text" placeholder={data.skill} onChange={(evnt) => (handleChange2(index,"skill", evnt.target.value))} name="skill" className="form-control"  /></td>
                                                    <td><input type="text" placeholder={data.project_revenue} onChange={(evnt) => (handleChange2(index,"project_revenue", evnt.target.value))} name="project_revenue" className="form-control"  /></td>
                                                </tr>
                                            )

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Row>
                        <Row>
                            <div className="section-header-breadcrumb">
                                <div className="buttons" onClick={finalsubmit}>
                                    <a className="btn btn-primary">Update</a>
                                </div>
                            </div>
                        </Row>
                    </Card.Body>

                </Card>

            </div>

        </Layout>
    )
}
