import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardOutlet from "./outlets/hrm/DashboardOulet";
import KpiOutlet from "./outlets/hrm/KpiOutlet";
import UserOutlet from "./outlets/UserOutlet";
import Dashboard from "./pages/hrm/Dashboard/Dashboard";
import EmAssestmentSingle from "./pages/hrm/KPI/employee-assestment/em-assestment-single";
import EmployeeAssestment from "./pages/hrm/KPI/employee-assestment/employee-assestment";
import EmPerformanceSingle from "./pages/hrm/KPI/employee-performance/em-performance-single";
import EmployeePerformance from "./pages/hrm/KPI/employee-performance/employee-performance";
import KpiAllEmployeeAssestment from "./pages/hrm/KPI/kpi-all-employee-assestment/kpi-all-employee-assestment";
import KpiAssestment from "./pages/hrm/KPI/kpi-assestment/kpi-assestment";
import KpiEmployeeAssign from "./pages/hrm/KPI/Kpi-employee-Assign/kpi-employee-assign";
import KpiPerformanceForm from "./pages/hrm/KPI/kpi-performane-form/kpi-performance-form";
import KpiPerformerAssestment from "./pages/hrm/KPI/kpi-performer-assestment/kpi-performer-assestment";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Unauth from "./pages/NotFound/Unauth";
import UserAdd from "./pages/user/user/UserAdd";
import UserList from "./pages/user/user/userList";
import {
  ASSESSMENT_YEAR_REPORT,
  ASSESTMENT_EMPLOYER_REPORT,
  ASSESTMENT_SUMMARY_REPORT,
  DASHBOARD_PAGE,
  EMPLOYEE_ASSESTMENT_PAGE,
  EMPLOYEE_ASSESTMENT_SINGLE_URL,
  EMPLOYEE_EDIT_PAGE_URL,
  EMPLOYEE_LIST_PAGE,
  EMPLOYEE_PERFORMANCE_CREATE,
  EMPLOYEE_PERFORMANCE_INDEX_PAGE,
  EMPLOYEE_PERFORMANCE_PAGE,
  EMPLOYEE_PERFORMANCE_PREV_YEAR_PAGE_URL,
  EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL,
  EMPLOYEE_PERFORMANCE_VIEW_url,
  FILE_UPLOAD_PAGE,
  KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE,
  KPI_ASSESTMENT_PAGE,
  KPI_EMPLOYEE_ASSIGN_PAGE,
  KPI_PERMORMANCE_FORM_URL,
  KPI_PERMORMER_ASSESTMENT_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  REQUISITION_FORM,
  REQUISITION_LIST,
  REQUISITION_LIST_URL,
  REQUISITION_LIST_EDIT_URL,
  REQUISITION_RESOURCE_FORM,
  REQUISITION_RESOURCE_LIST,
  SALARY_FULL_REPORT_URL,
  SALARY_INCREMENT_ELIGIBLE_REPORT_URL,
  SALARY_INCREMENT_REPORT,
  SALARY_PIVOT_SUMMARY_REPORT_URL,
  SBU_ASSESTMENT_REPORT,
  SUPERVISOR_APPRAISAL_REVIEW_PAGE,
  SUPERVISOR_ASSESTMENT_PERFORMANE_PAGE,
  UNAUTHORIZED,
  USER_ADD_PAGE,
  USER_LIST_PAGE,
  USER_ROLE_LIST_PAGE,
  USER_ROLE_PRIVILEGE_PAGE_URL,
  CONFIG_DASHBOARD,
  REQUISITION_DASHBOARD,
  USER_EDIT_PAGE_URL,
  UPDATE_CIRCULAR_PAGE,
} from "./utils/routes/app_routes/APP_ROUTES";
import KpiPerformanceIndex from "./pages/hrm/KPI/kpi-performane-form/kpi-performance-index";
import KpiPerformanceFormCreate from "./pages/hrm/KPI/kpi-performane-form/kpi-performance-form-create";
import KpiPerformanceFormView from "./pages/hrm/KPI/kpi-performane-form/kpi-performance-form-view";
import SalaryFullReport from "./pages/hrm/Report/salary-full-report/SalaryFullReport";
import SalaryPivotReport from "./pages/hrm/Report/salary-pivot-summary/SalaryPivotReport";
import SalaryIncrementEligibleReport from "./pages/hrm/Report/salary-increment-eligible-report/SalaryIncrementEligibleReport";

