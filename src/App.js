import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardOutlet from "./outlets/DashboardOulet";
import KpiOutlet from "./outlets/KpiOutlet";
import UserOutlet from "./outlets/UserOutlet";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmAssestmentSingle from "./pages/KPI/employee-assestment/em-assestment-single";
import EmployeeAssestment from "./pages/KPI/employee-assestment/employee-assestment";
import EmPerformanceSingle from "./pages/KPI/employee-performance/em-performance-single";
import EmployeePerformance from "./pages/KPI/employee-performance/employee-performance";
import KpiAllEmployeeAssestment from "./pages/KPI/kpi-all-employee-assestment/kpi-all-employee-assestment";
import KpiAssestment from "./pages/KPI/kpi-assestment/kpi-assestment";
import KpiEmployeeAssign from "./pages/KPI/Kpi-employee-Assign/kpi-employee-assign";
import KpiPerformanceForm from "./pages/KPI/kpi-performane-form/kpi-performance-form";
import KpiPerformerAssestment from "./pages/KPI/kpi-performer-assestment/kpi-performer-assestment";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Unauth from "./pages/NotFound/Unauth";
import UserAdd from "./pages/user/user/UserAdd";
import UserList from "./pages/user/user/userList";
import {
  DASHBOARD_PAGE,
  EMPLOYEE_ASSESTMENT_PAGE,
  EMPLOYEE_ASSESTMENT_SINGLE_URL,
  EMPLOYEE_ASSESTMENT_SINGLE_PAGE,
  EMPLOYEE_PERFORMANCE_CREATE,
  EMPLOYEE_PERFORMANCE_INDEX_PAGE,
  EMPLOYEE_PERFORMANCE_PAGE,
  EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL,
  EMPLOYEE_PERFORMANCE_PAGE_URL,
  EMPLOYEE_PERFORMANCE_VIEW_url,
  KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE,
  KPI_ASSESTMENT_PAGE,
  KPI_EMPLOYEE_ASSIGN_PAGE,
  KPI_PERMORMANCE_FORM_URL,
  KPI_PERMORMER_ASSESTMENT_PAGE,
  LOGIN_PAGE,
  UNAUTHORIZED,
  USER_ADD_PAGE,
  USER_LIST_PAGE,
  SALARY_FULL_REPORT_URL,
  SALARY_PIVOT_SUMMARY_REPORT_URL,
  SALARY_INCREMENT_ELIGIBLE_REPORT_URL,
  USER_ROLE_LIST_PAGE,
  USER_ROLE_PRIVILEGE_PAGE_URL,
  EMPLOYEE_LIST_PAGE,
  EMPLOYEE_EDIT_PAGE_URL,
  ASSESTMENT_EMPLOYER_REPORT,
} from "./utils/APP_ROUTES";
import KpiPerformanceIndex from "./pages/KPI/kpi-performane-form/kpi-performance-index";
import KpiPerformanceFormCreate from "./pages/KPI/kpi-performane-form/kpi-performance-form-create";
import KpiPerformanceFormView from "./pages/KPI/kpi-performane-form/kpi-performance-form-view";
import SalaryFullReport from "./pages/Report/salary-full-report/SalaryFullReport";
import SalaryPivotReport from "./pages/Report/salary-pivot-summary/SalaryPivotReport";
import SalaryIncrementEligibleReport from "./pages/Report/salary-increment-eligible-report/SalaryIncrementEligibleReport";
import RoleList from "./pages/user/role/RoleList";
import Privileges from "./pages/user/role/Privileges";
import EmployeeList from "./pages/Employee/EmployeeList";
import EmployeeEdit from "./pages/Employee/EmployeeEdit";
import AssestmentEmployerReport from "./pages/Report/assestment-employer-report/assestment-employer-report";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={LOGIN_PAGE} element={<Login />} />
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
          <Route path={USER_ROLE_LIST_PAGE} element={<RoleList />} />
          <Route path={USER_ROLE_PRIVILEGE_PAGE_URL} element={<Privileges />} />
          <Route path={EMPLOYEE_LIST_PAGE} element={<EmployeeList />} />
          <Route path={EMPLOYEE_EDIT_PAGE_URL} element={<EmployeeEdit />} />
        </Route>

        {/* KPI */}
        <Route path={"/"} element={<KpiOutlet />}>
          <Route path={KPI_EMPLOYEE_ASSIGN_PAGE} element={<KpiEmployeeAssign />} />
          <Route path={KPI_PERMORMANCE_FORM_URL} element={<KpiPerformanceForm />} />
          <Route path={KPI_ASSESTMENT_PAGE} element={<KpiAssestment />} />
          <Route path={KPI_PERMORMER_ASSESTMENT_PAGE} element={<KpiPerformerAssestment />} />
          <Route path={KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE} element={<KpiAllEmployeeAssestment />} />
          <Route path={EMPLOYEE_ASSESTMENT_PAGE} element={<EmployeeAssestment />} />
          <Route path={EMPLOYEE_ASSESTMENT_SINGLE_URL} element={<EmAssestmentSingle />} />
          <Route path={EMPLOYEE_PERFORMANCE_PAGE} element={<EmployeePerformance />} />
          <Route path={EMPLOYEE_PERFORMANCE_SINGLE_PAGE_URL} element={<EmPerformanceSingle />} />
          <Route path={EMPLOYEE_PERFORMANCE_INDEX_PAGE} element={<KpiPerformanceIndex />} />
          <Route path={EMPLOYEE_PERFORMANCE_CREATE} element={<KpiPerformanceFormCreate />} />
          <Route path={EMPLOYEE_PERFORMANCE_VIEW_url} element={<KpiPerformanceFormView />} />
        </Route>
        <Route path={"/report"} element={<KpiOutlet />}>
          <Route path={SALARY_FULL_REPORT_URL} element={<SalaryFullReport />} />
          <Route path={SALARY_PIVOT_SUMMARY_REPORT_URL} element={<SalaryPivotReport />} />
          <Route path={SALARY_INCREMENT_ELIGIBLE_REPORT_URL} element={<SalaryIncrementEligibleReport />} />
          <Route path={ASSESTMENT_EMPLOYER_REPORT} element={<AssestmentEmployerReport />} />
        </Route>

        <Route path={UNAUTHORIZED} element={<Unauth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
