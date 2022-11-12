import './App.css';
import {Route,Routes} from 'react-router-dom'
import KpiPerformanceForm from "./components/kpi-performmance-form/KpiPerformanceForm";
import Layout from "./layout/Layout";
import Dashboard from "./layout/dashboard/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Dashboard header={{title:'Dashboard',preTitle:'OVERVIEW'}}/>}/>
                <Route path="/kpi/kpi_form" element={<KpiPerformanceForm header={{title:'KPI Performance Form'}}/>}/>
            </Route>
        </Routes>
    );
}

export default App;
