import Layout from "../../../../../layout/Layout";
import PageHeader from "../../../../../components/header/PageHeader";
import Content from "../../../../../components/content/Content";
import {useState} from "react";
import useFetch from "../../../../../hooks/useFetch";
import {
    BRANCH_LIST_CREATE_API,
    VENDOR_MENU_LIST_BY_VENDOR_API
} from "../../../../../utils/routes/api_routes/LUNCH_ROUTES";
import {API} from "../../../../../utils/axios/axiosConfig";
import moment from "moment";
import Loader from "../../../../../components/loader/Loader";
import {monthAndYearList} from "../../../../../utils/helper";
import AdminMenuEntryCreateUpdateForm from "./AdminMenuEntryCreateUpdateForm";


export default function AdminMenuEntry(props) {
    const [, _, currentMoment, weeklyHoliday] = monthAndYearList()
    const [loading, setLoading] = useState(false);
    const [vendorMenuList, setVendorMenuList] = useState([]);
    const [mappingMenuEntryList, setMappingMenuEntryList] = useState([]);


    function loadMenuItem(vendor, month, year) {
        API.get(VENDOR_MENU_LIST_BY_VENDOR_API(vendor)).then(success => {
            setVendorMenuList(success?.data?.data)
            const m = moment().month(month).year(year);
            const totalDaysInAMonth = m.daysInMonth();
            const mappingMenuEntry = []
            for (let i = currentMoment.month() === m.month() ? m.date() : 1; i <= totalDaysInAMonth; i++) {
                const dm = m.date(i);
                if (weeklyHoliday.indexOf(dm.weekday()) >= 0) continue;
                mappingMenuEntry.push({
                    day: i,
                    weekday: moment.weekdays(m.date(i).weekday()),
                    date: m.date(i).format('YYYY-MM-DD'),
                    menus: success?.data?.data?.map(v => false)
                })
            }
            setMappingMenuEntryList(mappingMenuEntry)
        }).then(err => {

        })
    }

    return (
        <Layout>
            <PageHeader title="Menu Entry" onBack/>
            <Content>
                {/*<Form onSubmit={handleSubmit(submitMonthlyMenu)}>
                    <Card>
                        <Card.Body>

                            <Row className="justify-content-center">
                                <Col sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Office Branch</Form.Label>
                                        <Controller
                                            name="office_branch"
                                            control={control}
                                            rules={{required: true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,

                                                     }) => (
                                                <>
                                                    <Select
                                                        placeholder="--Select a branch--"
                                                        options={branchList}
                                                        value={branchList?.find(v => v.value === value)}
                                                        size="md"
                                                        className={error ? 'is-invalid' : ''}
                                                        onChange={v => {
                                                            onChange(v.value);
                                                            onBranchChange(v.value);
                                                        }}/>

                                                    {error && (
                                                        <div className="invalid-feedback">Select a branch</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Vendor</Form.Label>
                                        <Controller
                                            name="vendor"
                                            control={control}
                                            rules={{required: true}}
                                            render={({
                                                         field: {onChange, value},
                                                         fieldState: {error},
                                                         formState,
                                                     }) => (
                                                <>
                                                    <Select
                                                        placeholder="--Select a vendor--"
                                                        options={vendorList}
                                                        value={vendorList?.find(v => v.value === value)}
                                                        size="md"
                                                        className={error ? 'is-invalid' : ''}
                                                        onChange={v => {
                                                            onChange(v.value);
                                                        }}/>

                                                    {error && (
                                                        <div className="invalid-feedback">Select a vendor</div>)}
                                                </>
                                            )}/>
                                    </Form.Group>
                                    <Row className="mb-3">
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Month</Form.Label>
                                                <Controller
                                                    name="month"
                                                    control={control}
                                                    rules={{required: true}}
                                                    render={({
                                                                 field: {onChange, value},
                                                                 fieldState: {error},
                                                                 formState,
                                                             }) => (
                                                        <>
                                                            <Select
                                                                placeholder="Month"
                                                                options={monthList}
                                                                value={monthList?.find(v => v.value === value)}
                                                                size="md"
                                                                className={error ? 'is-invalid' : ''}
                                                                onChange={v => {
                                                                    onChange(v.value);
                                                                }}/>

                                                            {error && (
                                                                <div className="invalid-feedback">Select a
                                                                    month</div>)}
                                                        </>
                                                    )}/>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Year</Form.Label>
                                                <Controller
                                                    name="year"
                                                    control={control}
                                                    rules={{required: true}}
                                                    render={({
                                                                 field: {onChange, value},
                                                                 fieldState: {error},
                                                                 formState,
                                                             }) => (
                                                        <>
                                                            <Select
                                                                placeholder="Year"
                                                                options={yearList}
                                                                value={yearList?.find(v => v.value === value)}
                                                                size="md"
                                                                className={error ? 'is-invalid' : ''}
                                                                onChange={v => {
                                                                    onChange(v.value);
                                                                }}/>

                                                            {error && (
                                                                <div className="invalid-feedback">Select a
                                                                    year</div>)}
                                                        </>
                                                    )}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                            <Row className="justify-content-center mt-3">
                                <Col sm={12} md={6} lg={6} className="d-flex justify-content-center">
                                    <Button variant="primary" size="md" onClick={loadMenuItem}>
                                        <FaDownload/> Load Menu Item
                                    </Button>
                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <CustomTable columns={MENU_ENTRY_TABLE_COLUMNS(showMenuDialog, deleteMenus)}
                                         data={mappingMenuEntryFieldsWatch} responsive pagination={{}}/>
                        </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-end mt-3">
                        <Button type="submit" variant="primary">
                            Create Menu
                        </Button>
                    </div>
                    <Modal
                        show={showMenus}
                        onHide={() => setShowMenus(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Menus
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ul className="m-0 p-0" style={{listStyle: 'none'}}>
                                <MonthlyMenuMappingComponent control={control} register={register}
                                                             menus={vendorMenuList}
                                                             index={tableIndex}/>
                            </ul>
                        </Modal.Body>
                    </Modal>

                </Form>*/}
                <AdminMenuEntryCreateUpdateForm menus={vendorMenuList} callFuncWithVendorMonthYear={loadMenuItem}
                                                monthlyData={mappingMenuEntryList} onSubmitData={(status)=>setLoading(status)}/>
            </Content>
            {loading && <Loader/>}
        </Layout>
    )
}