import RoleList from "./pages/user/role/RoleList";
import Privileges from "./pages/user/role/Privileges";
import EmployeeList from "./pages/hrm/Employee/EmployeeList";
import EmployeeEdit from "./pages/hrm/Employee/EmployeeEdit";
import AssestmentEmployerReport from "./pages/hrm/Report/assestment-employer-report/assestment-employer-report";
import Demo from "./pages/demo";

import AssessmentYearReport from "./pages/hrm/Report/assessment_year_report/AssessmentYearReport";
import RequisitionOutlet from "./outlets/hrm/RequisitionOutlet";
import ResourceRequisitionForm from "./pages/hrm/Requisition_form/resource_requisition/ResourceRequisition";
import RequestRequisitionList from "./pages/hrm/Requisition_form/resource_requisition/request_requisition_list";
import SalaryIncrementReport from "./pages/hrm/Report/salary-increment-report/SalaryIncrementReport";
import SbuAssestmentData from "./pages/hrm/Report/sbu-assestment-report/sbu-assestment-data";
import SupervisorAssestmentPerformance from "./pages/hrm/KPI/supervisor-assestment-performance/list";
import SupervisorAppraisalReview from "./pages/hrm/KPI/supervisor-appraisal-review/List";
import ConfigurationOutlet from "./outlets/hrm/ConfigurationOutlet";
import FileUpload from "./pages/hrm/Configuration/file-upload/FileUpload";
import EmPerformancePrevYear from "./pages/hrm/KPI/employee-performance/em-performance-prevYear";
import Landing from "./pages/Landing/Landing";

import AssestmentSummaryReport from "./pages/hrm/Report/assestment_summary_report/AssestmentSummaryReport";
import ReportOutlet from "./outlets/hrm/ReportOutlet";

