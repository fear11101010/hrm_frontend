import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardOutlet from "./outlets/DashboardOulet";
import KpiOutlet from "./outlets/KpiOutlet";
import Dashboard from "./pages/Dashboard/Dashboard";
import KpiAllEmployeeAssestment from "./pages/KPI/kpi-all-employee-assestment/kpi-all-employee-assestment";
import KpiAssestment from "./pages/KPI/kpi-assestment/kpi-assestment";
import KpiEmployeeAssign from "./pages/KPI/Kpi-employee-Assign/kpi-employee-assign";
import KpiPerformanceForm from "./pages/KPI/kpi-performane-form/kpi-performance-form";
import KpiPerformerAssestment from "./pages/KPI/kpi-performer-assestment/kpi-performer-assestment";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import {
  DASHBOARD_PAGE,
  KPI_ALL_EMPLOYEE_ASSESTMENT_PAGE,
  KPI_ASSESTMENT_PAGE,
  KPI_EMPLOYEE_ASSIGN_PAGE,
  KPI_PERMORMANCE_FORM_PAGE,
  KPI_PERMORMER_ASSESTMENT_PAGE,
  LOGIN_PAGE,
} from "./utils/APP_ROUTES";
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
        </Route>

        <Route path="/unauthorized" element={<>unauthorized</>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
