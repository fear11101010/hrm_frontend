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
import {error_alert} from "../../../../../components/alert/Alert";


export default function AdminMenuEntry(props) {
    const [, _, currentMoment, weeklyHoliday] = monthAndYearList()
    const [loading, setLoading] = useState(false);
    const [vendorMenuList, setVendorMenuList] = useState([]);
    const [mappingMenuEntryList, setMappingMenuEntryList] = useState([]);


    function loadMenuItem(vendor, month, year) {
        API.get(VENDOR_MENU_LIST_BY_VENDOR_API(vendor),{
            params:{
                month,year
            }
        }).then(success => {
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
        }).catch(err => {
            console.log(err?.data)
            error_alert(err?.response?.data?.error)
        })
    }

    return (
        <Layout>
            <PageHeader title="Menu Entry" onBack/>
            <Content>
                <AdminMenuEntryCreateUpdateForm menus={vendorMenuList}
                                                callFuncWithVendorMonthYear={loadMenuItem}
                                                monthlyData={mappingMenuEntryList}
                                                onSubmitData={(status)=>setLoading(status)}
                                                update={{}}/>
            </Content>
            {loading && <Loader/>}
        </Layout>
    )
}