import {
  ALL_TICKETS_URL,
  CREATE_TICKET_URL,
  EDIT_TICKET_URL,
  MY_TICKETS_URL,
  OTHER_TICKETS_URL,
  SUPPORT_DASHBOARD_STATUS_WISE_URL,
  SUPPORT_DASHBOARD_URL,
  VIEW_TICKET_URL,
} from "./utils/routes/app_routes/SP_APP_ROUTES";
import CreateTicket from "./pages/support/CreateTicket/CreateTicket";
import SupportOutlet from "./outlets/support/SupportOutlet";
import MyTickets from "./pages/support/MyTickets/MyTickets";
import EditTicket from "./pages/support/EditTicket/EditTicket";
import ViewTicketDetail from "./pages/support/ViewTicket/ViewTicketDetail";
import AllTickets from "./pages/support/AllTickets/AllTickets";
import OtherTickets from "./pages/support/OtherTickets/OtherTickets";
import SupportDashboard from "./pages/support/Dashboard/SupportDashboard";
import TicketStatusList from "./pages/support/TicketStatusList/TicketStatusList";
import RequisitionForm from "./pages/hrm/Requisition_form/RequisitionForm";
import RequisitionList from "./pages/hrm/Requisition_form/RequisitionList";
import RequisitionDetails from "./pages/hrm/Requisition_form/RequisitionDetails";
import RequisitionEdit from "./pages/hrm/Requisition_form/RequisitionEdit";
import {
  LUNCH_ORDER_PAGE,
  SUBSIDY_LIST_PAGE,
  LUNCH_DASHBOARD_PAGE,
  SUBSIDY_COST_CREATE_PAGE,
  SUBSIDY_COST_LIST_PAGE,
  HOLIDAY_CALENDER_PAGE,
  LUNCH_REPORT_EMPLOYEE_PAGE,
  LUNCH_REPORT_ADMIN_PAGE,
  LUNCH_REPORT_DAILY_PAGE,
  LUNCH_ORDER_SUMMARY_REPORT_PAGE,
  BRANCH_LIST_PAGE,
  VENDOR_LIST_PAGE,
  VENDOR_MENU_LIST_PAGE,
  ADMIN_MENU_ENTRY_CREATE_PAGE,
  ADMIN_MENU_ENTRY_LIST_PAGE,
  ADMIN_MENU_ENTRY_EDIT_PAGE_URL,
} from "./utils/routes/app_routes/LUNCH_ROUTES";
import LunchOutlet from "./outlets/lunchManagementOutlet/LunchOutlet";
import LunchOrder from "./pages/LunchBillManagement/lunch/lunch_order/LunchOrder";
import SubSidyTypeList from "./pages/LunchBillManagement/Admin/Settings/SubSidy/SubSidyList/SubSidyTypeList";
import LunchManagementDashboard from "./pages/LunchBillManagement/dashboard/Dashboard";
import CreateSubSidyLunchCost from "./pages/LunchBillManagement/Admin/Settings/SubSidy/SubSidyLunchCost/Create/CreateSubSidyLunchCost";
import SubSidyLunchCost from "./pages/LunchBillManagement/Admin/Settings/SubSidy/SubSidyLunchCost/Index/SubSidyLunchCost";
import ConfigDashboard from "./pages/configuration/Dashboard/ConfigDashboard";
import HolidayCalender from "./pages/LunchBillManagement/Admin/Settings/HolidayCalender/HolidayCalender";
import RequsitionDashboard from "./pages/hrm/Requisition_form/RequsitionDashboard";
import { USER_EDIT_URL } from "./utils/routes/api_routes/API_ROUTES";
import LunchReportForEmployee from "./pages/LunchBillManagement/reports/LunchReportForEmployee";
import LunchReportForAdmin from "./pages/LunchBillManagement/reports/LunchReportForAdmin";
import DailyLunchOrder from "./pages/LunchBillManagement/reports/DailyLunchOrder";
import LunchOrderSummaryReport from "./pages/LunchBillManagement/reports/LunchOrderSummaryReport";
import BranchList from "./pages/LunchBillManagement/Admin/Settings/Branch/BranchList";
import VendorList from "./pages/LunchBillManagement/Admin/Settings/Vendor/VendorList";
import VendorMenuList from "./pages/LunchBillManagement/Admin/Settings/Vendor/Menu/VendorMenuList";
import AdminMenuEntry from "./pages/LunchBillManagement/Admin/Settings/MenuEntry/AdminMenuEntry";
import AdminMenuEntryList from "./pages/LunchBillManagement/Admin/Settings/MenuEntry/AdminMenuEntryList";
import UpdateCircularToEmployee from "./pages/hrm/Configuration/update-circular/UpdateCircularToEmployee";
import BillManagementOutlet from "./outlets/billing/BillManagementOutlet";
import {
  BILLING_DASHBOARD,
  BILL_ADD_URL,
  BILL_APPROVE_LIST,
  BILL_EDIT_URL,
  BILL_LIST_URL,
  CONVEYANCE_ADD_URL,
  CONVEYANCE_APPROVE_LIST,
  CONVEYANCE_EDIT_URL,
  CONVEYANCE_LIST_URL,
} from "./utils/routes/app_routes/BILL_APP_ROUTE";
import BillingBashboard from "./pages/bill-management/dashboard/BillingBashboard";
import Bill from "./pages/bill-management/Bill/Bill";
import BillAdd from "./pages/bill-management/Bill/billAdd";
import Conveyance from "./pages/bill-management/Conveyance/Conveyance";
import ConveyanceAdd from "./pages/bill-management/Conveyance/ConveyanceAdd";
import UserEdit from "./pages/user/user/UserEdit";

import AdminMenuEntryEdit from "./pages/LunchBillManagement/Admin/Settings/MenuEntry/AdminMenuEntryEdit";
import BillEdit from "./pages/bill-management/Bill/BillEdit";
import BillApprove from "./pages/bill-management/Bill-approve/BillApprove";
import ConveyanceApprove from "./pages/bill-management/Conveyance-approve/ConveyanceApprove";

