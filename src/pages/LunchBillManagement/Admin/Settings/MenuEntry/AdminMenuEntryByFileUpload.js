import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Select from "../../../../../components/select/Select";
import {FaDownload, FaUpload} from "react-icons/fa";
import FileDropZone from "../../../../../components/FileDropZone";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import useFetchV2 from "../../../../../hooks/useFetchV2";
import {
    MONTHLY_MENU_ENTRY_CREATE_BY_FILE_UPLOAD,
    VENDOR_LIST_BY_BRANCH_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {error_alert} from "../../../../../components/alert/Alert";
import {API} from "../../../../../utils/axios/axiosConfig";

const AdminMenuEntryByFileUpload = forwardRef(({branchList},ref)=>{
    const [refresh, setRefresh] = useState(true)
    const [branch, setBranch] = useState({})
    const [vendor, setVendor] = useState({})
    const [vendors] = useFetchV2(VENDOR_LIST_BY_BRANCH_API(branch?.value),refresh)
    const [show, setShow] = useState(false)
    const [files, setFiles] = useState(null)
    const [vendorList, setVendorList] = useState([]);
    const supportedMediaType = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/x-msexcel',
        'application/x-ms-excel',
        'application/x-excel',
        'application/x-dos_ms_excel',
        'application/xls',
        'application/x-xls',
    ]

    useImperativeHandle(ref,()=>{
        return {
            showUploadDialog() {
                setShow(true)
            }
        }
    })
    useEffect(() => {
        if (vendors?.data) {
            setVendorList(vendors?.data?.map((v, i) => ({label: v.name, value: v.id})))
        }
    }, [vendors])
    const handleClose = ()=>{
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const onDropFile = acceptedFiles => {
        if(acceptedFiles[0] && supportedMediaType.indexOf(acceptedFiles[0]?.type)>=0){
            setFiles(acceptedFiles[0])
        } else {
            error_alert("Invalid file type")
        }
    }

    function uploadFile(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('office_branch',branch?.value);
        data.append('vendor',vendor?.value);
        data.append('file',files);

        API.post(MONTHLY_MENU_ENTRY_CREATE_BY_FILE_UPLOAD,data,{
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then(success=>{

        }).catch(err=>{

        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-center">
                        <Col sm={12} md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Office Branch</Form.Label>
                                <Select
                                    placeholder="--Select a branch--"
                                    options={branchList}
                                    value={branch}
                                    size="md"
                                    onChange={v=>setBranch(v)}/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={12} md={6} lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Vendor</Form.Label>
                                <Select
                                    placeholder="--Select a vendor--"
                                    options={vendorList}
                                    value={vendor}
                                    size="md"
                                    onChange={v=> {
                                        setVendor(v);
                                    }}/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row className="justify-content-center mb-3">
                        <Col sm={12} md={6} lg={6}>
                            <a className="btn btn-light border fw-bold w-100 btn-sm" href={`${process.env.PUBLIC_URL}/files/menu_entry_excel_template.xlsx`}>
                                <FaDownload/> Download Template
                            </a>
                        </Col>

                    </Row>
                    <FileDropZone onFileSelect={onDropFile}/>
                    {files && (
                        <div className="mt-3 p-2 shadow shadow-sm d-flex justify-content-between fw-bold">
                            <span>
                                {files?.name}({files.type})
                            </span>
                            <span>
                                {`${((+files?.size)/1024/1000).toFixed(2)} MB`}
                            </span>
                        </div>
                    )}
                    <Row className="justify-content-center mt-3">
                        <Col sm={12} md={12} lg={12} className="d-flex justify-content-end align-items-end">
                            <Button variant="primary" onClick={uploadFile} className="ms-3">
                                <FaUpload/> Upload
                            </Button>
                        </Col>

                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
})
export default AdminMenuEntryByFileUpload