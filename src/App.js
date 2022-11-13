import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardOutlet from "./outlets/DashboardOulet";
import KpiOutlet from "./outlets/KpiOutlet";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmAssestmentSingle from "./pages/KPI/employee-assestment/em-assestment-single";
import EmployeeAssestment from "./pages/KPI/employee-assestment/employee-assestment";
import EmployeePerformance from "./pages/KPI/employee-performance/employee-performance";
import KpiAllEmployeeAssestment from "./pages/KPI/kpi-all-employee-assestment/kpi-all-employee-assestment";
import KpiAssestment from "./pages/KPI/kpi-assestment/kpi-assestment";
import KpiEmployeeAssign from "./pages/KPI/Kpi-employee-Assign/kpi-employee-assign";
import KpiPerformanceForm from "./pages/KPI/kpi-performane-form/kpi-performance-form";
import KpiPerformerAssestment from "./pages/KPI/kpi-performer-assestment/kpi-performer-assestment";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Unauth from "./pages/NotFound/Unauth";
import {
  DASHBOARD_PAGE,
  EMPLOYEE_ASSESTMENT_PAGE,
  EMPLOYEE_ASSESTMENT_SINGLE_PAGE,
  EMPLOYEE_ASSESTMENT_SINGLE_URL, EMPLOYEE_PERFORMANCE_INDEX_PAGE,
  EMPLOYEE_PERFORMANCE_PAGE,
  KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE,
  KPI_ASSESTMENT_PAGE,
  KPI_EMPLOYEE_ASSIGN_PAGE,
  KPI_PERMORMANCE_FORM_PAGE,
  KPI_PERMORMER_ASSESTMENT_PAGE,
  LOGIN_PAGE,
  UNAUTHORIZED,
} from "./utils/APP_ROUTES";
import KpiPerformanceIndex from "./pages/KPI/kpi-performane-form/kpi-performance-index";
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

        {/* KPI */}
        <Route path={"/"} element={<KpiOutlet />}>
          <Route path={KPI_EMPLOYEE_ASSIGN_PAGE} element={<KpiEmployeeAssign />} />
          <Route path={KPI_PERMORMANCE_FORM_PAGE} element={<KpiPerformanceForm />} />
          <Route path={KPI_ASSESTMENT_PAGE} element={<KpiAssestment />} />
          <Route path={KPI_PERMORMER_ASSESTMENT_PAGE} element={<KpiPerformerAssestment />} />
          <Route path={KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE} element={<KpiAllEmployeeAssestment />} />
          <Route path={EMPLOYEE_ASSESTMENT_PAGE} element={<EmployeeAssestment />} />
          <Route path={EMPLOYEE_ASSESTMENT_SINGLE_URL} element={<EmAssestmentSingle />} />
          <Route path={EMPLOYEE_PERFORMANCE_PAGE} element={<EmployeePerformance />} />
          <Route path={EMPLOYEE_PERFORMANCE_INDEX_PAGE} element={<KpiPerformanceIndex/>} />
        </Route>

        <Route path={UNAUTHORIZED} element={<Unauth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