// import BillList from "./pages/bill-management/bill/List";
// import BillAdd from "./pages/bill-management/bill/billAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={LANDING_PAGE} element={<Landing />} />
        <Route path={LOGIN_PAGE} element={<Login />} />
        {/**************************************************
                 PROTECTED ROUTES
                 **************************************************/}
        {/* DASHBOARD */}
        <Route path={DASHBOARD_PAGE} element={<DashboardOutlet />}>
          <Route path={DASHBOARD_PAGE} element={<Dashboard />} />
        </Route>

        {/* USER MANAGEMENT*/}
        <Route path={"/"} element={<UserOutlet />}>
          <Route path={USER_LIST_PAGE} element={<UserList />} />
          <Route path={USER_ADD_PAGE} element={<UserAdd />} />
          <Route path={USER_EDIT_PAGE_URL} element={<UserEdit />} />
          <Route path={USER_ROLE_LIST_PAGE} element={<RoleList />} />
          <Route path={USER_ROLE_PRIVILEGE_PAGE_URL} element={<Privileges />} />
          <Route path={EMPLOYEE_LIST_PAGE} element={<EmployeeList />} />
          <Route path={EMPLOYEE_EDIT_PAGE_URL} element={<EmployeeEdit />} />
        </Route>

        {/* Configuration */}
        <Route path={"/"} element={<ConfigurationOutlet />}>
          <Route path={CONFIG_DASHBOARD} element={<ConfigDashboard />} />
          <Route path={FILE_UPLOAD_PAGE} element={<FileUpload />} />
          <Route path={UPDATE_CIRCULAR_PAGE} element={<UpdateCircularToEmployee />} />
        </Route>

        {/* KPI */}
        <Route path={"/hrm/"} element={<KpiOutlet />}>
          <Route path={KPI_EMPLOYEE_ASSIGN_PAGE} element={<KpiEmployeeAssign />} />
          <Route path={KPI_PERMORMANCE_FORM_URL} element={<KpiPerformanceForm />} />
          <Route path={KPI_ASSESTMENT_PAGE} element={<KpiAssestment />} />
          <Route path={KPI_PERMORMER_ASSESTMENT_PAGE} element={<KpiPerformerAssestment />} />
          <Route path={KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE} element={<KpiAllEmployeeAssestment />} />
          <Route path={EMPLOYEE_ASSESTMENT_PAGE} element={<EmployeeAssestment />} />
          <Route path={SUPERVISOR_ASSESTMENT_PERFORMANE_PAGE} element={<SupervisorAssestmentPerformance />} />
          <Route path={EMPLOYEE_ASSESTMENT_SINGLE_URL} element={<EmAssestmentSingle />} />
          <Route path={EMPLOYEE_PERFORMANCE_PAGE} element={<EmployeePerformance />} />
          <Route path={EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL} element={<EmPerformanceSingle />} />
          <Route path={EMPLOYEE_PERFORMANCE_PREV_YEAR_PAGE_URL} element={<EmPerformancePrevYear />} />
          <Route path={EMPLOYEE_PERFORMANCE_INDEX_PAGE} element={<KpiPerformanceIndex />} />
          <Route path={EMPLOYEE_PERFORMANCE_CREATE} element={<KpiPerformanceFormCreate />} />
          <Route path={EMPLOYEE_PERFORMANCE_VIEW_url} element={<KpiPerformanceFormView />} />
          <Route path={SUPERVISOR_APPRAISAL_REVIEW_PAGE} element={<SupervisorAppraisalReview />} />
        </Route>

        {/* BILL MANAGEENT */}
        <Route path={"/bill_management"} element={<BillManagementOutlet />}>
          <Route path={BILLING_DASHBOARD} element={<BillingBashboard />} />
          <Route path={BILL_LIST_URL} element={<Bill />} />
          <Route path={BILL_ADD_URL} element={<BillAdd />} />
          <Route path={BILL_EDIT_URL} element={<BillEdit />} />
          <Route path={BILL_APPROVE_LIST} element={<BillApprove />} />
          <Route path={CONVEYANCE_LIST_URL} element={<Conveyance />} />
          <Route path={CONVEYANCE_ADD_URL} element={<ConveyanceAdd />} />
          <Route path={CONVEYANCE_EDIT_URL} element={<ConveyanceAdd />} />
          <Route path={CONVEYANCE_APPROVE_LIST} element={<ConveyanceApprove />} />
        </Route>

        {/* REQUISITION */}
        <Route path={"/requisition"} element={<RequisitionOutlet />}>
          <Route path={REQUISITION_DASHBOARD} element={<RequsitionDashboard />} />
          <Route path={REQUISITION_RESOURCE_LIST} element={<RequestRequisitionList />} />
          <Route path={REQUISITION_RESOURCE_FORM} element={<ResourceRequisitionForm />} />
          <Route path={REQUISITION_FORM} element={<RequisitionForm />} />
          <Route path={REQUISITION_LIST} element={<RequisitionList />} />
          <Route path={REQUISITION_LIST_URL} element={<RequisitionDetails />} />
          <Route path={REQUISITION_LIST_EDIT_URL} element={<RequisitionEdit />} />
        </Route>

        {/* REPORT */}
        <Route path={"/hrm/report"} element={<ReportOutlet />}>
          <Route path={SALARY_FULL_REPORT_URL} element={<SalaryFullReport />} />
          <Route path={SALARY_PIVOT_SUMMARY_REPORT_URL} element={<SalaryPivotReport />} />
          <Route path={SALARY_INCREMENT_ELIGIBLE_REPORT_URL} element={<SalaryIncrementEligibleReport />} />
          <Route path={ASSESTMENT_EMPLOYER_REPORT} element={<AssestmentEmployerReport />} />
          <Route path={ASSESSMENT_YEAR_REPORT} element={<AssessmentYearReport />} />
          <Route path={SALARY_INCREMENT_REPORT} element={<SalaryIncrementReport />} />
          <Route path={SBU_ASSESTMENT_REPORT} element={<SbuAssestmentData />} />
          <Route path={ASSESTMENT_SUMMARY_REPORT} element={<AssestmentSummaryReport />} />
        </Route>

        <Route path={"/support"} element={<SupportOutlet />}>
          <Route path={SUPPORT_DASHBOARD_URL} element={<SupportDashboard />} />
          <Route path={SUPPORT_DASHBOARD_STATUS_WISE_URL} element={<TicketStatusList />} />
          <Route path={MY_TICKETS_URL} element={<MyTickets />} />
          <Route path={ALL_TICKETS_URL} element={<AllTickets />} />
          <Route path={OTHER_TICKETS_URL} element={<OtherTickets />} />
          <Route path={CREATE_TICKET_URL} element={<CreateTicket />} />
          <Route path={EDIT_TICKET_URL} element={<EditTicket />} />
          <Route path={VIEW_TICKET_URL} element={<ViewTicketDetail />} />
        </Route>

        {/* Lunch Bill management */}
        <Route path={"/lunch-management"} element={<LunchOutlet />}>
          <Route path={LUNCH_DASHBOARD_PAGE} element={<LunchManagementDashboard />} />
          <Route path={LUNCH_ORDER_PAGE} element={<LunchOrder />} />
          <Route path={SUBSIDY_LIST_PAGE} element={<SubSidyTypeList />} />
          <Route path={SUBSIDY_COST_LIST_PAGE} element={<SubSidyLunchCost />} />
          <Route path={SUBSIDY_COST_CREATE_PAGE} element={<CreateSubSidyLunchCost />} />
          <Route path={BRANCH_LIST_PAGE} element={<BranchList />} />
          <Route path={VENDOR_LIST_PAGE} element={<VendorList />} />
          <Route path={VENDOR_MENU_LIST_PAGE} element={<VendorMenuList />} />
          <Route path={HOLIDAY_CALENDER_PAGE} element={<HolidayCalender />} />
          <Route path={ADMIN_MENU_ENTRY_LIST_PAGE} element={<AdminMenuEntryList />} />
          <Route path={ADMIN_MENU_ENTRY_CREATE_PAGE} element={<AdminMenuEntry />} />
          <Route path={ADMIN_MENU_ENTRY_EDIT_PAGE_URL} element={<AdminMenuEntryEdit />} />

          <Route path={LUNCH_REPORT_EMPLOYEE_PAGE} element={<LunchReportForEmployee />} />
          <Route path={LUNCH_REPORT_ADMIN_PAGE} element={<LunchReportForAdmin />} />
          <Route path={LUNCH_REPORT_DAILY_PAGE} element={<DailyLunchOrder />} />
          <Route path={LUNCH_ORDER_SUMMARY_REPORT_PAGE} element={<LunchOrderSummaryReport />} />
        </Route>

        <Route path={UNAUTHORIZED} element={<Unauth />} />
        <Route path={"/demo"} element={<Demo />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
